import React from "react";
import { MUIBox, VerticalBox } from "../../../components/MUI/MUIComponents";
import { Table } from "../../../components/Table";
import { ConvertCSVToJson } from "../../../utils/utils";
import ExportToolbar from "./ExportToolbar";

const Export = () => {
  const [tableData, setTableData] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);
  const [tableColumns, setTableColumns] = React.useState([]);
  const [showDuplicates, setShowDuplicates] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");

  // Remove duplicates from the actual data
  const removeDuplicates = (data) => {
    const seen = new Set();
    const unique = [];

    for (const entry of data) {
      const key = `${entry.project}-${entry.groups}-${entry.transitive_package}`;
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(entry);
      }
    }
    return unique;
  };

  // Create Table columns using the excel data
  const getTableColumns = (columns) => {
    const tableColumnsArray = columns.map((eachColName) => {
      return { field: eachColName, headerName: eachColName, width: 250 };
    });
    return tableColumnsArray;
  };

  // Handle file after selecting an excel file
  const handleFileData = async (fileData) => {
    const jsonData = await ConvertCSVToJson(fileData);
    // const jsonData = await ConvertXLSXToJson(fileData);
    const columnNames = Object.keys(jsonData[0]);
    const tableColumnsFormat = getTableColumns(columnNames);
    setTableColumns(tableColumnsFormat);
    setTableData(jsonData);
    setFilteredData(removeDuplicates(jsonData));
  };

  // filter data
  const getFilteredData = (value) => {
    return tableData.filter(
      (eachRow) =>
        eachRow.project.includes(value) ||
        eachRow.transitive_package.includes(value) ||
        eachRow.groups.includes(value)
    );
  };

  // Filter data based on the search text
  const handleSearchBox = (event) => {
    setSearchValue(event.target.value);
    const searchFilteredData = getFilteredData(event.target.value);
    if (showDuplicates) {
      setFilteredData(searchFilteredData);
    } else {
      const uniqueDataArray = removeDuplicates(searchFilteredData);
      setFilteredData(uniqueDataArray);
    }
  };

  const handleShowDuplicatesCheckbox = (event) => {
    setShowDuplicates(event.target.checked);
    const duplicateData = getFilteredData(searchValue);
    if (event.target.checked) {
      setFilteredData(duplicateData);
    } else {
      const uniqueDataArray = removeDuplicates(duplicateData);
      setFilteredData(uniqueDataArray);
    }
  };

  const handleEmailDataButton = async () => {
    const data = filteredData
    const filename = 'filtered_data'

    try {
      const response = await fetch('http://localhost:3001/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data, filename }),
      });
  
      if (response.ok) {
        console.log('Email sent successfully');
      } else {
        console.error('Email sending failed');
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  
  };

  return (
    <MUIBox sx={{ padding: "15px" }}>
      <VerticalBox spacing={1}>
        <ExportToolbar
          handleSearchBox={handleSearchBox}
          handleFileData={handleFileData}
          handleShowDuplicatesCheckbox={handleShowDuplicatesCheckbox}
          handleEmailDataButton={handleEmailDataButton}
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
  );
};

export default Export;
