import React from "react";
import { MUIBox, VerticalBox } from "../../../components/MUI/MUIComponents";
import { Table } from "../../../components/Table";
import { ConvertXLSXToJson } from "../../../utils/utils";
import ExportToolbar from "./ExportToolbar";
import {
  GetFilteredData,
  GetTableColumns,
  RemoveDuplicates,
} from "./Export.function";
import Form from "../../../components/Form/Form";
import { EmailForm } from "./EmailForm";
import Pako from "pako";
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';

const Export = () => {
  const [tableData, setTableData] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);
  const [tableColumns, setTableColumns] = React.useState([]);
  const [showDuplicates, setShowDuplicates] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [openSendEmailForm, setOpenSendEmailForm] = React.useState(false);
  const handleCloseEmailForm = () => setOpenSendEmailForm(false);
  const [groups, setGroups] = React.useState([]);

  // Form values and validations
  // const initialValues = {
  //   groups: []
  // }
  // const validationSchema = yup
  // .object()
  // .shape({
  //   groups: yup.array().of(yup.string()).required(),
  // })
  // .required();

  // const { setValue } = useForm({
  //   values: initialValues,
  //   resolver: yupResolver(validationSchema),
  // })

  // Handle file after selecting an excel file
  const handleFileData = async (fileData) => {
    ConvertXLSXToJson(fileData, (jsonData) => {
      const columnNames = Object.keys(jsonData[0]);
      const tableColumnsFormat = GetTableColumns(columnNames);
      setTableColumns(tableColumnsFormat);
      setTableData(jsonData);
      setFilteredData(RemoveDuplicates(jsonData));
    });
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
    const filename = "filtered_data";
    const data = filteredData.map((eachRecord) => {
      return {
        package_name: eachRecord.transitive_package,
        version: eachRecord.transitive_version,
        recommended_version: eachRecord.stable_transitive_version,
        note: "Please ensure latest stable non-vulnerable version that fits your application in case of conflicts",
      };
    });

    const jsonData = JSON.stringify({ data, filename });
    const compressedData = Pako.deflate(jsonData, { to: "string" });

    try {
      const response = await fetch("http://localhost:3001/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "content-encoding": "gzip",
        },
        body: JSON.stringify(compressedData),
      });

      if (response.ok) {
        console.log("Email sent successfully");
        handleCloseEmailForm();
      } else {
        console.error("Email sending failed");
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  const handleSendEmailButton = () => {
    const groupsData = filteredData.map((eachRecord) => {
      return {
        id: eachRecord.groups,
        label: eachRecord.groups,
      };
    });
    const uniqueData = Array.from(
      new Set(groupsData.map((item) => JSON.stringify(item)))
    ).map((item) => JSON.parse(item));
    setGroups(uniqueData);
    setOpenSendEmailForm(true);
  };

  return (
    <>
      <VerticalBox spacing={1} sx={{ padding: "15px", width: "100%" }}>
        <ExportToolbar
          handleSearchBox={handleSearchBox}
          handleFileData={handleFileData}
          handleShowDuplicatesCheckbox={handleShowDuplicatesCheckbox}
          setOpenSendEmailForm={setOpenSendEmailForm}
          handleSendEmailButton={handleSendEmailButton}
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
      <Form
        open={openSendEmailForm}
        onClose={handleCloseEmailForm}
        formContent={
          <EmailForm
            handleCloseEmailForm={handleCloseEmailForm}
            handleEmailDataButton={handleEmailDataButton}
            groups={groups}
          />
        }
        title={"Send email"}
      />
    </>
  );
};

export default Export;
