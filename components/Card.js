export default function Card({ children, title, icon, className = '' }) {
  return (
    <div className={`bg-white dark:bg-openclaw-dark border border-gray-200 dark:border-gray-700 rounded-xl shadow-md overflow-hidden ${className}`}> 
      <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center">
        {icon && <span className="text-openclaw-primary mr-3 text-xl">{icon}</span>}
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">{title}</h3>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  )
}