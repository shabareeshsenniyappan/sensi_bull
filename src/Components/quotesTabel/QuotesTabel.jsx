import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "../quotesTabel/tableQuotes.css";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function QuotesTable({ value, name }) {
  const [sortBy, setSortBy] = React.useState("");
  const [dataToShow, setDataToShow] = React.useState([]);
  if (value) {
    if (JSON.stringify(value) !== JSON.stringify(dataToShow)) {
      setDataToShow(value);
    }
  }
  const sortByDate = (arr, type) => {
    const sorter = (a, b) => {
      return new Date(a.time).getTime() - new Date(b.time).getTime();
    };
    arr.sort(sorter);
    if (type === "Descending") {
      arr.reverse();
    }
  };
  if (sortBy) {
    sortByDate(dataToShow, sortBy);
  }
  return (
    <div className={"table-container1"}>
      <div className="search-container">
        <div>List of Quotes - {name}</div>
        <div className={"search-section"}>
          <p className={"label"}>Sort By&nbsp;</p>
          <select
            placeholder={"Category"}
            onClick={(e) => {
              setSortBy(e?.target?.value || "");
            }}
          >
            <option value="" disabled selected>
              Sort By
            </option>
            <option value={"Ascending"}>Ascending</option>;
            <option value={"Descending"}>Descending</option>;
          </select>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Price</StyledTableCell>
              <StyledTableCell>Time</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataToShow?.map((row, index) => {
             
              return (
                <StyledTableRow key={index} className={"tabel-row-pointer"}>
                  <StyledTableCell>{row?.["price"]}</StyledTableCell>
                  <StyledTableCell>{row?.["time"]}</StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
