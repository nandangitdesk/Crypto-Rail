import React from 'react'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import CoinPage from './pages/CoinPage'

const App = () => {
  return (
    <div className='min-h-screen w-screen '>
      <Header/>

      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/coins/:id' element={<CoinPage/>} />
      </Routes>
    </div>
  )
}

export default App