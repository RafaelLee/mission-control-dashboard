import { useState, useEffect } from 'react'

export default function MarketOverview() {
  const [marketData, setMarketData] = useState({
    btc: null,
    gcj26: null,
    mnq: null
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Dados mockados para os 3 ativos solicitados
        const mockData = {
          btc: {
            price: 66085.23,
            change: -4.15,
            volume: '$43.2B',
            support: 65000,
            resistance: 68000
          },
          gcj26: {
            price: 2342.80,
            change: 0.38,
            volume: '7.2k contracts',
            support: 2335.0,
            resistance: 2355.0
          },
          mnq: {
            price: 20452.50,
            change: 0.12,
            volume: '18.5k contracts'
          }
        }
        setMarketData(mockData)
        setLoading(false)
      } catch (error) {
        console.error('Market data error:', error)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 300000)
    return () => clearInterval(interval)
  }, [])

  const formatChange = (change) => {
    return change > 0 
      ? <span className="text-green-600 dark:text-green-400">▲ {change.toFixed(2)}%</span>
      : <span className="text-red-600 dark:text-red-600">▼ {Math.abs(change).toFixed(2)}%</span>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[{ id: 'btc', name: 'BTC/USD', symbol: '₿' },
        { id: 'gcj26', name: 'GCJ26:XCEC (Gold)', symbol: '🌕' },
        { id: 'mnq', name: 'MNQ:XCME (Nasdaq)', symbol: '📈' }].map((asset) => (
        <div 
          key={asset.id}
          className={`p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 hover:shadow-md transition-all\n            ${asset.id === 'btc' ? 'hover:border-blue-500' :
              asset.id === 'gcj26' ? 'hover:border-yellow-500' : 'hover:border-purple-500'}
          `}
        >
          <div className="flex justify-between items-start">
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400 uppercase">
                {asset.name}
              </div>
              <div className="text-2xl font-bold mt-1 flex items-center">
                <span className="mr-2 text-3xl">{asset.symbol}</span>
                ${marketData[asset.id]?.price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="text-sm font-medium px-2 py-1 rounded-full mb-2\n                ${marketData[asset.id]?.change >= 0
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                  : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'}
              ">
                {loading ? '...' : formatChange(marketData[asset.id]?.change)}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                24h Volume
              </div>
              <div className="font-medium text-sm mt-1">
                {marketData[asset.id]?.volume}
              </div>
            </div>
          </div>

          {asset.id === 'gcj26' && (
            <div className="mt-4">
              <div className="text-xs text-gray-500 dark:text-gray-400 uppercase">
                Key Levels
              </div>
              <div className="flex items-center mt-1">
                <span className="text-green-600 dark:text-green-400 font-medium">▲ {marketData.gcj26?.resistance}</span>
                <span className="mx-2 text-gray-400 dark:text-gray-500">|</span>
                <span className="text-red-600 dark:text-red-400 font-medium">▼ {marketData.gcj26?.support}</span>
              </div>
            </div>
          )}

          <div className="mt-4">
            <div className="text-xs text-gray-500 dark:text-gray-400 uppercase mb-1">
              Price Action
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${
                  asset.id === 'btc' ? 'bg-blue-500' :
                  asset.id === 'gcj26' ? 'bg-yellow-500' : 'bg-purple-500'
                }`}
                style={{ 
                  width: `${Math.min(100, Math.abs(marketData[asset.id]?.change || 0) * 15)}%` 
                }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}