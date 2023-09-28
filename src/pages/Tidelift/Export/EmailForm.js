import { Button } from "@mui/material";
import { FormActions } from "../../../components/MUI/MUIComponents";

export const EmailForm = (props) => {
  const { handleCloseEmailForm } = props;

  return (
    <div>
      Email Form
      <FormActions>
        <Button onClick={() => handleCloseEmailForm()}>Cancel</Button>
        <Button onClick={() => handleCloseEmailForm()}>Subscribe</Button>
      </FormActions>
    </div>
  );
};
