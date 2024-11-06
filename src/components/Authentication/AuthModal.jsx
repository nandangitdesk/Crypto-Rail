import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import GoogleButton from 'react-google-button';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase';
import { CryptoState } from '../../CryptoContext';
import { useState } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  fontFamily: 'Space Mono, monospace'
};

export default function AuthModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { setAlert } = CryptoState();


  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider).then(res=>{
        setAlert({
            open: true,
            message: `Sign Up Successful. Welcome ${res.user.email}`,
            type: 'success'
        })

        handleClose()
    }).catch(err=>{
        setAlert({
            open: true,
            message: err.message,
            type: 'error'
        });
        return;
    });
  }

  return (
    <div>
      <Button sx={{ fontFamily: 'Space Mono, monospace' , px:1, py:0.8 , color: 'black', backgroundColor: 'white', borderRadius: '5px', fontSize: '0.775rem'}}  onClick={handleOpen}>Login</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          
          <GoogleButton style={{width: '100%' , outline:"none"}} onClick={signInWithGoogle} />
        </Box>
      </Modal>
    </div>
  );
}
