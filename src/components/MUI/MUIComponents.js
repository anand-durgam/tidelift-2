import { Box, Toolbar, Typography, Button, Stack } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export const Heading = (props) => {
  return <Typography {...props}>{props.children}</Typography>;
};

export const SubHeading = (props) => {
  return <Typography {...props}>{props.children}</Typography>;
};

export const Text = (props) => {
  return <Typography {...props}>{props.children}</Typography>;
};

export const MUIBox = (props) => {
  return <Box {...props}>{props.children}</Box>;
};

export const MUIToolbar = (props) => {
  return <Toolbar {...props}>{props.children}</Toolbar>;
};

export const MUIButton = (props) => {
  return <Button {...props}>{props.children}</Button>;
};

export const UploadIcon = (props) => {
  return <CloudUploadIcon {...props} />;
};

export const VerticalBox = (props) => {
  return <Stack direction={'column'} {...props}>{props.children}</Stack>;
};

export const HorizontalBox = (props) => {
  return <Stack direction={'row'} {...props}>{props.children}</Stack>;
};
