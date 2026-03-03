import { useState, useEffect } from 'react'

export default function MarketOverview() {
  const [marketData, setMarketData] = useState({ btc: null, eth: null })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Em produção, substitua por uma API real
        const mockData = {
          btc: {
            price: 66085.23,
            change: -4.15,
            volume: '$43.2B',
            support: 65000,
            resistance: 68000
          },
          eth: {
            price: 1916.42,
            change: -1.77,
            volume: '$18.7B'
          }
        }
        setMarketData(mockData)
        setLoading(false)
      } catch (error) {
        console.error('Market data error:', error)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 300000) // Atualiza a cada 5 minutos
    return () => clearInterval(interval)
  }, [])

  const formatChange = (change) => {
    return change > 0 ? `▲ ${change.toFixed(2)}%` : `▼ ${Math.abs(change).toFixed(2)}%`
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {['btc', 'eth'].map((crypto) => (
        <div 
          key={crypto}
          className={`p-4 rounded-lg border ${
            crypto === 'btc' 
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/10' 
              : 'border-purple-500 bg-purple-50 dark:bg-purple-900/10'
          }`}
        >
          <div className="flex justify-between items-start">
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400 uppercase">
                {crypto.toUpperCase()}/BRL
              </div>
              <div className="text-2xl font-bold mt-1">
                R$ {marketData[crypto]?.price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
              </div>
            </div>
            <div className={`text-sm font-medium px-2 py-1 rounded ${
              marketData[crypto]?.change >= 0
                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
            }`}
            >
              {loading ? '...' : formatChange(marketData[crypto]?.change)}
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Volume 24h</div>
              <div className="font-medium">{marketData[crypto]?.volume}</div>
            </div>
            {crypto === 'btc' && (
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Key Levels</div>
                <div className="flex items-center mt-1">
                  <span className="text-green-600 dark:text-green-400">▲ {marketData.btc?.resistance}</span>
                  <span className="mx-2">|</span>
                  <span className="text-red-600 dark:text-red-400">▼ {marketData.btc?.support}</span>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${
                crypto === 'btc' ? 'bg-blue-500' : 'bg-purple-500'
              }`}
              style={{ width: crypto === 'btc' ? '65%' : '45%' }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  )
}