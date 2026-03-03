import { useState, useEffect } from 'react'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [showResults, setShowResults] = useState(false)

  // Mock memory data - in production, this would come from MEMORY.md
  const memoryData = [
    {
      id: 1,
      title: 'BTC Market Analysis',
      content: 'BTC at $66,085, down 4% weekly. Key levels: support $65k, resistance $68k',
      category: 'trading',
      date: '2026-02-23'
    },
    {
      id: 2,
      title: 'Content Strategy Meeting',
      content: 'Discussed quarterly content calendar with focus on educational videos',
      category: 'content',
      date: '2026-02-22'
    },
    {
      id: 3,
      title: 'System Setup Notes',
      content: 'Completed Mission Control setup with 6 agents: Jarvis (lead), Loki, Quill, Nova, Friday, Wong',
      category: 'system',
      date: '2026-02-21'
    }
  ]

  useEffect(() => {
    if (!query) {
      setResults([])
      return
    }

    const timeoutId = setTimeout(() => {
      const filtered = memoryData.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.content.toLowerCase().includes(query.toLowerCase())
      )
      setResults(filtered)
      setShowResults(true)
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [query])

  const getCategoryColor = (category) => {
    const colors = {
      trading: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      content: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      system: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
    }
    return colors[category] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
  }

  return (
    <div className="relative">
      <div className="flex items-center">
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search your memory..."
            className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-openclaw-primary"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {showResults && results.length > 0 && (
        <div className="absolute z-10 w-full mt-2 bg-white dark:bg-openclaw-dark rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 max-h-96 overflow-y-auto">
          <div className="p-3 text-sm text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800">
            Found {results.length} result{results.length === 1 ? '' : 's'}
          </div>
          <div className="py-1">
            {results.map((result) => (
              <div
                key={result.id}
                className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                      {result.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                      {result.content}
                    </p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(result.category)}`}
                  >
                    {result.category}
                  </span>
                </div>
                <div className="mt-2 text-xs text-gray-400 dark:text-gray-500">
                  {result.date}
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-gray-100 dark:border-gray-800">
            <button className="w-full text-openclaw-primary hover:text-openclaw-primary/80 text-sm font-medium">
              View all results
            </button>
          </div>
        </div>
      )}

      {showResults && results.length === 0 && query && (
        <div className="absolute z-10 w-full mt-2 bg-white dark:bg-openclaw-dark rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="p-4 text-center text-gray-500 dark:text-gray-400">
            No results found for "{query}"
          </div>
        </div>
      )}
    </div>
  )
}