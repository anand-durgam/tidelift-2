
import React from "react";
import { MUIBox, VerticalBox } from "../../../components/MUI/MUIComponents";
import { Table } from "../../../components/Table";
import { UploadButton } from "../../../components/UploadButton";
import { ConvertCSVToJson } from "../../../utils/utils";
import axios from "axios";

const tableColumns = [
  {
    field: "name",
    headerName: "Name",
    width: 150,
    editable: true,
  },
  {
    field: "place",
    headerName: "Place",
    width: 150,
    editable: true,
  },
  {
    field: "mobile",
    headerName: "Mobile",
    width: 150,
    editable: true,
  },
];

const ExportBackend = () => {
  const [tableData, setTableData] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);

  const handleFileData = async (fileData) => {
    const jsonData = await ConvertCSVToJson(fileData);

    const export_post_url = "http://localhost:3001/export/post";
    try {
      await axios.post(export_post_url, { exportData: jsonData });
    } catch (error) {
      console.log(error.message);
    }
  };

  const getTableData = async () => {
    try {
      const export_get_url = "http://localhost:3001/export/get";
      const response = await axios.get(export_get_url);
      const responseData = response.data.data;
      setTableData(responseData);

      const seenCombinations = new Set();
      const duplicateEntries = [];
      const nonDuplicateEntries = []

      responseData.forEach((entry) => {
        const nameMobileCombination = `${entry.name}-${entry.mobile}`;
        if (seenCombinations.has(nameMobileCombination)) {
          duplicateEntries.push(entry);
        } else {
          seenCombinations.add(nameMobileCombination);
          nonDuplicateEntries.push(entry)
        }
      });
      setFilteredData(nonDuplicateEntries)

    } catch (error) {
      console.log(error.message);
    }
  };

  React.useEffect(() => {
    getTableData();
  }, []);

  return (
    <MUIBox sx={{ padding: "15px" }}>
      <VerticalBox spacing={1}>
        <MUIBox>
          <UploadButton label="Import" handleFileData={handleFileData} />
        </MUIBox>
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

export default ExportBackend;
