import fiyoAxios from "../utils/fiyoAxios.js";
import { fiyoauthApiBaseUri } from "../constants.js";

const makeApiRequest = async (method, endpoint, reqBody = null) => {
  try {
    const config = method === "get" ? { params: reqBody } : reqBody;
    const { data } = await fiyoAxios[method](
      `${fiyoauthApiBaseUri}/${endpoint}`,
      config,
    );
    return data.data;
  } catch (error) {
    console.error(`Error in ${endpoint}:`, error?.response?.data || error);
    return null;
  }
};

const getUserFollowers = (userId, limit = 20, offset = 0) =>
  makeApiRequest("get", `connections/followers/${userId}`, { limit, offset });

const getUserFollowing = (userId, limit = 20, offset = 0) =>
  makeApiRequest("get", `connections/following/${userId}`, { limit, offset });

const getPendingFollowRequests = () =>
  makeApiRequest("get", "connections/pending/follow_requests");

const sendFollowRequest = (followingId) =>
  makeApiRequest("post", "connections/send/follow_request", {
    following_id: followingId,
  });

const unsendFollowRequest = (followingId) =>
  makeApiRequest("post", "connections/unsend/follow_request", {
    following_id: followingId,
  });

const acceptFollowRequest = (followerId) =>
  makeApiRequest("post", "connections/accept/follow_request", {
    follower_id: followerId,
  });

const rejectFollowRequest = (followerId) =>
  makeApiRequest("post", "connections/reject/follow_request", {
    follower_id: followerId,
  });

const getUserMates = () => makeApiRequest("get", "connections/mates");

const getPendingMateRequests = () =>
  makeApiRequest("get", "connections/pending/mate_requests");

const sendMateRequest = (initiatorId) =>
  makeApiRequest("post", "connections/send/mate_request", {
    mate_id: initiatorId,
  });

const unsendMateRequest = (initiatorId) =>
  makeApiRequest("post", "connections/unsend/mate_request", {
    mate_id: initiatorId,
  });

const acceptMateRequest = (initiatorId) =>
  makeApiRequest("post", "connections/accept/mate_request", {
    initiator_id: initiatorId,
  });

const rejectMateRequest = (initiatorId) =>
  makeApiRequest("post", "connections/reject/mate_request", {
    initiator_id: initiatorId,
  });

export {
  getUserFollowers,
  getUserFollowing,
  getPendingFollowRequests,
  sendFollowRequest,
  unsendFollowRequest,
  acceptFollowRequest,
  rejectFollowRequest,
  getUserMates,
  getPendingMateRequests,
  sendMateRequest,
  unsendMateRequest,
  acceptMateRequest,
  rejectMateRequest,
};
