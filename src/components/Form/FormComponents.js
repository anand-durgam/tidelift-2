import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { styled } from "@mui/system";

export const CustomFormDialog = styled(Dialog)(({ maxWidth, minWidth }) => ({
  "& .MuiPaper-root": {
    maxWidth: `${maxWidth}`,
    minWidth: `${minWidth}`,
  },
}));

export const CustomDialogTitle = styled(DialogTitle)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const CustomDialogContent = styled(DialogContent)(({ fontSize }) => ({
  fontSize: fontSize,
}));

export const CloseButton = styled(IconButton)({
  color: "grey",
});
