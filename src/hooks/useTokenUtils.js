import client from "../utils/apolloClient.js";
import { REFRESH_ACCESS_TOKEN } from "../graphql/fiyouser/auth.ops.js";

const refreshAccessToken = async () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

  try {
    const { data } = await client.query({
      query: REFRESH_ACCESS_TOKEN,
      context: {
        headers: {
          refresh_token: userInfo?.headers?.access_token,
        },
      },
      fetchPolicy: "no-cache",
    });

    const response = data?.refreshAccessToken;
    if (response?.status?.success) {
      const updatedUserInfo = {
        ...userInfo,
        headers: {
          ...userInfo?.headers,
          access_token: response.headers.access_token,
          refresh_token: response.headers.refresh_token,
          device_id: response.headers.device_id,
        },
      };

      localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
    } else if (response?.status?.message === "RTInvalidError") {
      localStorage.removeItem("userInfo");
      window.location.reload();
    }
  } catch (error) {
    console.error("Token refresh failed:", error);
    localStorage.removeItem("userInfo");
    window.location.reload();
  }
};

export { refreshAccessToken };
