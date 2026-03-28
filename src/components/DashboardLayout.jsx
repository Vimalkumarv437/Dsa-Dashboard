import { Menu, Bell } from 'lucide-react';
import Sidebar from './Sidebar';
import { cn } from './Sidebar';

export default function DashboardLayout({
  children,
  isOpen,
  setIsOpen,
  activeTab,
  setActiveTab,
  darkMode,
  toggleDarkMode,
  streak,
}) {
  return (
    <div className={cn("flex h-screen overflow-hidden font-sans transition-colors duration-200", darkMode ? "dark bg-gray-900" : "bg-gray-50")}>
      <Sidebar 
        isOpen={isOpen} 
        setIsOpen={setIsOpen} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
      
      <div className="flex-1 flex flex-col relative overflow-hidden">
        {/* Header Header */}
        <header className="flex-shrink-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-16 flex items-center justify-between px-4 sm:px-6 shadow-sm">
          <div className="flex items-center flex-1">
            <button
              onClick={() => setIsOpen(true)}
              className="lg:hidden p-2 -ml-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-md dark:hover:bg-gray-700"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden lg:flex flex-col ml-4 lg:ml-0">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {activeTab === 'dashboard' ? 'Overview'
                  : activeTab === 'progress' ? 'Your Progress'
                  : activeTab === 'interviews' ? 'Mock Interviews'
                  : activeTab === 'dsa-topics' ? 'DSA Topics'
                  : activeTab === 'system-design' ? 'System Design'
                  : 'Overview'}
              </h2>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-3 py-1.5 rounded-full text-sm font-semibold border border-orange-200 dark:border-orange-800/50">
              🔥 {streak} Day Streak
            </div>
            
            <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-700 dark:hover:text-blue-400 rounded-full transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-800"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 text-white flex items-center justify-center font-bold text-sm shadow-md">
              V
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto w-full p-4 sm:p-6 lg:p-8 custom-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
}
