import { onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from './firebase';

const Crypto = createContext();

const CryptoContext = ({children}) => {
  
  const [currency, setCurrency] = useState('INR')
  const [symbol, setSymbol] = useState('₹')
  const [user , setUser] = useState(null);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });

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

  return (
    <Crypto.Provider value={{currency, setCurrency, symbol , user , alert, setAlert}}>
        {children}
    </Crypto.Provider>
  )
}

export default CryptoContext

export const CryptoState = () => {
  return useContext(Crypto)
}