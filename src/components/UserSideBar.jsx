import React from 'react';
import { Drawer, Avatar, Button } from '@mui/material';
import { CryptoState } from '../CryptoContext';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import { MdDelete } from 'react-icons/md';
import { doc, setDoc } from 'firebase/firestore';

export default function UserSideBar() {
  const [state, setState] = React.useState({
    right: false,
  });
  const { user , setAlert , watchlist , coins , symbol } = CryptoState();

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
    signOut(auth)
      .then(() => {
        setAlert({
          open: true,
          type: "success",
          message: "Logout successful!",
        });
      })
      .catch((error) => {
        setAlert({
          open: true,
          type: "error",
          message: `Logout failed: ${error.message}`,
        });
      });
  
    setState({ right: false });  // Close the drawer after logout
  };
  
  const formatNumber = (num) => {
    return num.toLocaleString(undefined, { maximumFractionDigits: 2 })
  }
  
  //for delete coin from watchlist 
  const removeFromWatchList = async (coin) => {
    const coinRef = doc(db,"watchlist",user.uid);
  
    try {
      await setDoc(coinRef, 
        { coins:watchlist?.filter((watch) => watch !== coin?.id)},
        { merge: true },
      );
  
      setAlert({
        open: true,
        message: `${coin.name} removed from watchlist`,
        type: 'success',
      });
  
    }catch(error) {
      setAlert({
        open: true,
        message: error.message,
        type: 'error',
      });
    }
  }

  return (
    <div>
      <Avatar
       sx={{ backgroundColor: "white" ,color: "black" , borderRadius: "5px" , fontFamily: 'Space Mono, monospace'  , }}
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
              className=" cursor-pointer  rounded-full" 
              src={user.photoURL } 
              alt={user.displayName || user.email}
            />
            <span className="text-2xl font-bold text-center word-wrap text-black break-words">
              👋{user.displayName || user.email}
            </span>

            <span className='text-zinc-600 text-2xl font-semibold mt-2 '>
                💰Watchlist
            </span>
            {coins.map((coin) => {
                if (watchlist.includes(coin.id)) {
                  return <div key={coin.id} className='text-medium flex items-center justify-between gap-5 border border-zinc-700 hover:shadow-lg px-3 py-2 rounded-lg'>
                    <span className='text-black'>{coin?.name}</span>
                    <span className='ml-2 text-zinc-600'>{coin?.symbol} {formatNumber(coin?.current_price)}</span>
                    <MdDelete className='text-black text-lg cursor-pointer ' onClick={() => removeFromWatchList(coin)}/>
                    
                  </div>;
                }
            })}
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
