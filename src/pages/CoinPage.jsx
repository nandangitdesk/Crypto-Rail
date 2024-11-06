import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SingleCoin } from '../config/api';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import { CryptoState } from '../CryptoContext';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import { Typography } from '@mui/material';
import CoinInfo from '../components/CoinInfo';

const CoinPage = () => {
 
  const {id} = useParams()
  const [coin, setCoin] = useState();
  const [loading, setLoading] = useState(true)
  const {currency, symbol} = CryptoState();

  const fetchCoin = async () => {
    setLoading(true)
      try {
        const { data } = await axios.get(SingleCoin(id),{
          headers: {
            accept: 'application/json',
            'x-cg-demo-api-key': 'CG-pLYYuCasCyxzsRDsiZ2kMzs6', 
          },
        })
        setCoin(data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching coin data:', error)
        setLoading(false)
      }
  }

  
  useEffect(() => {
    fetchCoin();
  }, [id]);

  const formatNumber = (num) => {
    return num.toLocaleString(undefined, { maximumFractionDigits: 2 })
  }
  

  // Retrieve description text and check if it exists
const descriptionText = coin?.description?.en;
let displayedDescription = '';

if (descriptionText) {
  const splitDescription = descriptionText.split('. ');

  // Check if the second sentence is valid and does not contain HTML or only minimal content
  if (splitDescription[1] && !splitDescription[1].includes('<') && splitDescription[1].length > 10) {
    displayedDescription = splitDescription[1];
  } else {
    // Fall back to the first sentence if the second is not ideal
    displayedDescription = splitDescription[0];
  }
} else {
  displayedDescription = "Description not available"; // Fallback text if description is missing
}
  


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress style={{ color: 'white' }} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white  p-4 md:p-8 ">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row mt-10">
        {/* Sidebar */}
        <div className="lg:w-1/3 lg:pr-8 mb-8 lg:mb-0">
          <div className="flex flex-col items-center lg:items-start">
            <img
              src={coin?.image?.large}
              alt={coin?.name}
              className="w-32 h-32 mb-4"
            />
            <Typography sx={{ fontFamily: 'Space Mono, monospace'}} variant="h3" className="font-bold mb-4 text-center lg:text-left">
              {coin?.name}
            </Typography>
            <Typography sx={{ fontFamily: 'Space Mono, monospace'}} variant="body1" className="text-zinc-300 mb-6 text-justify">
            {displayedDescription}.
            </Typography>
            <div className="w-full space-y-4 mt-10">
              <div className="flex justify-between items-center">
                <Typography sx={{ fontFamily: 'Space Mono, monospace'}} variant="h6" className="font-bold">Rank:</Typography>
                <Typography sx={{ fontFamily: 'Space Mono, monospace'}} variant="h6">{coin?.market_cap_rank}</Typography>
              </div>
              <div className="flex justify-between items-center">
                <Typography sx={{ fontFamily: 'Space Mono, monospace'}} variant="h6" className="font-bold">Current Price:</Typography>
                <Typography sx={{ fontFamily: 'Space Mono, monospace'}} variant="h6">
                  {symbol} {formatNumber(coin?.market_data.current_price[currency.toLowerCase()])}
                </Typography>
              </div>
              <div className="flex justify-between items-center">
                <Typography sx={{ fontFamily: 'Space Mono, monospace'}} variant="h6" className="font-bold">Market Cap:</Typography>
                <Typography sx={{ fontFamily: 'Space Mono, monospace'}} variant="h6">
                  {symbol} {formatNumber(coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0, -6))}M
                </Typography>
              </div>
              <div className="flex justify-between items-center">
                <Typography sx={{ fontFamily: 'Space Mono, monospace'}} variant="h6" className="font-bold">24h Change:</Typography>
                <Typography 
                  sx={{ fontFamily: 'Space Mono, monospace'}}
                  variant="h6" 
                  className={coin.market_data.price_change_percentage_24h > 0 ? "text-green-500" : "text-red-500"}
                >
                  {coin?.market_data.price_change_percentage_24h > 0 ? (
                    <FaCaretUp className="inline mr-1" />
                  ) : (
                    <FaCaretDown className="inline mr-1" />
                  )}
                  {formatNumber(coin.market_data.price_change_percentage_24h)}%
                </Typography>
              </div>
            </div>
          </div>
        </div>
        
        {/* Space for CoinInfo component */}
        <div className="lg:w-2/3">
          {/* CoinInfo component will be placed here */}
          <CoinInfo coin={coin} />
        </div>
      </div>
    </div>
  
  )
}

export default CoinPage