import React from "react";
import "../styles/components/Drawer.css";
import Button from "@mui/material/Button";
import { Popper } from "@mui/material";
import { Box } from "@mui/system";
import { Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { removeApplication } from "../api/ApplicationHistoryApi";
import { handleWithdrawApplication } from "../api/ApplicationHistoryApi";
import {modal} from "@mui/material";

function ActionButton({ userID, postingID }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [hoveredIndex, setHoveredIndex] = React.useState(-1);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(-1);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  React.useEffect(() => {
    const handleOutsideClick = (event) => {
      if (anchorEl && !anchorEl.contains(event.target)) {
        handleClose();
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [anchorEl]);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  const handleWithdraw = async () => {
    try {
      await handleWithdrawApplication(userID, postingID);
      handleClose();
      alert("Application withdrawn successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to withdraw application. Please try again.");
    }
  };
  
  return (
    <>
      <Button sx={{ fontSize: '30px' }} onClick={handleClick}>
        ...
      </Button>
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <Link to="/JobSearch" style={{ textDecoration: 'none' }}>
          <Paper sx={{ width: '220px', borderRadius: '10px', border: `1px solid ${hoveredIndex === 0 ? 'primary.main' : 'transparent'}`, bgcolor: hoveredIndex === 0 ? 'primary.light' : 'background.paper' }} onMouseEnter={() => handleMouseEnter(0)} onMouseLeave={handleMouseLeave}>
            <Box sx={{ p: 1, bgcolor: 'transparent' }}>
              <div style={{ fontSize: '20px', color: hoveredIndex === 0 ? 'white' : 'black' }}>View application</div>
            </Box>
          </Paper>
        </Link>
        <Paper sx={{ width: '220px', borderRadius: '10px', border: `1px solid ${hoveredIndex === 1 ? 'primary.main' : 'transparent'}`, bgcolor: hoveredIndex === 1 ? 'primary.light' : 'background.paper', cursor: 'pointer' }} onMouseEnter={() => handleMouseEnter(1)} onMouseLeave={handleMouseLeave} onClick={handleWithdraw}>
          <Box sx={{ p: 1, bgcolor: 'transparent' }}>
            <div style={{ fontSize: '20px', color: hoveredIndex === 1 ? 'white' : 'black' }}>Withdraw application</div>
          </Box>
        </Paper>
      </Popper>
    </>
  );
  
}

export default ActionButton;
