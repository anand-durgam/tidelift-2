import React from "react";
import { Grid } from "@mui/material";
import { MUIBox } from "../../components/MUI/MUIComponents";
import { SideBar } from "./SideBar";
import Export from "./Export/Export";
import Starred from "./Starred/Starred";

export const Tidelift = () => {
  const [sidebarItem, setSidebarItem] = React.useState({
    id: 1,
    label: "Inbox",
  });
  const SideBarItems = [
    { id: 1, label: "Export" },
    { id: 2, label: "Starred" },
    { id: 3, label: "Drafts" },
  ];

  const handleSideBarItems = (selectedItem) => {
    setSidebarItem(selectedItem);
  };

  const getSideBarItemContent = (sidebarItem) => {
    if (sidebarItem.id === 1) {
      return <Export />
    }else if (sidebarItem.id === 2){
      return <Starred />
    }
  };

  return (
    <MUIBox component="main">
      <Grid container>
        <Grid item xs={1.9}>
          <SideBar
            SideBarItems={SideBarItems}
            handleSideBarItems={handleSideBarItems}
          />
        </Grid>
        <Grid item xs={10.1}>
          {getSideBarItemContent(sidebarItem)}
        </Grid>
      </Grid>
    </MUIBox>
  );
};
