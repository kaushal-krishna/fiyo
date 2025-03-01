import { fiyoauthApiBaseUri } from "../constants.js";
import fiyoAxios from "../utils/fiyoAxios.js";

export const getAllUsers = async () => {
  try {
    const { data } = await fiyoAxios.get(`${fiyoauthApiBaseUri}/users`);
    return data.data;
  } catch (error) {
    console.error(`Error in getAllUsers: ${error}`);
  }
};

export const getUser = async username => {
  try {
    const { data } = await fiyoAxios.get(
      `${fiyoauthApiBaseUri}/users/profile/${username}`,
    );
    return data.data;
  } catch (error) {
    console.error(`Error in getUser: ${error}`);
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const { data } = await fiyoAxios.put(
      `${fiyoauthApiBaseUri}/users/update/${userId}`,
      userData,
    );
    return data.data;
  } catch (error) {
    console.error(`Error in updateUser: ${error}`);
  }
};

export const deleteUser = async userId => {
  try {
    const { data } = await fiyoAxios.delete(
      `${fiyoauthApiBaseUri}/users/delete/${userId}`,
    );
    return data.data;
  } catch (error) {
    console.error(`Error in deleteUser: ${error}`);
  }
};

export const getBulkUsers = async userIds => {
  try {
    const { data } = await fiyoAxios.post(`${fiyoauthApiBaseUri}/users/bulk`, {
      userIds,
    });
    return data.data;
  } catch (error) {
    console.error(`Error in getBulkUsers: ${error}`);
  }
};

export const searchUsers = async searchText => {
  try {
    const { data } = await fiyoAxios.get(
      `${fiyoauthApiBaseUri}/users/search/${searchText}`,
    );
    return data.data;
  } catch (error) {
    console.error(`Error in searchUsers: ${error}`);
  }
};