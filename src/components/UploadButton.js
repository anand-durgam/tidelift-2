import * as React from "react";
import { styled } from "@mui/material/styles";
import { MUIButton, UploadIcon } from "./MUI/MUIComponents";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export const UploadButton = (props) => {
  const { handleFileData } = props;

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileData(file);
    }
  };

  return (
    <MUIButton
      component="label"
      variant="contained"
      startIcon={<UploadIcon />}
      onChange={(e) => handleFileUpload(e)}
    >
      {`${props.label}` || "Upload file"}
      <VisuallyHiddenInput type="file" />
    </MUIButton>
  );
};
