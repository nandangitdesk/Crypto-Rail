import React, { useState } from 'react'
import { FaBitcoin, FaChevronDown, FaBars, FaTimes } from 'react-icons/fa'
import { CryptoState } from '../CryptoContext'

export default function Header() {
  
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const {currency,setCurrency} = CryptoState()

  

  return (
    <header className="sticky top-0 z-50 w-full bg-black border-b border-gray-800 lg:px-36">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <a href="/" className="flex items-center gap-2">
            <FaBitcoin className="h-8 w-8 text-zinc-100" />
            <span className="md:text-xl text-lg font-bold text-white">
              <span className="block md:hidden">C-RAIL</span>
              <span className="hidden md:block">CRYPTORAIL</span>
            </span>
          </a>
        </div>

       

        <div className="flex items-center gap-4">
          <div className="relative">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="h-9 w-[60px] md:w-[70px] appearance-none rounded-md border border-zinc-700 bg-zinc-900 px-2 md:px-3 py-1 text-xs md:text-sm text-white shadow-sm transition-colors hover:border-zinc-100-600 focus:outline-none focus:ring-2 focus:ring-zinc-500"
            >
              <option  value="USD">USD</option>
              <option value="INR">INR</option>
            </select>
            <FaChevronDown className="absolute right-2 top-2.5 h-4 w-4 text-gray-400" />
          </div>
          <button className="rounded-md bg-white md:px-4 md:py-2 px-2 py-2 text-xs md:text-sm font-medium text-black hover:bg-zinc-200 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-black">
            Sign In
          </button>
          <button 
            className="md:hidden rounded-md p-2 text-white hover:bg-zinc-800 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes className="h-5 w-5" /> : <FaBars className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-yellow-500 hover:bg-gray-900">Home</a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-yellow-500 hover:bg-gray-900">Features</a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-yellow-500 hover:bg-gray-900">Pricing</a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-yellow-500 hover:bg-gray-900">About</a>
          </div>
        </div>
      )}
    </header>
  )
}