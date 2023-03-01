import React from "react";
import "../styles/components/Drawer.css";
import Button from "@mui/material/Button";
import { Popper } from "@mui/material";
import { Box } from "@mui/system";
import { Paper } from '@mui/material';




function ActionButton() {
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

  return (
    <>
      <Button sx={{ fontSize: '30px' }} onClick={handleClick}>
        ...
      </Button>
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <Paper sx={{ width: '220px', borderRadius: '10px', border: `1px solid ${hoveredIndex === 0 ? 'primary.main' : 'transparent'}`, bgcolor: hoveredIndex === 0 ? 'primary.light' : 'background.paper' }} onMouseEnter={() => handleMouseEnter(0)} onMouseLeave={handleMouseLeave}>
          <Box sx={{ p: 1, bgcolor: 'transparent' }}>
            <div style={{ fontSize: '20px', color: hoveredIndex === 0 ? 'white' : 'black' }}>View application</div>
          </Box>
        </Paper>
        <Paper sx={{ width: '220px', borderRadius: '10px', border: `1px solid ${hoveredIndex === 1 ? 'primary.main' : 'transparent'}`, bgcolor: hoveredIndex === 1 ? 'primary.light' : 'background.paper' }} onMouseEnter={() => handleMouseEnter(1)} onMouseLeave={handleMouseLeave}>
          <Box sx={{ p: 1, bgcolor: 'transparent' }}>
            <div style={{ fontSize: '20px', color: hoveredIndex === 1 ? 'white' : 'black' }}>Withdraw application</div>
          </Box>
        </Paper>
      </Popper>
    </>
  );
}

export default ActionButton;
