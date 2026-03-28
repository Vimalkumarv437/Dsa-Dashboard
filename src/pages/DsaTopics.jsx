import { useNavigate } from 'react-router-dom';
import { dsaTopics, dsaCategories } from '../data/dsaTopicsData';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useState } from 'react';
import { cn } from '../components/Sidebar';
import { Code2, ArrowRight, CheckCircle2 } from 'lucide-react';

const difficultyStyles = {
  Easy: "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800",
  Medium: "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800",
  Hard: "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800",
};

/**
 * DsaTopics — listing page for all DSA topic cards
 */
export default function DsaTopics() {
  const [progress] = useLocalStorage('dsa-topics-progress', {});
  const [activeCategory, setActiveCategory] = useState('All');
  const navigate = useNavigate();

  const filtered = activeCategory === 'All'
    ? dsaTopics
    : dsaTopics.filter(t => t.category === activeCategory);

  const completedCount = Object.values(progress).filter(s => s === 'Completed').length;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/40 rounded-xl">
              <Code2 className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">DSA Topics</h1>
          </div>
          <p className="text-gray-500 dark:text-gray-400">
            Master algorithms and data structures with Python examples.
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm">
          ✅ {completedCount} / {dsaTopics.length} Completed
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {['All', ...dsaCategories].map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-150",
              activeCategory === cat
                ? "bg-orange-500 text-white border-orange-500 shadow-sm"
                : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-orange-300"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Topic Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(topic => {
          const status = progress[topic.id] || 'Not Started';
          return (
            <button
              key={topic.id}
              onClick={() => navigate(`/dsa-topics/${topic.id}`)}
              className="group text-left bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm hover:shadow-md hover:border-orange-300 dark:hover:border-orange-600 transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-3">
                <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-full border", difficultyStyles[topic.difficulty])}>
                  {topic.difficulty}
                </span>
                {status === 'Completed' && (
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                )}
              </div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1.5 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                {topic.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">{topic.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-md">
                  {topic.category}
                </span>
                <span className="flex items-center text-sm font-semibold text-orange-600 dark:text-orange-400">
                  Study <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
