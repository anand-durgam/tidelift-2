import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
  CloseButton,
  CustomDialogContent,
  CustomDialogTitle,
  CustomFormDialog,
} from "./FormComponents";

export default function Form(props) {
  const {
    open,
    onClose,
    formContent,
    maxWidth = "60vw",
    minWidth = "50vw",
    title,
    closable = true,
    contentFontSize = "1rem",
    className = "",
  } = props;
  return (
    <div>
      <CustomFormDialog open={open} maxWidth={maxWidth} minWidth={minWidth} className={className}>
        <CustomDialogTitle>
          {title}
          {closable && (
            <CloseButton onClick={onClose}>
              <CloseIcon />
            </CloseButton>
          )}
        </CustomDialogTitle>
        <CustomDialogContent fontSize={contentFontSize}>
          {formContent}
        </CustomDialogContent>
      </CustomFormDialog>
    </div>
  );
}
