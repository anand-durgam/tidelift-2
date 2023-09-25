import * as React from "react";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import { MUIToolbar } from "../../components/MUI/MUIComponents";

const drawerWidth = 240;

export const SideBar = (props) => {
  const { SideBarItems, handleSideBarItems } = props;

  const [selectedItem, setSelectedItem] = React.useState(SideBarItems[0]);
  const handleItemClick = (item) => {
    setSelectedItem(item); 
    handleSideBarItems(item);
  };

  const drawer = (
    <div>
      <Divider />
      <MUIToolbar />
      <List>
        {SideBarItems.map((eachItem, index) => (
          <ListItem
            key={eachItem.id}
            disablePadding
            onClick={() => handleItemClick(eachItem)}
          >
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={eachItem.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            zIndex: 1,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </>
  );
};
