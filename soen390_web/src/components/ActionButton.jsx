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
  const id = open ? "simple-popper" : undefined;

  return (
    <>
      <Button sx={{fontSize: "30px"}} onClick={handleClick}>...</Button>
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>
          View application
        </Box>
        <Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>
          Withdraw application
        </Box>
      </Popper>
    </>
  );
}

export default ActionButton;

