import { useState, useEffect } from 'react'

export default function Home() {
const [darkMode, setDarkMode] = useState(false)

useEffect(() => {
// Verifica compatibilidade com SSR
if (typeof window === 'undefined') return

const darkQuery = window.matchMedia('(prefers-color-scheme: dark)')
setDarkMode(darkQuery.matches)

const handler = (e) => setDarkMode(e.matches)
darkQuery.addEventListener('change', handler)
return () => darkQuery.removeEventListener('change', handler)
}, [])

useEffect(() => {
if (typeof document !== 'undefined') {
document.documentElement.classList.toggle('dark', darkMode)
}
}, [darkMode])

return (
<div className="min-h-screen bg-openclaw-light text-openclaw-dark
dark:bg-openclaw-dark dark:text-openclaw-light transition-colors">
<div className="container mx-auto px-4 py-8">
<header className="flex justify-between items-center mb-12">
<h1 className="text-3xl font-bold flex items-center">
<span className="bg-openclaw-primary text-white rounded-lg px-2 py-1 mr-3">∎</span>
OpenClaw Mission Control
</h1>
</header>
<main>
<h2 className="text-2xl text-center py-12">✅ Dashboard funcionando!</h2>
</main>
</div>
</div>
)
}
