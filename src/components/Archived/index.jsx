import { Divider } from "@mui/material";
import React from "react";
import Button from "@mui/material/Button";
import AirCallContainer from "../../containers/airCallContainer";
import ActivityCard from "../ActivityCard";
import { useApi } from "../../utils/backend/useAPI";
import { Dvr } from "@mui/icons-material";

const Archived = () => {
  const { error, loading, resetCallData, updateCallData, fetchCallDetails } =
    useApi();
  const { archivedList, setArchivedList } = AirCallContainer.useContainer();

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-xl">Archived list</h1>
        <Button
          disabled={loading || archivedList.length === 0}
          fontSize="small"
          onClick={() => {
            resetCallData({
              successCallBack: () => {
                setArchivedList([]);
              },
            });
          }}
          variant="outlined"
          color="error"
          sx={{
            textTransform: "none",
          }}>
          Unarchive all
        </Button>
      </div>

      <Divider
        sx={{
          margin: "10px 0",
        }}
      />

      <div>
        {archivedList.length > 0 ? (
          <>
            {archivedList.map((call) => (
              <div key={call.id}>
                <ActivityCard
                  id={call.id}
                  direction={call.direction}
                  callType={call.call_type}
                  from={call.from}
                  to={call.to}
                  isArchived={call.is_archived}
                  createdAt={call.created_at}
                  archivedList={archivedList}
                  setArchivedList={setArchivedList}
                  updateCallData={updateCallData}
                  fetchCallDetails={fetchCallDetails}
                  error={error}
                  loading={loading}
                />
              </div>
            ))}
          </>
        ) : (
          <div>
            <h3 className="text-gray-400">
              You don't have the archived list yet.
            </h3>
          </div>
        )}
      </div>
      {error && <h3>{error}</h3>}
    </div>
  );
};

export default Archived;
