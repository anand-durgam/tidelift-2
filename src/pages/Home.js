import TopBar from "../components/AppBar/AppBar";
import { Main } from "./Main/Main";
import { MUIBox, MUIToolbar } from "../components/MUI/MUIComponents";
import React from "react";
import { Tidelift } from "./Tidelift/Tidelift";
import Partner2 from "./Partner2/Partner2";

const Home = () => {
  const appBarActionNames = {
    companyName: "Vulnerability management",
    tidelift: "Tidelift",
    partner2: "Partner 2",
  };

  const [appBarActionName, setAppBarActionName] = React.useState(
    appBarActionNames.companyName
  );
  const handleAppBarActionNames = (actionName) => {
    setAppBarActionName(actionName);
  };

  return (
    <>
      <MUIBox sx={{ flexGrow: 1 }}>
        <TopBar
          handleAppBarActionNames={handleAppBarActionNames}
          appBarActionName={appBarActionName}
        />
        <MUIBox>
          <MUIToolbar />
          {appBarActionName === appBarActionNames.companyName && <Main />}
          {appBarActionName === appBarActionNames.tidelift && <Tidelift />}
          {appBarActionName === appBarActionNames.partner2 && <Partner2 />}
        </MUIBox>
      </MUIBox>
    </>
  );
};

export default Home;
