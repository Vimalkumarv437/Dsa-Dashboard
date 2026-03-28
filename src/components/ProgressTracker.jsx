export default function ProgressTracker({ tasks }) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'Done').length;
  const percentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Your Progress</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {completedTasks} of {totalTasks} tasks completed
          </p>
        </div>
        <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">
          {percentage}%
        </div>
      </div>
      
      <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-3.5 mb-2 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-blue-500 to-purple-500 h-3.5 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <p className="text-xs font-medium text-gray-400 dark:text-gray-500 text-right mt-2">
        {100 - percentage}% remaining until you are interview ready!
      </p>
    </div>
  );
}
