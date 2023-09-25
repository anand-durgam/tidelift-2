import React from "react";
import {
  HorizontalBox,
  MUIButton,
} from "../../../components/MUI/MUIComponents";
import { UploadButton } from "../../../components/UploadButton";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";

const ExportToolbar = (props) => {
  const {
    handleSearchBox,
    handleShowDuplicatesCheckbox,
    handleFileData,
    handleEmailDataButton,
  } = props;

  return (
    <HorizontalBox spacing={5}>
      <UploadButton label="Import" handleFileData={handleFileData} />
      <TextField
        onChange={(e) => handleSearchBox(e)}
        type="search"
        id="search"
        size="small"
        label="Search"
        sx={{ width: 500 }}
      />
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox onChange={(e) => handleShowDuplicatesCheckbox(e)} />
          }
          label="Show duplicates"
        />
      </FormGroup>
      <MUIButton variant="contained" onClick={() => handleEmailDataButton()}>
        Email data
      </MUIButton>
    </HorizontalBox>
  );
};

export default ExportToolbar;
