import React from "react";
import ActivityCard from "../ActivityCard";
import { useApi } from "../../utils/backend/useAPI";

const List = ({ list, archivedList, setArchivedList }) => {
  const { error, loading, updateCallData, fetchCallDetails } = useApi();

  return (
    <div>
      {list.length > 0 ? (
        <>
          {list.map((call) => (
            <div key={call.id}>
              <ActivityCard
                id={call.id}
                direction={call.direction}
                callType={call.call_type}
                from={call.from}
                to={call.to}
                is_archived={call.is_archived}
                createdAt={call.created_at}
                archivedList={archivedList}
                setArchivedList={setArchivedList}
                updateCallData={updateCallData}
                fetchCallDetails={fetchCallDetails}
                loading={loading}
                error={error}
              />
            </div>
          ))}
        </>
      ) : (
        <div className="text-center">
          <h3 className="text-gray-400">
            You don't have more notifications to review
          </h3>
        </div>
      )}
    </div>
  );
};

export default List;
