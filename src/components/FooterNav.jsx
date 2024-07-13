import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PhoneIcon from "@mui/icons-material/Phone";
import DialpadIcon from "@mui/icons-material/Dialpad";
import StarIcon from "@mui/icons-material/Star";
const FooterNav = ({ tabChangeHandler, value }) => {
  return (
    <footer className="border border-t-gray-200 absolute bottom-0 left-0 w-full">
      <Tabs
        value={value}
        onChange={tabChangeHandler}
        aria-label="Activity Feed tabs"
        variant="fullWidth"
        indicatorColor="none">
        <Tab
          sx={{
            textTransform: "capitalize",
          }}
          icon={<PhoneIcon />}
          label="Inbox"
          value="1"
        />
        <Tab
          sx={{
            textTransform: "capitalize",
          }}
          disabled
          icon={<DialpadIcon />}
          label="KeyPad"
          value="2"
        />
        <Tab
          sx={{
            textTransform: "capitalize",
          }}
          icon={<StarIcon />}
          label="Archived"
          value="3"
        />
      </Tabs>
    </footer>
  );
};

export default FooterNav;
