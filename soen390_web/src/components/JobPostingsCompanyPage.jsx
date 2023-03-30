import React,{useState} from "react";
import "../styles/components/JobPostingComponent.css";
import { Button } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import DatePicker from "react-datepicker";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Slider from "@mui/material/Slider";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import "react-datepicker/dist/react-datepicker.css";
import { CreateJobPostingApi } from "../api/JobPostingApi";

function valuetext(value) {
  return `${value} years`;
}

function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  
export default function AddressForm(props) {
  const [documents, setDocuments] = React.useState([]);
  const { t } = useTranslation();
  const handleChange = (event) => {
    setDocuments(event.target.value);
  };
  const [date, setDate] = React.useState(new Date());

  const handleCalendarClose = () => console.log("Calendar closed");
  const handleCalendarOpen = () => console.log("Calendar opened");

  const [location, setLocation] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");
  const [description, setDescription] = useState("");
  const [company, setCompany] = useState(props.companyName);
  const [contract, setContract] = useState(false);
  const [environment, setEnvironment] = useState(false);
  const [duration, setDuration] = useState("0 years");
  const [type, setType] = useState("");
  const [alertType, setAlertType] = useState("error")
  const [open, setOpen] = React.useState(false);

  

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
    //console.log(e.target.value);
  };
  const handlePositionChange = (e) => {
    setPosition(e.target.value);
    //console.log(e.target.value);
  };
  const handleSalaryChange = (e) => {
    setSalary(e.target.value);
//console.log(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    //console.log(e.target.value);
  };
  const handleContractChange = (e) => {
    setContract(!contract);
    console.log(contract);
  };
  const handleEnvironmentChange = (e) => {
    setEnvironment(e.target.value);
    console.log(e.target.value);
  };
  const handleDurationChange = (e) => {
    setDuration(valuetext(e.target.value));
  };
 
  const handleTypeChange = (e) => {
    setType(e.target.value);
   // console.log(e.target.value);
  };

  const handlePostJobOnClick = async () => {
    let response=false
    let formatedDate= date.toISOString().substring(0,date.toISOString().indexOf("T"))
    
    if(contract){
        console.log("HJAHAHHAHAHAHAHAHHAHAHAHAH")
        setDescription("none")
    }
    console.log(props.companyEmail+"\n "+location+"\n "+position+" \n"+salary+"\n "+props.companyName+ " \n"+description+" \n"+environment+"\n "+contract+" \n"+duration+"\n "+type+"\n "+formatedDate)
    if(props.companyEmail&&location!=""&&position!=""&&salary!=""&&props.companyName &&description!=""&&type!=""&&formatedDate!="") {
        response = await CreateJobPostingApi(props.companyEmail,location,position,salary,props.companyName,description,environment,contract,duration,type,formatedDate)
    }


    //let response = await CreateJobPostingApi(props.companyEmail,location,position,salary,props.companyName,description,environment,contract,duration,type,formatedDate)
    
    if(response){

        setAlertType("success")
        setOpen(true)
        await timeout(1000)
        props.setUpdateFlag(!props.updateFlag)
    }
    else{
        setAlertType("error")
        setOpen(true)
    }

    props.closeDialog()

  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <React.Fragment>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertType} sx={{ width: '100%' }}>
          This is a {alertType} message!
        </Alert>
      </Snackbar>
      <Typography variant="h6" gutterBottom>
        Create Job Posting
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="JobTitle"
            name="JobTitle"
            label="Job Title"
            fullWidth
            autoComplete="Job-Title"
            variant="standard"
            value={position}
            onChange={handlePositionChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="Location"
            name="Location"
            label="Location"
            fullWidth
            autoComplete="location-name"
            variant="standard"
            value={location}
            onChange={handleLocationChange}
          />
        </Grid>
        <Grid item xs={12}>
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            onCalendarClose={handleCalendarClose}
            onCalendarOpen={handleCalendarOpen}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1"> {t("ReqDoc")}:</Typography>
          <Select
            multiple
            value={documents}
            onChange={handleChange}
            inputProps={{ name: "documents", id: "documents" }}
          >
            <MenuItem value="CV">CV</MenuItem>
            <MenuItem value="Cover Letter"> {t("CoverLetterText")}</MenuItem>
            <MenuItem value="Unofficial Transcript">
              Unofficial Transcript
            </MenuItem>
          </Select>
          {documents.length > 0 && (
            <Typography variant="subtitle1">
              {t("SelDoc")}: {documents.join(", ")}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="Salary"
            name="Salary"
            label="Salary"
            fullWidth
            autoComplete="req-educ"
            variant="standard"
            value={salary}
            onChange={handleSalaryChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="Type"
            name="Type"
            label="Type"
            fullWidth
            autoComplete="req-educ"
            variant="standard"
            value={type}
            onChange={handleTypeChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            style={{ textAlign: "left" }}
            hintText="Message Field"
            floatingLabelText="MultiLine and FloatingLabel"
            multiline
            rows={4}
            required
            id="Description"
            name="Description"
            label="Position Description"
            fullWidth
            autoComplete="req-educ"
            variant="standard"
            value={description}
            onChange={handleDescriptionChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h7">
            <b>Contract Status</b>
          </Typography>
          <RadioGroup
            required
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            onChange={handleContractChange}
            defaultValue={false}
          >
            <FormControlLabel
              value={false}
              control={<Radio />}
              label="Contract"
            />
            <FormControlLabel
              value={true}
              control={<Radio />}
              label="Permanent"
            />
          </RadioGroup>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h7">
            <b>Duration (years)</b>
          </Typography>
          <Slider
          disabled={contract}
            aria-label="Temperature"
            defaultValue={0}
            getAriaValueText={valuetext}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={0}
            max={10}
            onChange={handleDurationChange}  
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h7">
            <b>Work Environment</b>
          </Typography>
          <RadioGroup
            required
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            onChange={handleEnvironmentChange}
          >
            <FormControlLabel
              value={false}
              control={<Radio />}
              label="In person"
            />
            
            <FormControlLabel
              value={true}
              control={<Radio />}
              label="Remote"
            />
          </RadioGroup>
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            style={{ backgroundColor: "#9575cd", float: "right" }}
            onClick={handlePostJobOnClick}
          >
            Create Job Posting
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
