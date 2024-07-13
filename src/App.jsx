import React, { useState } from "react";
import ReactDOM from "react-dom";
import Header from "./components/Header";
import FooterNav from "./components/FooterNav";
import TabPanel from "@mui/lab/TabPanel";
import { TabContext } from "@mui/lab";
import Inbox from "./components/Inbox";
import Archived from "./components/Archived";
import { Helmet } from "react-helmet";
import AirCallContainer from "./containers/AirCallContainer";

const App = () => {
  const [value, setValue] = useState("1");
  const tabChangeHandler = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Helmet>
        <title>aircall</title>
        <meta name="description" content="aircall" />
      </Helmet>
      <AirCallContainer.Provider>
        <div className="absolute flex items-center justify-center inset-0">
          <div className="relative w-[376px] h-[666px] z-10 bg-white rounded shadow-md">
            <Header />
            <TabContext value={value}>
              <main className="m-2">
                <TabPanel value="1">
                  <Inbox />
                </TabPanel>
                <TabPanel value="3">
                  <Archived />
                </TabPanel>
              </main>
              <FooterNav tabChangeHandler={tabChangeHandler} value={value} />
            </TabContext>
          </div>
        </div>
      </AirCallContainer.Provider>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));

export default App;
