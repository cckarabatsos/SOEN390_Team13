import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  Grid,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import "../styles/components/CompanyJobPostings.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import Delete from "@mui/icons-material/Delete";
import Divider from "@mui/material/Divider";
import AddressForm from "../components/JobPostingsCompanyPage";
import JobsOverview from "../models/JobsOverview.ts";
import { getJobPostingWithId, removeJobPosting } from "../api/JobPostingApi";
import CircularProgress from "@mui/material/CircularProgress";
import JobPosingViewModal from "./CompanyJobPostingsViewModal";

const fireBaseTime = (seconds, nanoseconds) =>
  new Date(seconds * 1000 + nanoseconds / 1000000);

function timeout(delay) {
  return new Promise((res) => setTimeout(res, delay));
}

export default function CompanyJobPostings(props) {
  const [open, setOpen] = useState(false);
  const [jobsModalOpen, setJobsModalOpen] = useState(false);

  const { t } = useTranslation();
  const [openPositions, setOpenPositions] = useState([]);
  const [loadingState, setLoadingState] = useState(true);

  const [viewPosition, setViewPosition] = useState("");
  const [viewCompany, setViewCompany] = useState("");
  const [viewDesc, setViewDesc] = useState("");
  const [viewLocation, setViewLocation] = useState("");
  const [viewSalary, setViewSalary] = useState("");
  const [viewEmail, setViewEmail] = useState("");
  const [viewDeadline, setViewDeadline] = useState("");
  const [viewResume, setViewResume] = useState("");
  const [viewCover, setViewCover] = useState("");
  const [viewProvenenace, setViewProvenance] = useState("Internal");
  const [disableFlag, setDisableFlag] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenJobModal = (
    position,
    company,
    desc,
    location,
    salary,
    email,
    deadline,
    cover,
    resume,
    provenance
  ) => {
    setViewCompany(company);
    setViewPosition(position);
    setViewDesc(desc);
    setViewEmail(email);
    setViewLocation(location);
    setViewSalary(salary);
    setViewDeadline(deadline);
    setViewCover(cover);
    setViewResume(resume);
    setJobsModalOpen(true);
    setViewProvenance(provenance)
  };

  const handleCloseJobModal = () => {
    setJobsModalOpen(false);
  };

  var positionsArray = [];
  const getPosting = async () => {
    //let aPosting= await getJobPostingWithId(postingId);
    for (let i = 0; i < props.openPositions["postingids"].length; i++) {
      let aPosting = await getJobPostingWithId(
        props.openPositions["postingids"][i]
      );

      if (aPosting) {
        console.log(aPosting)
        positionsArray.push(
          
          new JobsOverview(
            aPosting.position,
            aPosting.location,
            aPosting.company,
            aPosting.contract,
            aPosting.jobPosterID,
            aPosting.postingID,
            aPosting.postingID,
            aPosting.salary,
            aPosting.description,
            aPosting.email,
            aPosting.mandataryResume,
            aPosting.madatoryCoverLetter,
            fireBaseTime(
              aPosting.postingDeadline._seconds,
              aPosting.postingDeadline._nanoseconds
            ).toString(),
            aPosting.provenance
          )
        );
      }
    }
    setOpenPositions(positionsArray);
    setLoadingState(false);
    setDisableFlag(false);
  };

  const handleRemoveJobPosting = async (postingId) => {
    setDisableFlag(true);
    if (window.confirm("Are you sure you want to remove this Job Posting?")) {
      var response = await removeJobPosting(props.companyEmail, postingId);
      if (response) {
        props.setUpdateFlag(!props.updateFlag);
      }
    } else {
      setDisableFlag(false);
    }
  };

  const delayLoad = async () => {
    await timeout(5000);
    setLoadingState(false);
  };

  useEffect(() => {
    if (props.openPositions) {
      getPosting();
    } else {
      delayLoad();
      setDisableFlag(false);
    }
  }, [props.openPositions]);

  return (
    <div className="JobsContainer">
      <div className="JobHeaderWrap">
        <div className="postings">{t("OpenPositions")}</div>
        <div className="editButtonJobs" data-testid="add-button">
        {props.companyOwner&&
        <Button onClick={handleClickOpen}>
          <PlaylistAddIcon />
        </Button>
        }
        </div>
        
      </div>
      <div className="postingsText">
        {loadingState && <CircularProgress color="info" />}

        {!loadingState && (
          <>
            <List sx={{ width: "100%", bgcolor: "background.paper" }}>
              {openPositions.map((position) => (
                <div>
                  <ListItem
                    key={position.id}
                    secondaryAction={
                      <>
                        <IconButton
                          aria-label="comment"
                          color="info"
                          onClick={() =>
                            handleOpenJobModal(
                              position.position,
                              position.company,
                              position.description,
                              position.location,
                              position.salary,
                              position.email,
                              position.postingDeadline,
                              position.mandatoryCoverLetter,
                              position.mandataryResume,
                              position.provenance
                            )
                          }
                        >
                          <InfoIcon />
                        </IconButton>

                        {props.companyOwner &&
                        <IconButton
                        aria-label="comment"
                        color="error"
                        onClick={() =>
                          handleRemoveJobPosting(position.postingID)
                        }
                        disabled={disableFlag}
                      >
                        <Delete />
                      </IconButton>

                        }
                        
                      </>
                    }
                  >
                    <ListItemText  disableTypography primary={<Typography variant="h5" >{position.position}</Typography>} />
                  </ListItem>
                  <Divider variant="middle" />
                </div>
              ))}
            </List>
            {openPositions.length == 0 && (
              <h2>
                Currently, this company does not have any open positions
                available.
              </h2>
            )}
          </>
        )}
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <AddressForm
            setUpdateFlag={props.setUpdateFlag}
            updateFlag={props.updateFlag}
            companyName={props.companyName}
            companyEmail={props.companyEmail}
            closeDialog={handleClose}
          />
          <Button onClick={handleClose}>{t("CancelText")}</Button>
        </DialogContent>
      </Dialog>

      <Dialog open={jobsModalOpen} onClose={handleCloseJobModal}>
        <DialogContent>
          <JobPosingViewModal
            viewPosition={viewPosition}
            viewCompany={viewCompany}
            viewLocation={viewLocation}
            viewEmail={viewEmail}
            viewSalary={viewSalary}
            viewDesc={viewDesc}
            viewPostingDeadline={viewDeadline}
            viewMandatoryResume={viewResume}
            viewMandatoryCoverLetter={viewCover}
            viewPostingProvenance={viewProvenenace}
          />
          <Button onClick={handleCloseJobModal}>{t("CancelText")}</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
