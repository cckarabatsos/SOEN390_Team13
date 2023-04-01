import React, { useState,useEffect } from "react";
import { Button, Icon, IconButton, Dialog, DialogContent, } from "@material-ui/core";
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
import { getApplicationWithId } from "../api/ApplicationApi";
import { getJobPostingWithId, removeJobPosting } from "../api/JobPostingApi";
import Application from "../models/Application.ts";
import CircularProgress from "@mui/material/CircularProgress";
import CompanyApplicationViewModal from "./companyApplicationViewModal";

const columns = [
  { id: "name", label: "Name", minWidth: 150 },
  { id: "position", label: "Position Applied", minWidth: 150 },
  {
    id: "status", label: "Status", minWidth: 100 
  },
  {
    id: "time",
    label: "Time applied",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  }
];

function createData(name, code, population) {
  const density = population / 3;

  return { name, code, population };
}
function timeout(delay) {
  return new Promise((res) => setTimeout(res, delay));
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



  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { t } = useTranslation();

  const[applicationsList,setApplicationList]=useState([])
  const [openPositions, setOpenPositions] = useState([]);
  const [loadingState, setLoadingState] = useState(true);
  const [disableFlag, setDisableFlag] = useState(false);
  const [viewApplication, setViewApplication]= useState({})
  const [appsModalOpen, setAppsModalOpen] = useState(false)
  
  
  const setTableValue=(application,columnId)=>{

    switch(columnId){
      case "name":
        return application.firstName + " " + application.lastName
        break;
      case "position":
        return application.positionName
      
      case "time":
        return application.timeApplied
      case "status":
        return application.status
    }
  }

  const delayLoad = async () => {
    await timeout(5000);
    setLoadingState(false);
  };

  useEffect(() => {
    if (props.openPositions) {
      getApplications();
    } else {
      delayLoad();
      setDisableFlag(false);
    }
  }, [props.openPositions]);


  const getApplications=async () => {
    //let aPosting= await getJobPostingWithId(postingId);


    let appList=[]
    for (let i = 0; i < props.openPositions["applied"].length; i++) {
      let applications= props.openPositions["applied"][i].split(",");
      let posting= await getJobPostingWithId(props.openPositions["postingids"][i])
     

      for(let j =0;j<applications.length;j++){
        let app = await getApplicationWithId(applications[j])
        
        if(app){
          appList.push(new Application(
            app.firstName,
            app.lastName,
            app.phone,
            app.address,
            app.address2,
            app.city,
            app.area,
            app.email,
            app.province,
            app.school,
            app.schoolCountry,
            app.achoolDegree,
            app.schoolMajor,
            app.schoolEnd,
            app.timestamp,
            app.postingID,
            app.coverLetter,
            app.attachResume,
            app.experience,
            app.applicationID,
            app.status,
            posting.position
          ))
        }

      }
    }
    setApplicationList(appList);
    setLoadingState(false);
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenAppModal = (
      anApplication
  ) => {
    setViewApplication(anApplication);
    setAppsModalOpen(true);
  };

  const handleCloseAppsModal = () => {
    setAppsModalOpen(false);
  };

  return (
    <div className="ApplicationContainer">
      <div className="ApplicationHeaderWrap">
        <div className="application">{t("Candidatures")} ({applicationsList.length})</div>
        <div className="editButtonApplication">

        </div>
      </div>

      <div className="applicationList">
      {loadingState && <CircularProgress color="info" />}

      {!loadingState &&
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
                  <b>{column.label}</b>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {applicationsList
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
                      const value = setTableValue(row,column.id)
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                    <IconButton>
                      <InfoIcon color="info" onClick={()=>{handleOpenAppModal(row)}} />

                    </IconButton>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        data-testid="rows-per-page-selector"
      />
    </Paper>
      }        
      </div>
      <Dialog open={appsModalOpen} onClose={handleCloseAppsModal}>
        <DialogContent>
          <CompanyApplicationViewModal viewApplication={viewApplication}></CompanyApplicationViewModal>
          <Button onClick={handleCloseAppsModal}>{t("CancelText")}</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
