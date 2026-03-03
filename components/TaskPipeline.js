import { useEffect, useState } from 'react'

export default function TaskPipeline() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    // In production: fetch('/api/tasks').then(res => res.json())
    const mockTasks = [
      {
        id: 1,
        agent: 'Nova',
        task: 'Market scan',
        schedule: 'Every 10min (:00)',
        lastRun: '12:00',
        status: 'running'
      },
      {
        id: 2,
        agent: 'Loki',
        task: 'Content drafting',
        schedule: 'Every 15min (:00,:15,:30,:45)',
        lastRun: '11:45',
        status: 'completed'
      },
      {
        id: 3,
        agent: 'Wong',
        task: 'Memory curation',
        schedule: 'Every 30min (:00,:30)',
        lastRun: '11:30',
        status: 'pending'
      }
    ]
    setTasks(mockTasks)
  }, [])

  const getStatusBadge = (status) => {
    switch(status) {
      case 'running': 
        return <span className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 px-2 py-1 rounded-full text-xs">▶️ Running</span>
      case 'completed': 
        return <span className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 px-2 py-1 rounded-full text-xs">✅ Completed</span>
      default: 
        return <span className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 px-2 py-1 rounded-full text-xs">🕒 Pending</span>
    }
  }

  return (
    <div className="bg-white dark:bg-openclaw-dark rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold flex items-center">
          <span className="w-2 h-2 bg-openclaw-primary rounded-full mr-2"></span>
          Task Pipeline
        </h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">Last updated: 12:05</span>
      </div>

      <div className="space-y-3">
        {tasks.map(task => (
          <div key={task.id} className="p-4 rounded-lg border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center">
                  <span className="font-medium mr-2">{task.agent}</span>
                  {getStatusBadge(task.status)}
                </div>
                <p className="mt-1 font-medium text-gray-900 dark:text-gray-100">{task.task}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {task.schedule} • Last run: {task.lastRun}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="text-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <div className="text-2xl font-bold text-openclaw-primary">5</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Active</div>
        </div>
        <div className="text-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <div className="text-2xl font-bold text-green-500">12</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
        </div>
        <div className="text-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <div className="text-2xl font-bold text-yellow-500">2</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Pending</div>
        </div>
      </div>
    </div>
  )
}