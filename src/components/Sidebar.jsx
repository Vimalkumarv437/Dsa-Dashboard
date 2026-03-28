import { LayoutDashboard, TrendingUp, Calendar, Moon, Sun, X, Code2, Layers } from 'lucide-react';
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility for class merging
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function Sidebar({ isOpen, setIsOpen, activeTab, setActiveTab, darkMode, toggleDarkMode }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'interviews', label: 'Mock Interviews', icon: Calendar },
  ];

  const learningItems = [
    { id: 'dsa-topics', label: 'DSA Topics', icon: Code2 },
    { id: 'system-design', label: 'System Design', icon: Layers },
  ];

  const NavGroup = ({ items, label }) => (
    <div className="mb-2">
      <p className="px-4 mb-1 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">{label}</p>
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => {
              setActiveTab(item.id);
              setIsOpen(false);
            }}
            className={cn(
              "flex items-center w-full px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200",
              isActive
                ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/50"
            )}
          >
            <Icon className={cn("w-5 h-5 mr-3", isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-400")} />
            {item.label}
          </button>
        );
      })}
    </div>
  );

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:w-64",
          "bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-sm",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="overflow-y-auto flex-1">
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-100 dark:border-gray-700">
            <h1 className="text-xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              DSA Tracker
            </h1>
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden p-1 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="p-4 space-y-4">
            <NavGroup items={navItems} label="Main" />
            <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
              <NavGroup items={learningItems} label="Learning" />
            </div>
          </nav>
        </div>

        <div className="p-4 border-t border-gray-100 dark:border-gray-700 shrink-0">
          <button
            onClick={toggleDarkMode}
            className="flex items-center w-full px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 dark:text-gray-300"
          >
            {darkMode ? (
              <>
                <Sun className="w-5 h-5 mr-3 text-orange-400" />
                Light Mode
              </>
            ) : (
              <>
                <Moon className="w-5 h-5 mr-3 text-blue-600" />
                Dark Mode
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
