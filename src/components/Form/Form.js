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
    maxWidth = "100%",
    title,
    closable = true,
    contentFontSize = "1rem",
    className = "",
  } = props;
  const { content } = formContent;
  return (
    <div>
      <CustomFormDialog open={open} maxWidth={maxWidth} className={className}>
        <CustomDialogTitle>
          {title}
          {closable && (
            <CloseButton onClick={onClose}>
              <CloseIcon />
            </CloseButton>
          )}
        </CustomDialogTitle>
        <CustomDialogContent fontSize={contentFontSize}>
          {content}
        </CustomDialogContent>
      </CustomFormDialog>
    </div>
  );
}
