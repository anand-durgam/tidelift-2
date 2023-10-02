import { Button } from "@mui/material";
import { FormActions, VerticalBox } from "../../../components/MUI/MUIComponents";
import Dropdown from "../../../components/Dropdown";

export const EmailForm = (props) => {
  const { handleCloseEmailForm, handleEmailDataButton, groups } = props;

  return (
    <div style={{width: '100%'}}>
      <VerticalBox spacing={2} sx={{marginTop: '10px'}}>
        <Dropdown label={'Groups'} data={groups} />
      </VerticalBox>
      
      <FormActions>
        <Button onClick={() => handleCloseEmailForm()}>Cancel</Button>
        <Button onClick={() => handleEmailDataButton()}>Send</Button>
      </FormActions>
    </div>
  );
};
