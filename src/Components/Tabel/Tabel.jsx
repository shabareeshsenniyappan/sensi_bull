import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "../Tabel/table.css";
import { instrumentCall } from "../../service";
import Papa from "papaparse";
import { useNavigate } from "react-router-dom";

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

export default function CustomizedTables({ value }) {
  let navigate = useNavigate();
  const [tabelBody, setTabelBody] = React.useState([]);
  const [searchData, setSearchData] = React.useState("");
  const [tabelBodyToShow, setTabelBodyToShow] = React.useState([]);

  React.useEffect(() => {
    instrumentCall().then((instruments) => {
      if (instruments) {
        Papa.parse(instruments, {
          header: true,
          complete: function (results) {
            setTabelBody(results?.data);
          },
        });
      }
    });
  }, []);

  if (searchData) {
    console.log(searchData);
    let temp = tabelBody?.filter((ins, index) => {
      return (
        ins?.Symbol?.toLowerCase()?.includes(searchData?.toLowerCase()) ||
        ins?.Name?.toLowerCase()?.includes(searchData?.toLowerCase())
      );
    });
    console.log(temp, "hello");
    if (JSON.stringify(tabelBodyToShow) !== JSON.stringify(temp)) {
      setTabelBodyToShow(temp);
    }
  } else {
    if (JSON.stringify(tabelBody) !== JSON.stringify(tabelBodyToShow)) {
      setTabelBodyToShow(tabelBody);
    }
  }

  return (
    <div className={"table-container"}>
      <div className="search-container">
        <div>List of Stocks</div>
        <div className={"search-section"}>
          <p className={"label"}>Search&nbsp;</p>
          <input
            type={"text"}
            className={"input-section"}
            onChange={(e) => {
              setSearchData(e?.target?.value);
            }}
          />
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Symbol</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Sector</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tabelBodyToShow.map((row, index) => {
              return (
                <StyledTableRow
                  key={index}
                  className={"tabel-row-pointer"}
                  onClick={() => {
                    navigate(`/quotes/${row?.Symbol}`);
                  }}
                >
                  <StyledTableCell>{row?.["Symbol"]}</StyledTableCell>
                  <StyledTableCell>{row?.["Name"]}</StyledTableCell>
                  <StyledTableCell>{row?.["Sector"]}</StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
