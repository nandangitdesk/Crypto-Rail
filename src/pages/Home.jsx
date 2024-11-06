import React from 'react'
import { motion } from 'framer-motion'
import { FaBitcoin, FaEthereum, FaLitecoinSign } from 'react-icons/fa6'
import Marquee from '../components/Marquee'
import CoinsTable from './CoinsTable'

export default function Home() {
  return (
    <div className="relative min-h-screen  bg-black text-white overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/30 to-black" />
      
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -left-4 top-20 h-24 w-24 rounded-full bg-white/5 blur-xl" />
        <div className="absolute right-10 top-40 h-32 w-32 rounded-full bg-white/5 blur-xl" />
        <div className="absolute left-1/3 bottom-20 h-40 w-40 rounded-full bg-white/5 blur-xl" />
      </div>

      {/* Main content */}
      <div className="relative">
        <div className="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center text-center"
          >
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-7xl lg:text-7xl ">
              Track Your Crypto Portfolio
              <span className="block bg-gradient-to-r from-white via-zinc-300 to-white bg-clip-text text-transparent">
                In Real Time
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-medium md:text-lg text-zinc-400">
              Monitor cryptocurrency prices, manage your portfolio, and track market trends with our advanced crypto tracking platform. Real-time updates and comprehensive analytics at your fingertips.
            </p>

            {/* Floating crypto icons */}
            <div className="relative mt-16 grid grid-cols-3 gap-8 sm:gap-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex flex-col items-center gap-2"
              >
                <div className="rounded-full bg-white/10 p-4">
                  <FaBitcoin className="h-8 w-8 text-white" />
                </div>
                <span className="text-sm font-medium text-zinc-400">Bitcoin</span>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex flex-col items-center gap-2"
              >
                <div className="rounded-full bg-white/10 p-4">
                  <FaEthereum className="h-8 w-8 text-white" />
                </div>
                <span className="text-sm font-medium text-zinc-400">Ethereum</span>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="flex flex-col items-center gap-2"
              >
                <div className="rounded-full bg-white/10 p-4">
                  <FaLitecoinSign className="h-8 w-8 text-white" />
                </div>
                <span className="text-sm font-medium text-zinc-400">Litecoin</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Space for marquee */}
        <div className=" w-full  " /> 
        
        {/* Marquee */}
        <Marquee />

        {/* coin table and search */}
        <CoinsTable/>
        
      </div>
    
    </div>
  )
}