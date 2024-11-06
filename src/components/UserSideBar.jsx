import React from 'react';
import { Drawer, Avatar, Button } from '@mui/material';
import { CryptoState } from '../CryptoContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

export default function UserSideBar() {
  const [state, setState] = React.useState({
    right: false,
  });
  const { user } = CryptoState();

  // Toggle drawer state
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  // Logout function
  const logOut = () => {
    signOut(auth);
    setState({ right: false }); // Close the drawer
  };

  return (
    <div>
      <Avatar
       sx={{ backgroundColor: "white" ,color: "black" , borderRadius: "5px" , fontFamily: 'Space Mono, monospace' , px:1, py:0.8 , }}
        onClick={toggleDrawer("right", true)}
        className="h-10 w-10 ml-4 cursor-pointer" // Tailwind classes for Avatar
        src={user.photoURL}
        alt={user.displayName || user.email}
      />
      <Drawer
        anchor="right"
        open={state.right}
        onClose={toggleDrawer("right", false)}
      >
        <div className="bg-white text-white w-80 p-6 h-full flex flex-col font-mono">
          <div className="flex flex-col items-center gap-5 h-[92%]">
            <Avatar
            sx={{ backgroundColor: "black" ,color: "white" , height: "100px", width: "100px" , fontFamily: 'Space Mono, monospace'}}
              className="h-48 w-48 cursor-pointer  rounded-full" 
              src={user.photoURL } 
              alt={user.displayName || user.email}
            />
            <span className="text-2xl font-bold text-center word-wrap text-black break-words">
              {user.displayName || user.email}
            </span>
          </div>

          <Button
           sx={{ backgroundColor: "black" ,color: "white" , fontFamily: 'Space Mono, monospace' }}
            variant="contained"
            className=" mt-6 w-full"
            onClick={logOut}
          >
            Log Out
          </Button>
        </div>
      </Drawer>
    </div>
  );
}
