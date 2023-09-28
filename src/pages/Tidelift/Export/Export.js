import React from "react";
import { MUIBox, VerticalBox } from "../../../components/MUI/MUIComponents";
import { Table } from "../../../components/Table";
import { ConvertCSVToJson } from "../../../utils/utils";
import ExportToolbar from "./ExportToolbar";
import {
  GetFilteredData,
  GetTableColumns,
  RemoveDuplicates,
} from "./Export.function";
import Form from "../../../components/Form/Form";
import { EmailForm } from "./EmailForm";

const Export = () => {
  const [tableData, setTableData] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);
  const [tableColumns, setTableColumns] = React.useState([]);
  const [showDuplicates, setShowDuplicates] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [openSendEmailForm, setOpenSendEmailForm] = React.useState(false);
  const handleCloseEmailForm = () => setOpenSendEmailForm(false);

  // Handle file after selecting an excel file
  const handleFileData = async (fileData) => {
    const jsonData = await ConvertCSVToJson(fileData);
    // const jsonData = await ConvertXLSXToJson(fileData);
    const columnNames = Object.keys(jsonData[0]);
    const tableColumnsFormat = GetTableColumns(columnNames);
    setTableColumns(tableColumnsFormat);
    setTableData(jsonData);
    setFilteredData(RemoveDuplicates(jsonData));
  };

  // Filter data based on the search text
  const handleSearchBox = (event) => {
    setSearchValue(event.target.value);
    const searchFilteredData = GetFilteredData(tableData, event.target.value);
    if (showDuplicates) {
      setFilteredData(searchFilteredData);
    } else {
      const uniqueDataArray = RemoveDuplicates(searchFilteredData);
      setFilteredData(uniqueDataArray);
    }
  };

  const handleShowDuplicatesCheckbox = (event) => {
    setShowDuplicates(event.target.checked);
    const duplicateData = GetFilteredData(tableData, searchValue);
    if (event.target.checked) {
      setFilteredData(duplicateData);
    } else {
      const uniqueDataArray = RemoveDuplicates(duplicateData);
      setFilteredData(uniqueDataArray);
    }
  };

  const handleEmailDataButton = async () => {
    const data = filteredData;
    const filename = "filtered_data";

    try {
      const response = await fetch("http://localhost:3001/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data, filename }),
      });

      if (response.ok) {
        console.log("Email sent successfully");
      } else {
        console.error("Email sending failed");
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  return (
    <>
      <MUIBox sx={{ padding: "15px" }}>
        <VerticalBox spacing={1}>
          <ExportToolbar
            handleSearchBox={handleSearchBox}
            handleFileData={handleFileData}
            handleShowDuplicatesCheckbox={handleShowDuplicatesCheckbox}
            setOpenSendEmailForm={setOpenSendEmailForm}
          />
          <MUIBox sx={{ height: "80vh" }}>
            <Table
              rows={filteredData}
              columns={tableColumns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </MUIBox>
        </VerticalBox>
      </MUIBox>
      <Form
        open={openSendEmailForm}
        onClose={handleCloseEmailForm}
        formContent={{
          content: <EmailForm handleCloseEmailForm={handleCloseEmailForm} />,
        }}
        title={"Send email"}
        maxWidth={"50%"}
      />
    </>
  );
};

export default Export;
