import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

const a11yProps = (callType, index) => {
  return {
    id: `${callType}-${index}`,
    "aria-controls": `tabpanel-${callType}`,
  };
};

const CallTypeTabs = ({ callType, callTypeHandler, children }) => {
  return (
    <Box
      sx={{
        bgcolor: "#F3F4F6",
        shadow: "none",
        height: "400px",
        borderRadius: "12px",
        overflow: "auto",
      }}>
      <AppBar
        sx={{
          borderRadius: "12px 12px 0 0",
        }}
        elevation={0}
        position="static">
        <Tabs
          sx={{
            borderRadius: "12px 12px 0 0",
            border: "1px solid #BBDEFB",
            backgroundColor: "#BBDEFB",
          }}
          size="small"
          value={callType}
          onChange={callTypeHandler}
          indicatorColor="none"
          variant="fullWidth"
          aria-label="call types">
          <Tab
            sx={{ textTransform: "capitalize" }}
            label="All"
            {...a11yProps(callType, 0)}
          />
          <Tab
            sx={{ textTransform: "capitalize" }}
            label="Missed"
            {...a11yProps(callType, 1)}
          />
          <Tab
            sx={{ textTransform: "capitalize" }}
            label="Voicemail"
            {...a11yProps(callType, 2)}
          />
        </Tabs>
      </AppBar>
      {children}
    </Box>
  );
};
export default CallTypeTabs;
