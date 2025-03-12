import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  from,
} from "@apollo/client";
import { FIYOGQL_BASE_URI } from "../constants.js";
import { refreshAccessToken } from "../hooks/useTokenUtils.js";

const httpLink = new HttpLink({ uri: FIYOGQL_BASE_URI });

let isRefreshing = false,
  refreshPromise = null,
  failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(({ resolve, reject }) =>
    error ? reject(error) : resolve(token)
  );
  failedQueue = [];
};

const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      access_token: userInfo?.headers?.access_token,
      device_id: userInfo?.headers?.device_id,
    },
  }));
  return forward(operation);
});

const errorLink = new ApolloLink((operation, forward) => {
  return forward(operation).map(async (response) => {
    const status = response?.data?.[Object.keys(response.data)[0]]?.status;
    if (status?.success === false) {
      if (status.message === "ATInvalidError") {
        if (!isRefreshing) {
          isRefreshing = true;
          refreshPromise = refreshAccessToken()
            .then(() => {
              const newToken = JSON.parse(
                localStorage.getItem("userInfo") || "{}"
              )?.headers?.access_token;
              processQueue(null, newToken);
              isRefreshing = false;
              return newToken;
            })
            .catch((err) => {
              processQueue(err);
              isRefreshing = false;
              throw err;
            });
        }
        return refreshPromise.then((newToken) => {
          operation.setContext(({ headers = {} }) => ({
            headers: {
              ...headers,
              access_token: newToken,
              device_id: userInfo?.headers?.device_id,
            },
          }));
          return forward(operation);
        });
      }
    }
    return response;
  });
});

const client = new ApolloClient({
  link: from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache(),
});

export const executeQuery = async (query, variables = {}) => {
  const { data } = await client.query({ query, variables });
  const status = data?.[Object.keys(data)[0]]?.status;
  if (status?.success === false) throw new Error(status.message);
  return data;
};

export default client;
