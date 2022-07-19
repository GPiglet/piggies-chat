import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const PiggiesSnackbar = (props: any) => {
	const [open, setOpen] = React.useState(props.open);

	React.useEffect(() => {
		setOpen(props.open);
	}, [props.open])

	const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
		if ( props.onClose ) props.onClose();
    setOpen(false);
  };

	return (
		<Snackbar key={props.message} open={open} autoHideDuration={3000} anchorOrigin={{vertical: 'top', horizontal: 'right'}} onClose={handleClose}>
				<MuiAlert onClose={handleClose} elevation={6} variant="filled" severity={props.severity||'warning'} sx={{ width: '100%' }}>
					{props.message}
				</MuiAlert>
		</Snackbar>
	);
}

export default PiggiesSnackbar;