import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { CoinList } from '../config/api'
import { CryptoState } from '../CryptoContext'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  TablePagination,
  CircularProgress
} from '@mui/material'
import { FaCaretUp, FaCaretDown, FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const CoinsTable = () => {
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [search, setSearch] = useState('')

  const { currency, symbol } = CryptoState()

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

  useEffect(() => {
    fetchCoins()
  }, [currency])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const formatNumber = (num) => {
    return num.toLocaleString(undefined, { maximumFractionDigits: 2 })
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress style={{ color: 'white' }} />
      </div>
    )
  }

  return (
    <div className="w-full mt-20 px-4 sm:px-6 lg:px-8 ">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 text-center">
        Cryptocurrency Prices by Market Cap
      </h2>
      <div className="mb-6 relative">
        <input
          type="text"
          placeholder="Search for a cryptocurrency..."
          value={search}
          onChange={handleSearch}
          className="w-full px-4 py-4 bg-zinc-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-700 pl-10"
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" />
      </div>
      <div className="overflow-x-auto  rounded-lg shadow">
        <TableContainer sx={{ fontFamily: 'Space Mono, monospace'}}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ bgcolor:'white' , color: 'black', fontWeight: 'bold', fontFamily: 'Space Mono, monospace' }}>Coin</TableCell>
                <TableCell  sx={{  bgcolor:'white' , color: 'black', fontWeight: 'bold', fontFamily: 'Space Mono, monospace' }} align="right">Price</TableCell>
                <TableCell  sx={{  bgcolor:'white' , color: 'black', fontWeight: 'bold', fontFamily: 'Space Mono, monospace' }} align="right">24h Change</TableCell>
                <TableCell  sx={{  bgcolor:'white' , color: 'black', fontWeight: 'bold', fontFamily: 'Space Mono, monospace' }} align="right">Market Cap</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCoins
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((coin) => (
                  <TableRow 
                    key={coin.id}
                    component={Link}
                    to={`/coins/${coin.id}`} 
                    style={{ textDecoration: 'none', fontFamily: 'Space Mono, monospace' }}
                    className="hover:bg-zinc-900 transition-colors duration-200 "
                  >
                    <TableCell sx={{ color: 'white', fontFamily: 'Space Mono, monospace' }}>
                      <div className="flex items-center">
                        <img
                          src={coin.image}
                          alt={coin.name}
                          className="w-8 h-8 mr-2 filter grayscale hover:filter-none"
                        />
                        <div>
                          <div className="font-bold">{coin.symbol.toUpperCase()}</div>
                          <div className="text-sm text-gray-400">{coin.name}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell sx={{ color: 'white', fontFamily: 'Space Mono, monospace' }} align="right">
                      {symbol}{formatNumber(coin.current_price)}
                    </TableCell>
                    <TableCell 
                      sx={{ color: coin.price_change_percentage_24h > 0 ? 'green' : 'red', fontFamily: 'Space Mono, monospace' }}
                      align="right"
                    >
                      {coin.price_change_percentage_24h > 0 ? (
                        <FaCaretUp className="inline mr-1" />
                      ) : (
                        <FaCaretDown className="inline mr-1" />
                      )}
                      {formatNumber(coin.price_change_percentage_24h)}%
                    </TableCell>
                    <TableCell  sx={{ color: 'white', fontFamily: 'Space Mono, monospace' }} align="right">
                      {symbol}{formatNumber(coin.market_cap)}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={coins.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ color: 'white' }}
        />
      </div>
    </div>
  )
}

export default CoinsTable
