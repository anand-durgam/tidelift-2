import { DataGrid } from "@mui/x-data-grid";

export const Table = (props) => {
  const { columns, rows, rest } = props;
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      {...rest}
    />
  );
};
