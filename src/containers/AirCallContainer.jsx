import { useState } from "react";
import { createContainer } from "unstated-next";
const useCalls = () => {
  const [archivedList, setArchivedList] = useState([]);

  return {
    archivedList,
    setArchivedList,
  };
};

const AirCallContainer = createContainer(useCalls);

export default AirCallContainer;
