// Remove duplicates from the actual data
export const RemoveDuplicates = (data) => {
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
export const GetTableColumns = (columns) => {
  const tableColumnsArray = columns.map((eachColName) => {
    return { field: eachColName, headerName: eachColName, width: 250 };
  });
  return tableColumnsArray;
};

// filter data
export const GetFilteredData = (data, value) => {
  return data.filter((eachRow) => {
    const projectIncludes =
      eachRow.project && eachRow.project.indexOf(value) !== -1;
    const transitivePackageIncludes =
      eachRow.transitive_package &&
      eachRow.transitive_package.indexOf(value) !== -1;

    const groupsString = eachRow.groups || "";
    const groupsIncludes = groupsString.indexOf(value) !== -1;

    const depChainString = eachRow.dep_chain || "";
    const depChainIncludes = depChainString.indexOf(value) !== -1;

    return (
      projectIncludes ||
      transitivePackageIncludes ||
      groupsIncludes ||
      depChainIncludes
    );
  });
};
