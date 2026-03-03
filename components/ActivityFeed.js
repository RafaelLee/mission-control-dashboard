export default function ActivityFeed() {
  // Mock data - in production, fetch from /api/activity
  const activities = [
    { id: 1, time: '12:05', agent: 'Nova', action: 'Market scan completed', status: 'success' },
    { id: 2, time: '11:55', agent: 'Loki', action: 'Content draft saved', status: 'success' },
    { id: 3, time: '11:40', agent: 'Wong', action: 'MEMORY.md updated', status: 'info' },
    { id: 4, time: '11:30', agent: 'Quill', action: 'Social post scheduled', status: 'success' }
  ]

  const getStatusColor = (status) => {
    switch(status) {
      case 'success': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'error': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default: return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
    }
  }

  return (
    <div className="bg-white dark:bg-openclaw-dark rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <span className="w-2 h-2 bg-openclaw-primary rounded-full mr-2"></span>
        Activity Feed
      </h2>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="activity-item p-4 rounded-lg border border-gray-100 dark:border-gray-800 hover:shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(activity.status)}`}
                >
                  {activity.agent}
                </span>
                <p className="mt-1 font-medium">{activity.action}</p>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</span>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-4 w-full text-openclaw-primary hover:text-openclaw-primary/80 text-sm font-medium">
        View all activity
      </button>
    </div>
  )
}