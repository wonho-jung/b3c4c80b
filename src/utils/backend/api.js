import axios from "axios";

export const apiServer = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const getActivityFeedCalls = () => {
  return apiServer.get("/activities");
};

export const getCallDetails = (id) => {
  return apiServer.get(`/activities/${id}`);
};

export const updateCall = (id, is_archived) => {
  return apiServer.patch(`/activities/${id}`, {
    is_archived,
  });
};

export const resetCall = () => {
  return apiServer.patch("/reset");
};
