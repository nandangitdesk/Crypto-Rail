import React from 'react';
import { Snackbar } from '@mui/material';  // Snackbar component from MUI
import MuiAlert from '@mui/material/Alert';  // Alert component from MUI
import { CryptoState } from '../CryptoContext';  // Crypto context to manage the alert state
import { MdClose } from 'react-icons/md';  // Close icon from React Icons

const Alert = () => {
  const { alert, setAlert } = CryptoState();  // Fetching alert state and setAlert from context

  // Close the alert when triggered
  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlert({ open: false });  // Close the alert by updating state
  };

  const action = (
    <React.Fragment>
      <MdClose
        size={24}
        style={{ cursor: 'pointer', color: 'white' }}  // Styling the close icon
        onClick={handleCloseAlert}  // Close the alert when clicked
      />
    </React.Fragment>
  );

  return (
    <Snackbar
      open={alert.open}  // Display the snackbar if open is true
      autoHideDuration={3000}  // Automatically hide after 3 seconds
      onClose={handleCloseAlert}  // Handle closing
      action={action}  // Add the custom action (close icon)
    >
      <MuiAlert
        onClose={handleCloseAlert}
        elevation={6}
        variant="filled"
        severity={alert.type} 
        style={{ color: '#fff', backgroundColor: '#f44336' }} 
      >
        {alert.message}  // Show the message passed in the alert context
      </MuiAlert>
    </Snackbar>
  );
};

export default Alert;
