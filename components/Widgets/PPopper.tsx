import * as React from 'react';
import Box from "@mui/material/Box";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";

const PiggiesPopper = (props: any) => {
  const [open, setOpen] = React.useState<boolean>(props.open);
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  }
  const handleClose = () => {
      setOpen(false);
      setAnchorEl(null);
      if ( props.onClose ) props.onClose();
  };

  React.useEffect(() => {
		setOpen(props.open);
	}, [props.open])

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Box sx={{ position: 'relative' }}>
        <Box onClick={handleClick}>
          {props.anchorEl}
        </Box>
        <Popper
          open={open}
          anchorEl={anchorEl}
          placement={props.placement}
          sx={{
            zIndex: 10,
            
          }}
        >
          <Paper>
            {props.children}
          </Paper>
        </Popper>
      </Box>
      </ClickAwayListener>
  )
}

export default PiggiesPopper;