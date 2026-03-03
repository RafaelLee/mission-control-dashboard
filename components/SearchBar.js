import { useState, useEffect } from 'react'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [showResults, setShowResults] = useState(false)

  // 🔥 Substitui mockData por busca REAL no MEMORY.md
  useEffect(() => {
    if (!query) {
      setResults([])
      return
    }

    const fetchMemory = async () => {
      try {
        const response = await fetch('/api/memory', {
          headers: {
            'X-Secret-Token': process.env.NEXT_PUBLIC_SECRET_TOKEN
          }
        })
        
        if (response.ok) {
          const { entries } = await response.json()
          const filtered = entries.filter(item =>
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.content.toLowerCase().includes(query.toLowerCase())
          )
          setResults(filtered)
          setShowResults(true)
        }
      } catch (error) {
        console.error('Search failed:', error)
      }
    }

    const delayDebounce = setTimeout(() => {
      fetchMemory()
    }, 500)

    return () => clearTimeout(delayDebounce)
  }, [query])

  const getCategoryColor = (category) => {
    // ... mesma lógica anterior
  }

  return (
    <div className="relative">
      {/* ... mesma estrutura anterior mas com busca REAL */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search your REAL memory..."
        className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800..."
      />
      
      {showResults && results.length > 0 && (
        <div className="p-2">Results will appear here</div>
      )}

      {showResults && results.length === 0 && query && (
        <div className="absolute z-10 w-full mt-2 bg-white dark:bg-openclaw-dark rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 max-h-96 overflow-y-auto">
          <div className="p-4 text-center">
            No results for "{query}" in your MEMORY.md
          </div>
        </div>
      )}
    </div>
  )
}