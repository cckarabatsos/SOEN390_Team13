import React, { useState } from "react";
import "../styles/components/Drawer.css"
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { DialogContentText } from "@mui/material";
import {
    IconButton
  } from "@material-ui/core";
import AddIcon from '@mui/icons-material/Add';
import { Select, MenuItem } from '@material-ui/core';

const years = Array.from({length: 51}, (_, i) => 1980 + i);

function AddEducationDialog() {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    
    const [selectedYear, setSelectedYear] = useState(null);
    return(
        <>
            <IconButton onClick={handleClickOpen}>
                <AddIcon className="add-icon" />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    Add an Experience
                </DialogTitle>
                <DialogContentText style={{marginLeft:"5%"}}>
                    Name of Position
                </DialogContentText>
                <DialogContent>
                    <TextField
                    autoFocus
                    className="inputRounded"
                    margin="dense"
                    label="Name of School or University"
                    type="university"
                    variant="outlined"
                    size="small"
                    />
                </DialogContent>
                <DialogContentText style={{marginLeft:"5%"}}>
                    Company
                </DialogContentText>
                <DialogContent>
                    <TextField
                    autoFocus
                    className="inputRounded"
                    margin="dense"
                    label="Program of Study"
                    type="program"
                    variant="outlined"
                    size="small"
                    />
                </DialogContent>
                <DialogContentText style={{marginLeft:"5%"}}>
                    Location
                </DialogContentText>
                <DialogContent>
                    <TextField
                    autoFocus
                    className="inputRounded"
                    margin="dense"
                    label="Location"
                    type="location"
                    variant="outlined"
                    size="small"
                    />
                </DialogContent>
                <DialogContentText style={{marginLeft:"5%"}}>
                    Start date
                </DialogContentText>
                <DialogContent>
                <Select value={1}>
                <MenuItem value={1}>January</MenuItem>
                <MenuItem value={2}>February</MenuItem>
                <MenuItem value={3}>March</MenuItem>
                <MenuItem value={4}>April</MenuItem>
                <MenuItem value={5}>May</MenuItem>
                <MenuItem value={6}>June</MenuItem>
                <MenuItem value={7}>July</MenuItem>
                <MenuItem value={8}>August</MenuItem>
                <MenuItem value={9}>September</MenuItem>
                <MenuItem value={10}>October</MenuItem>
                <MenuItem value={11}>November</MenuItem>
                <MenuItem value={12}>December</MenuItem>
                </Select>
                <Select style={{marginLeft:"10px"}} value={2023} onChange={(e) => setSelectedYear(e.target.value)}>
                {years.map((year) => (
                    <MenuItem key={year} value={year}>{year}</MenuItem>
                ))}
                </Select>
                </DialogContent>
                <DialogContentText style={{marginLeft:"5%"}}>
                    End Date
                </DialogContentText>
                <DialogContent>
                <Select value={1}>
                <MenuItem value={1}>January</MenuItem>
                <MenuItem value={2}>February</MenuItem>
                <MenuItem value={3}>March</MenuItem>
                <MenuItem value={4}>April</MenuItem>
                <MenuItem value={5}>May</MenuItem>
                <MenuItem value={6}>June</MenuItem>
                <MenuItem value={7}>July</MenuItem>
                <MenuItem value={8}>August</MenuItem>
                <MenuItem value={9}>September</MenuItem>
                <MenuItem value={10}>October</MenuItem>
                <MenuItem value={11}>November</MenuItem>
                <MenuItem value={12}>December</MenuItem>
                </Select>
                <Select style={{marginLeft:"10px"}} value={2023} onChange={(e) => setSelectedYear(e.target.value)}>
                {years.map((year) => (
                    <MenuItem key={year} value={year}>{year}</MenuItem>
                ))}
                </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Save and Apply</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AddEducationDialog;