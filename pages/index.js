import { useState, useEffect } from 'react'
import ActivityFeed from '../components/ActivityFeed'
import TaskPipeline from '../components/TaskPipeline'
import SearchBar from '../components/SearchBar'

export default function Home() {
const [darkMode, setDarkMode] = useState(false)

useEffect(() => {
const darkQuery = window.matchMedia('(prefers-color-scheme: dark)')
setDarkMode(darkQuery.matches)
const handler = (e) => setDarkMode(e.matches)
darkQuery.addEventListener('change', handler)
return () => darkQuery.removeEventListener('change', handler)
}, [])

useEffect(() => {
document.documentElement.classList.toggle('dark', darkMode)
}, [darkMode])

return (
<div className={`min-h-screen bg-openclaw-light text-openclaw-dark
dark:bg-openclaw-dark dark:text-openclaw-light transition-colors`}>
<div className="container mx-auto px-4 py-8">
<header className="flex justify-between items-center mb-12">
<h1 className="text-3xl font-bold flex items-center">
<span className="bg-openclaw-primary text-white rounded-lg px-2 py-1 mr-3">∎</span>
OpenClaw Mission Control
</h1>
<button
onClick={() => setDarkMode(!darkMode)}
className="p-2 rounded-full hover:bg-openclaw-light dark:hover:bg-openclaw-dark/30"
>
{darkMode ? '☀️' : '🌙'}
</button>
</header>

<SearchBar />

<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
<div className="lg:col-span-2">
<TaskPipeline />
</div>
<div>
<ActivityFeed />
</div>
</div>
</div>
</div>
)
}
