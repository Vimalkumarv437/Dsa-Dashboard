import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { systemDesignTopics, levels } from '../data/systemDesignData';
import { useLocalStorage } from '../hooks/useLocalStorage';
import DesignCard from '../components/DesignCard';
import { Layers } from 'lucide-react';

/**
 * SystemDesign — lists all system design topics grouped by difficulty level
 */
export default function SystemDesign() {
  const [progress] = useLocalStorage('sd-progress', {});
  const [activeLevel, setActiveLevel] = useState('All');
  const navigate = useNavigate();

  const filteredTopics = activeLevel === 'All'
    ? systemDesignTopics
    : systemDesignTopics.filter(t => t.level === activeLevel);

  const completedCount = Object.values(progress).filter(s => s === 'Completed').length;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-xl">
              <Layers className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              System Design
            </h1>
          </div>
          <p className="text-gray-500 dark:text-gray-400">
            Master the architecture of large-scale distributed systems.
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm">
          ✅ {completedCount} / {systemDesignTopics.length} Completed
        </div>
      </div>

      {/* Level Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {['All', ...levels].map(level => (
          <button
            key={level}
            onClick={() => setActiveLevel(level)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-150 ${
              activeLevel === level
                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-blue-300'
            }`}
          >
            {level}
          </button>
        ))}
      </div>

      {/* Cards Grid grouped by level */}
      {(activeLevel === 'All' ? levels : [activeLevel]).map(level => {
        const topicsInLevel = filteredTopics.filter(t => t.level === level);
        if (topicsInLevel.length === 0) return null;
        return (
          <section key={level}>
            <h2 className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full inline-block ${
                level === 'Beginner' ? 'bg-green-500' : level === 'Intermediate' ? 'bg-blue-500' : 'bg-red-500'
              }`}></span>
              {level}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {topicsInLevel.map(topic => (
                <DesignCard
                  key={topic.id}
                  topic={topic}
                  progress={progress}
                  onClick={() => navigate(`/system-design/${topic.id}`)}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
