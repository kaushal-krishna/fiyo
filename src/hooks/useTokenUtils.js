import { fiyoauthApiBaseUri } from "../constants.js";
import fiyoAxios from "../utils/fiyoAxios.js";

const refreshAccessToken = async () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  try {
    const { data } = await fiyoAxios.get(
      `${fiyoauthApiBaseUri}/tokens/refresh`,
      {
        headers: {
          fiyort: userInfo?.headers?.fiyort,
        },
      },
    );

    const updatedUserInfo = {
      ...userInfo,
      headers: {
        ...userInfo?.headers,
        fiyoat: data.data?.headers?.fiyoat,
      },
    };

    localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
  } catch (error) {
    if (error.response.data?.message === "RTInvalidError") {
      localStorage.removeItem("userInfo");
    }
  }
};

export { refreshAccessToken };
