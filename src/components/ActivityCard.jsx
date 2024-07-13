import React, { useEffect, useState } from "react";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import CallMissedIcon from "@mui/icons-material/CallMissed";
import CallMadeIcon from "@mui/icons-material/CallMade";
import VoicemailIcon from "@mui/icons-material/Voicemail";
import { formatDate } from "../utils/fomatDate";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CallMissedOutgoingIcon from "@mui/icons-material/CallMissedOutgoing";
import { Button, Divider } from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const ActivityCard = ({
  id,
  direction,
  callType,
  from,
  to,
  isArchived,
  createdAt,
  archivedList,
  setArchivedList,
  error,
  loading,
  updateCallData,
  fetchCallDetails,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [detailInfo, setDetailInfo] = useState(null);
  useEffect(() => {
    //Avoid fetching the data again if the detail info is already fetched
    if (detailInfo) return;
    if (isOpen) {
      fetchCallDetails({
        id: id,
        successCallBack: (data) => {
          setDetailInfo(data);
        },
      });
    }
  }, [isOpen]);

  const updatedCallback = (isArchived) => {
    if (isArchived) {
      setArchivedList([
        ...archivedList,
        {
          id: id,
          direction: direction,
          call_type: callType,
          from: from,
          to: to,
          is_archived: isArchived,
          created_at: createdAt,
          //detail info
          duration: detailInfo?.duration,
          via: detailInfo?.via,
        },
      ]);
    } else {
      setArchivedList(archivedList.filter((call) => call.id !== id));
    }
  };
  return (
    <div className="mb-2">
      <Accordion
        onChange={(event, expanded) => {
          setIsOpen(expanded);
        }}>
        <AccordionSummary
          sx={{
            height: "24px",
          }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="call-detail"
          id="call-card-head">
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center">
              <div className="mr-2">
                {callType === "missed" && (
                  <>
                    {direction === "inbound" && (
                      <CallMissedIcon color="error" fontSize="small" />
                    )}
                    {direction === "outbound" && (
                      <CallMissedOutgoingIcon color="error" fontSize="small" />
                    )}
                  </>
                )}
                {callType === "voicemail" && <VoicemailIcon fontSize="small" />}
                {callType === "answered" && (
                  <>
                    {direction === "inbound" && (
                      <CallReceivedIcon color="success" fontSize="small" />
                    )}
                    {direction === "outbound" && (
                      <CallMadeIcon color="success" fontSize="small" />
                    )}
                  </>
                )}
              </div>
              <div>
                <span className="text-xs">
                  {direction === "inbound" && <> {from}</>}
                  {direction === "outbound" && <> {to}</>}
                </span>
              </div>
            </div>
            <div className="mr-1">
              {<span className="text-xs">{formatDate(createdAt)}</span>}
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <Divider
            sx={{
              mb: 1,
            }}
          />
          {detailInfo && (
            <div className="flex flex-col">
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-xs">
                    Duration: {detailInfo.duration}s
                  </span>
                  <span className="text-xs">Via: {detailInfo.via}</span>
                </div>
                <div></div>
                <div>
                  <Button
                    sx={{
                      textTransform: "none",
                    }}
                    disabled={loading}
                    fontSize="small"
                    variant="outlined"
                    onClick={() => {
                      updateCallData({
                        id: id,
                        is_archived: !isArchived,
                        successCallBack: () => updatedCallback(!isArchived),
                      });
                    }}>
                    {isArchived ? "Unarchive" : "Archive"}
                  </Button>
                </div>
              </div>
            </div>
          )}
          {!detailInfo && loading && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <CircularProgress />
            </Box>
          )}
          {error && <div>{error}</div>}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default ActivityCard;
