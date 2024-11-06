import React, { useEffect, useState, useRef } from 'react'
import { CryptoState } from '../CryptoContext'
import axios from 'axios'
import { HistoricalChart } from '../config/api'
import { CircularProgress } from '@mui/material'
import Chart from 'chart.js/auto'

const CoinInfo = ({ coin }) => {
  const [historicalData, setHistoricalData] = useState([])
  const [days, setDays] = useState(1)
  const [loading, setLoading] = useState(true)
  const { currency } = CryptoState()
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  const timeButtons = [
    { label: '24H', value: 1 },
    { label: '7D', value: 7 },
    { label: '30D', value: 30 },
    { label: '3M', value: 90 },
    { label: '1Y', value: 365 },
  ]

  const fetchHistoricalData = async () => {
    setLoading(true);
  try {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency), {
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': 'CG-pLYYuCasCyxzsRDsiZ2kMzs6', 
      },
    });
    setHistoricalData(data.prices);
  } catch (error) {
    console.error("Error fetching historical data:", error);
  } finally {
    setLoading(false);
  }
  }

  useEffect(() => {
    fetchHistoricalData()
  }, [days, currency])

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    if (historicalData.length > 0 && chartRef.current) {
      const ctx = chartRef.current.getContext('2d')
      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: historicalData.map((coin) => {
            let date = new Date(coin[0])
            let time =
              date.getHours() > 12
                ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                : `${date.getHours()}:${date.getMinutes()} AM`
            return days === 1 ? time : date.toLocaleDateString()
          }),
          datasets: [
            {
              data: historicalData.map((coin) => coin[1]),
              label: `Price (Past ${days} Days) in ${currency}`,
              borderColor: '#ffffff',
            },
          ],
        },
        options: {
          elements: {
            point: {
              radius: 1,
            },
          },
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              grid: {
                display: false,
              },
              ticks: {
                color: 'white',
              },
            },
            y: {
              grid: {
                color: 'rgba(255, 255, 255, 0.1)',
              },
              ticks: {
                color: 'white',
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      })
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [historicalData, days, currency])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <CircularProgress style={{ color: 'white' }} size={250} thickness={1} />
      </div>
    )
  }

  return (
    <div className="w-full h-full bg-transparent md:p-10 border border-zinc-800">
      <div className=" bg-transparent rounded-lg shadow-lg p-4 h-[400px] mb-4">
        <canvas ref={chartRef} />
      </div>
      <div className="flex justify-center space-x-2 md:space-x-4">
        {timeButtons.map((btn) => (
          <button
            key={btn.value}
            onClick={() => setDays(btn.value)}
            className={`px-3 py-1 md:px-4 md:py-2 rounded-full text-sm md:text-base transition-colors duration-200 ${
              days === btn.value
                ? 'bg-white text-black'
                : 'bg-zinc-800 text-white hover:bg-zinc-700'
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default CoinInfo