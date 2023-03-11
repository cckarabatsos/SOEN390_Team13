// import React, { useEffect, useState } from "react";
// import JobPostingComponent from "../components/JobPostingComponent";
// import "../styles/components/applicationHistory.css";


// /*function ApplicationHistory() {
//   return (
//     <div className="application-history">
//       <h1>My Applications </h1>
//       <JobPostingComponent

//         position={"software engineer"}
//         location={"mtl"}
//         company={"BRP"}
//         contract={"100 000$"}
//         jobPosterID={1}
//       />
      
//     </div>
//   );
// } */

//  /* function ApplicationHistory() {
//   const position = 'software engineer';
//   const company = 'BRP';
//   const location = 'mtl';
//   const contract = '100 000$';

//   return (
//     <div className="application-history-container">
//       <div className="application-history-list">
//         <div className="application-history-header">
//           <h1 className="application-history-title">My Applications</h1>
//           <h2 className="application-history-subtitle">Thank you for completing your applications</h2>
//         </div>
//         <JobPostingComponent
//           position={position}
//           company={company}
//           location={location}
//           contract={contract}
//           jobPosterID={1}
//         />
//       </div>
//     </div>
//   );
// } */




// function ApplicationHistory() {
//   const positions = ["Software Engineer", "Frontend Developer", "Backend Developer"];
//   const companies = ["BRP", "Google", "Microsoft"];
//   const locations = ["Montreal", "San Francisco", "Seattle"];
//   const contracts = ["$100,000", "$120,000", "$150,000"];

//   const [showOptions, setShowOptions] = useState(Array(positions.length).fill(false));

//   const handleOptionsClick = (index) => {
//     const newOptions = [...showOptions];
//     newOptions[index] = !newOptions[index];
//     setShowOptions(newOptions);
//   };

//   return (
   
//    /*
//    <div className="application-history-container">
//       <h1>My Applications</h1>
//       <h2>Thank you for applying to these positions</h2>
//       <div className="application-history-list">
//         <div className="column">
//           <h2 className="application-history-title">Position</h2>
//           {positions.map((position, index) => (
//             <p key={index}>{position}</p>
//           ))}
//         </div>
//         <div className="column">
//           <h2 className="application-history-title">Company</h2>
//           {companies.map((company, index) => (
//             <p key={index}>{company}</p>
//           ))}
//         </div>
//         <div className="column">
//           <h2 className="application-history-title">Location</h2>
//           {locations.map((location, index) => (
//             <p key={index}>{location}</p>
//           ))}
//         </div>
//         <div className="column">
//           <h2 className="application-history-title">Contract</h2>
//           {contracts.map((contract, index) => (
//             <p key={index}>{contract}</p>
//           ))}
//         </div>
//         <div className="column">
//           <h2 className="application-history-title">Action</h2>
//           {positions.map((_, index) => (
//             <div key={index} className="action-container">
//               <button onClick={() => handleOptionsClick(index)}>...</button>
//               {showOptions[index] && (
//                 <div className="options-container">
//                   <button>View Application</button>
//                   <button>Withdraw Application</button>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div> */
//   );
// }








// export default ApplicationHistory;

import React from "react";
import "../styles/components/Drawer.css";
import Button from "@mui/material/Button";
import { Popper } from "@mui/material";
import { Box } from "@mui/system";
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import ActionButton from '../components/ActionButton';
import { useEffect, useState } from "react";
import { getAllApplication } from "../api/ApplicationHistoryApi";


function createData(
  position ,
  location,
  company,
  contract,
  JobId,
) {
  return { position, location, company, contract,JobId };
}







export default function BasicTable() {
  /* const [userData, setUseData] = useState({});

const [currentID, setCurrentID] = useState(""); */
const [application, setApplication] = useState([]); 
var Application = []
const getApplications = async (ID) => {
  var responce = await getAllApplication(ID);
  console.log(responce[0]);

 // setApplication(responce);
 if (responce[0]) {setApplication(responce)}
 
};



 
useEffect(() => {
  const getApplications = async (ID) => {
    const response = await getAllApplication(ID);
    console.log(response[0]);
    if (response[0]) {
      setApplication(response);
    }
  };

  const data = JSON.parse(localStorage.getItem("isAuth"));
  if (data != null) {
    getApplications(data.userID);
  }
}, []); // empty dependency array to run only once





console.log(Application)
  return (
    <TableContainer component={Paper} sx={{ width: '65%', margin: '0 auto' }} >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontSize: '40px', fontWeight: 'bold', paddingBottom: '100px' }} colSpan={6}>
              My applications
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ fontSize: '20px', paddingBottom: '16px' }} align="left">Position</TableCell>
            <TableCell sx={{ fontSize: '20px', paddingBottom: '16px' }} align="left">Location&nbsp;</TableCell>
            <TableCell sx={{ fontSize: '20px', paddingBottom: '16px' }} align="left">Company&nbsp;</TableCell>
            <TableCell sx={{ fontSize: '20px', paddingBottom: '16px' }} align="left">Contract&nbsp;</TableCell>
            <TableCell sx={{ fontSize: '20px', paddingBottom: '16px' }} align="left">Action&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {application.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">{row.position}</TableCell>
              <TableCell align="left">{row.location}</TableCell>
              <TableCell align="left">{row.company}</TableCell>
              <TableCell align="left">{row.contract}</TableCell>
              <TableCell align="left"><ActionButton></ActionButton></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
