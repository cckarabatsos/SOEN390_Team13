import React from "react";
import "../styles/components/Drawer.css";
import Button from "@mui/material/Button";
import { Popper } from "@mui/material";
import { Box } from "@mui/system";





function ActionButton() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (
    <>
      <Button sx={{ fontSize: '30px' }} onClick={handleClick}>
        ...
      </Button>
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper', width: '200px', borderRadius: '10px' }}>
          <div style={{ fontSize: '20px' }}>View application</div>
        </Box>
        <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper', width: '200px', borderRadius: '10px' }}>
          <div style={{ fontSize: '20px' }}>Withdraw application</div>
        </Box>
      </Popper>
    </>
  );
}

export default ActionButton;
