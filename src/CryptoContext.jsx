import { onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth, db } from './firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import axios from 'axios';
import { CoinList } from './config/api';

const Crypto = createContext();

const CryptoContext = ({children}) => {
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(false)
  const [currency, setCurrency] = useState('INR')
  const [symbol, setSymbol] = useState('₹')
  const [user , setUser] = useState(null);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });
  const [watchlist, setWatchlist] = useState([])

  useEffect(() => {
    if (user) {
      const coinRef = doc(db, 'watchlist', user.uid)
      var unsubscribe = onSnapshot(coinRef, (coin) => {
        if (coin.exists()) {
          setWatchlist(coin.data().coins)
        } else {
          console.log("No Items in Watchlist")
        }
      })
      return () => unsubscribe();
    }
    


  }, [user])



  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      }else {
        setUser(null)
      }
    })
  }, [])

  
  
  
  //whenever currency changes this is gonna run
  useEffect(() => {
    if (currency === 'INR') {
      setSymbol('₹')
    } else if (currency === 'USD') {
      setSymbol('$')
    }
  }, [currency])

  const fetchCoins = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(CoinList(currency), {
        headers: {
          accept: 'application/json',
          'x-cg-demo-api-key': 'CG-pLYYuCasCyxzsRDsiZ2kMzs6', 
        },
      });
      setCoins(data);
    } catch (error) {
      console.error("Error fetching coins:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Crypto.Provider value={{currency, setCurrency, symbol , user , alert, setAlert,watchlist , coins , loading , fetchCoins}}>
        {children}
    </Crypto.Provider>
  )
}

export default CryptoContext

export const CryptoState = () => {
  return useContext(Crypto)
}