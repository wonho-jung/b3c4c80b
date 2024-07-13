import { useState } from "react";
import {
  getActivityFeedCalls,
  getCallDetails,
  updateCall,
  resetCall,
} from "./api";

export const useApi = () => {
  const [callsData, setCallsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchActivityFeedCalls = async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await getActivityFeedCalls();
      setCallsData(response.data);
    } catch (err) {
      setError(err || "Activity feed calls not found");
    } finally {
      setLoading(false);
    }
  };

  const fetchCallDetails = async ({ id, successCallBack }) => {
    setError(null);
    setLoading(true);
    try {
      const response = await getCallDetails(id);
      if (successCallBack) {
        successCallBack(response.data);
      }
    } catch (err) {
      setError(err || "Call details not found");
    } finally {
      setLoading(false);
    }
  };

  const updateCallData = async ({ id, is_archived, successCallBack }) => {
    setError(null);
    setLoading(true);
    try {
      await updateCall(id, is_archived);
      if (successCallBack) {
        successCallBack();
      }
    } catch (err) {
      setError(err || "Failed to update call data");
    } finally {
      setLoading(false);
    }
  };

  const resetCallData = async ({ successCallBack }) => {
    setError(null);
    setLoading(true);
    try {
      await resetCall();
      if (successCallBack) {
        successCallBack();
      }
    } catch (err) {
      setError(err || "Failed to reset call data");
    } finally {
      setLoading(false);
    }
  };

  return {
    callsData,
    loading,
    error,
    fetchActivityFeedCalls,
    fetchCallDetails,
    updateCallData,
    resetCallData,
  };
};
