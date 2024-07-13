import React, { useEffect, useState } from "react";
import { useApi } from "../../utils/backend/useAPI";
import CallTypeTabs from "./CallTypeTabs";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { Button, Divider } from "@mui/material";
import AirCallContainer from "../../containers/airCallContainer";
import List from "./List";
import CircularProgress from "@mui/material/CircularProgress";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const Inbox = () => {
  const { archivedList, setArchivedList } = AirCallContainer.useContainer();
  const {
    callsData: calls,
    loading,
    error,
    fetchActivityFeedCalls,
    updateCallData,
  } = useApi();
  const theme = useTheme();
  const [callType, setCallType] = useState(0);
  const [allType, setAllType] = useState([]);
  const [missedType, setMissedType] = useState([]);
  const [voicemailType, setVoicemailType] = useState([]);
  const [archiveAllError, setArchiveAllError] = useState(null);
  useEffect(() => {
    fetchActivityFeedCalls();
  }, []);
  // After fetching the data, filter the data based on the call type
  useEffect(() => {
    if (!calls) return;
    let filteredCalls = calls;
    if (archivedList.length > 0) {
      filteredCalls = calls.filter(
        (call) =>
          !archivedList.some((archivedCall) => archivedCall.id === call.id)
      );
    }
    const all = filteredCalls;
    const missed = filteredCalls.filter((call) => call.call_type === "missed");
    const voicemail = filteredCalls.filter(
      (call) => call.call_type === "voicemail"
    );
    setAllType(all);
    setMissedType(missed);
    setVoicemailType(voicemail);
  }, [calls, archivedList]);

  const callTypeHandler = (event, newValue) => {
    setCallType(newValue);
  };

  const archiveAllOnClickHandler = async () => {
    try {
      const callData = allType.map((call) => {
        return {
          ...call,
          is_archived: true,
        };
      });
      await Promise.all(
        callData.map((data) =>
          updateCallData({
            id: data.id,
            is_archived: true,
          })
        )
      );
      setAllType([]);
      setMissedType([]);
      setVoicemailType([]);
      setArchivedList([...archivedList, ...callData]);
    } catch (err) {
      setArchiveAllError(err);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-xl">Activity Feed</h1>
        <Button
          disabled={!allType || allType.length === 0 || loading}
          fontSize="small"
          onClick={archiveAllOnClickHandler}
          variant="outlined"
          sx={{
            textTransform: "none",
          }}>
          Archive all
        </Button>
      </div>

      <Divider
        sx={{
          margin: "10px 0",
        }}
      />
      {!!calls ? (
        <CallTypeTabs callType={callType} callTypeHandler={callTypeHandler}>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={callType}
            onChangeIndex={callTypeHandler}>
            <TabPanel value={callType} index={0} dir={theme.direction}>
              <List
                list={allType}
                archivedList={archivedList}
                setArchivedList={setArchivedList}
              />
            </TabPanel>
            <TabPanel value={callType} index={1} dir={theme.direction}>
              <List
                list={missedType}
                archivedList={archivedList}
                setArchivedList={setArchivedList}
              />
            </TabPanel>
            <TabPanel value={callType} index={2} dir={theme.direction}>
              <List
                list={voicemailType}
                archivedList={archivedList}
                setArchivedList={setArchivedList}
              />
            </TabPanel>
          </SwipeableViews>
        </CallTypeTabs>
      ) : (
        <div className="text-center mt-20">
          {loading ? (
            <Box>
              <CircularProgress />
            </Box>
          ) : (
            <p className="text-gray-400">You don't have any history to see</p>
          )}
        </div>
      )}
      {error && <div>{error}</div>}
      {archiveAllError && <div>{archiveAllError}</div>}
    </div>
  );
};

export default Inbox;
