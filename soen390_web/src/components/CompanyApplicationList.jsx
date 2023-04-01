import React from "react";
import { Button, Icon, IconButton } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import "../styles/components/CompanyApplication.css";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from '@mui/icons-material/Info';

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "code", label: "Email", minWidth: 100 },
  {
    id: "population",
    label: "Time applied",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
];

function createData(name, code, population) {
  const density = population / 3;

  return { name, code, population };
}

const rows = [
  createData("Bogdan", "podaroiuBogdan1@gmail.com", "17/03/2023"),
  createData("Max", "CN", 1403500365),
  createData("Math", "IT", 60483973),
  createData("Ceds", "US", 327167434),
  createData("david", "CA", 37602103),
  createData("meg", "AU", 25475400),
  createData("Germany", "DE", 83019200),
];

export default function CompanyApplicationList(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { t } = useTranslation();
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="ApplicationContainer">
      <div className="ApplicationHeaderWrap">
        <div className="application">{t("Candidatures")} (3)</div>
        <div className="editButtonApplication">

        </div>
      </div>

      <div className="applicationList">
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow
                  data-testid="table-rows"
                >
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                        <IconButton>
                          <InfoIcon color="info" />

                        </IconButton>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            data-testid="rows-per-page-selector"
          />
        </Paper>
      </div>
    </div>
  );
}
