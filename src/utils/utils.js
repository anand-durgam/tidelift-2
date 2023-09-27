import csvtojson from "csvtojson";
import { v4 as uuid } from "uuid";
import * as XLSX from "xlsx";

export const ConvertCSVToJson = async (data) => {
  try {
    const jsonData = await csvtojson().fromString(data);
    const modifiedJsonData = jsonData.map((eachRecord) => {
      const unique_id = uuid();
      return { ...eachRecord, id: unique_id };
    });
    return modifiedJsonData;
  } catch (error) {
    console.error("Error converting CSV to JSON:", error);
  }
};

export const ConvertXLSXToJson = async (data) => {
  if (data) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      const workbook = XLSX.read(content, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      return jsonData;
    };
  }
};

export const convertDataToExcel = (data, filename) => {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, filename);
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  return blob
  // const url = URL.createObjectURL(blob);
  // window.open(url);
};

