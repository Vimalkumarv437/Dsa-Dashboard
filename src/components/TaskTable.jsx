import { CheckCircle2, Circle } from 'lucide-react';
import { cn } from './Sidebar';

export default function TaskTable({ tasks, toggleTaskStatus }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
            <tr>
              <th className="px-6 py-4 font-medium">Day & Date</th>
              <th className="px-6 py-4 font-medium">Topic</th>
              <th className="px-6 py-4 font-medium">Focus Area</th>
              <th className="px-6 py-4 font-medium">Problems</th>
              <th className="px-6 py-4 font-medium">Company</th>
              <th className="px-6 py-4 font-medium text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {tasks.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                  No tasks found matching your filters.
                </td>
              </tr>
            ) : (
              tasks.map((task) => (
                <tr 
                  key={task.id} 
                  className={cn(
                    "hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors",
                    task.status === "Done" ? "bg-green-50/30 dark:bg-green-900/10" : "bg-white dark:bg-gray-800"
                  )}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-semibold text-gray-900 dark:text-white">Day {task.day}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{task.date}</div>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-200">
                    {task.topic}
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2.5 py-1 rounded-full text-xs font-medium border",
                      task.focusArea === 'Mock Interview' 
                        ? "bg-purple-100/50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800/50"
                        : task.focusArea === 'System Design'
                        ? "bg-blue-100/50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800/50"
                        : "bg-orange-100/50 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800/50"
                    )}>
                      {task.focusArea}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400 max-w-xs truncate" title={task.problems}>
                    {task.problems}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <span className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 mr-2"></span>
                      <span className="text-gray-700 dark:text-gray-300">{task.companyTag}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => toggleTaskStatus(task.id)}
                      className={cn(
                        "inline-flex items-center justify-center p-1 rounded-full transition-all duration-200",
                        task.status === "Done" 
                          ? "text-green-500 hover:text-green-600 hover:bg-green-100 dark:hover:bg-green-900/30" 
                          : "text-gray-300 hover:text-red-500 hover:bg-red-50 dark:text-gray-600 dark:hover:text-red-400 dark:hover:bg-red-900/30"
                      )}
                      title={task.status === "Done" ? "Mark as Pending" : "Mark as Done"}
                    >
                      {task.status === "Done" ? (
                        <CheckCircle2 className="w-7 h-7" />
                      ) : (
                        <Circle className="w-7 h-7" />
                      )}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
