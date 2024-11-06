import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { FaArrowTrendUp, FaArrowTrendDown } from 'react-icons/fa6'
import { TrendingCoins } from '../config/api'
import { CryptoState } from '../CryptoContext'
import { Link } from 'react-router-dom'

const Marquee = () => {

    const [trending , setTrending] = useState([])
  
    const { currency , setCurrency , symbol } = CryptoState()
    const fetchTrendingCoins = async () => {
        try {
          const { data } = await axios.get(TrendingCoins(currency),{
            headers: {
              accept: 'application/json',
              'x-cg-demo-api-key': 'CG-pLYYuCasCyxzsRDsiZ2kMzs6', 
            }
          });
          console.log(data);
          
          setTrending(data); // Set the data to the trending state
        } catch (error) {
          console.error('Error fetching trending coins:', error);
        }
      };
    
      useEffect(() => {
        fetchTrendingCoins();
      }, [currency]);

      const profit = trending.map((coin) => coin.price_change_percentage_24h >= 0)
   

  return (
    <div className='bg-transparent h-36 overflow-hidden '>
        <motion.div
            animate={{ x: ['0%', '-30%'] }}
            transition={{ ease: 'linear', duration: 30, repeat: Infinity }}
            className='flex items-center gap-20'>
 
           {trending.map((coin) => (
              <Link to={`/coins/${coin.id}`} key={coin.id} className='flex flex-col items-center justify-center mx-4  w-24 '>
               <img src={coin?.image} alt={coin?.name} className='w-12 h-12 mb-2  grayscale filter hover:grayscale-0'/>
               <span className="text-white font-medium text-sm">{coin?.symbol}</span>
               <span className="text-xs text-gray-400">{profit && "+"}{coin?.price_change_percentage_24h?.toFixed(2)}%</span>
               <span className="mt-1">
                {coin.price_change_percentage_24h < 0 ?  (
                  <FaArrowTrendDown className="text-red-500" />
                ) : (
                  <FaArrowTrendUp className="text-green-500" />
                )}
              </span>
              </Link>
           ))}


        </motion.div>
    </div>
  )
}

export default Marquee