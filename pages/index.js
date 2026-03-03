import { useState, useEffect } from 'react'
import ActivityFeed from '../components/ActivityFeed'
import TaskPipeline from '../components/TaskPipeline'
import SearchBar from '../components/SearchBar'
import MarketOverview from '../components/MarketOverview'
import Card from '../components/Card'

export default function Home() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const applyDarkMode = (isDark) => {
      document.documentElement.classList.toggle('dark', isDark)
      localStorage.setItem('darkMode', isDark)
    }

    // Check saved preference
    const savedMode = localStorage.getItem('darkMode') === 'true'
    setDarkMode(savedMode)
    applyDarkMode(savedMode)

    // Listen for system changes
    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e) => {
      if (localStorage.getItem('darkMode') === null) {
        applyDarkMode(e.matches)
        setDarkMode(e.matches)
      }
    }
    darkQuery.addEventListener('change', handler)
    return () => darkQuery.removeEventListener('change', handler)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-openclaw-dark text-gray-900 dark:text-gray-100 transition-colors">
      <div className="container mx-auto px-4 py-6">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
            <h1 className="text-2xl md:text-3xl font-bold flex items-center">
              <span className="bg-openclaw-primary text-white rounded-lg px-2 py-1 mr-2.5">∎</span>
              OpenClaw Mission Control
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                className="w-48 md:w-64 pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-openclaw-primary"
                placeholder="Search tasks..."
              />
              <svg className="absolute left-3 top-2.5 text-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
            
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600"></div>
                </div>
              ))}
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-3 space-y-6">
            <Card icon="📈" title="Market Overview">
              <MarketOverview /> 
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card icon="🔄" title="Task Pipeline" className="h-full">
                <TaskPipeline />
              </Card>
              
              <Card icon="⚙️" title="System Status" className="h-full">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Uptime</span>
                    <span className="font-bold text-green-600 dark:text-green-400">99.98%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '99.98%' }}></div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                      <div className="text-2xl font-bold text-openclaw-primary">5</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Agents</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                      <div className="text-2xl font-bold text-green-500">12</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Tasks</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-500">2</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Pending</div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Active Processes</h4>
                    {['Market Scanner', 'Content Scheduler', 'Memory Curation'].map((proc, i) => (
                      <div key={i} className="flex justify-between items-center py-1.5 border-b border-gray-100 dark:border-gray-800 last:border-0">
                        <span className="text-sm">{proc}</span>
                        <span className="text-xs px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                          Running
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <Card icon="🗒️" title="Quick Actions">
              <div className="grid grid-cols-2 gap-3">
                {['New Task', 'Market Scan', 'Memory Update', 'Task Report'].map((action) => (
                  <button
                    key={action}
                    className="py-2.5 text-sm font-medium rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </Card>

            <Card icon="🔔" title="Notifications">
              <div className="space-y-3">
                {[
                  { title: 'Market Alert', desc: 'BTC approaching resistance', time: '10m ago', type: 'warning' },
                  { title: 'Task Completed', desc: 'Content draft finished', time: '25m ago', type: 'success' },
                  { title: 'System Update', desc: 'Agent cluster optimized', time: '45m ago', type: 'info' }
                ].map((notif, i) => (
                  <div 
                    key={i}
                    className={`p-3 rounded-lg transition-all hover:scale-[1.02] cursor-pointer $
                      notif.type === 'warning' 
                        ? 'bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500' 
                        : notif.type === 'success'
                          ? 'bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500'
                          : 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500'
                    }`}
                  >
                    <div className="font-medium mb-1">{notif.title}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{notif.desc}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-500">{notif.time}</div>
                  </div>
                ))}
                <button className="w-full py-2 text-sm font-medium text-openclaw-primary hover:bg-openclaw-light/50 dark:hover:bg-openclaw-dark/50 rounded-lg transition-colors">
                  View all notifications
                </button>
              </div>
            </Card>

            <div className="hidden lg:block">
              <Card icon="📡" title="Office Status">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-sm">Main Office Online</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                    <span className="text-sm">Backup Server Syncing</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    <span className="text-sm">Security Check Required</span>
                  </div>

                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                      <span>Storage Usage</span>
                      <span>65.4/100 GB</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '65.4%' }}></div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>

        <SearchBar />

        <footer className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-500 dark:text-gray-400">
          <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-4">
            <span>OpenClaw Mission Control v1.2.3</span>
            <span>•</span>
            <span>Last update: {new Date().toLocaleTimeString()}</span>
            <span>•</span>
            <a href="#" className="hover:text-openclaw-primary transition-colors">System Logs</a>
            <span>•</span>
            <a href="#" className="hover:text-openclaw-primary transition-colors">Documentation</a>
          </div>
        </footer>
      </div>
    </div>
  )
}