import { cn } from './Sidebar';
import { ArrowRight, Cpu, Database } from 'lucide-react';

const levelColors = {
  Beginner: "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800/50",
  Intermediate: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800/50",
  Advanced: "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800/50",
};

const statusColors = {
  "Not Started": "text-gray-400 dark:text-gray-500",
  "Learning": "text-orange-500 dark:text-orange-400",
  "Completed": "text-green-500 dark:text-green-400",
};

/**
 * DesignCard — shows a single System Design topic card in the list view
 */
export default function DesignCard({ topic, progress, onClick }) {
  const status = progress?.[topic.id] || "Not Started";

  return (
    <button
      onClick={onClick}
      className="group relative w-full text-left bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200"
    >
      {/* Level badge */}
      <div className="flex items-start justify-between mb-3">
        <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-full border", levelColors[topic.level])}>
          {topic.level}
        </span>
        <span className={cn("text-xs font-medium capitalize", statusColors[status])}>
          {status === "Completed" ? "✓ Completed" : status === "Learning" ? "⏳ Learning" : "○ Not Started"}
        </span>
      </div>

      {/* Title & Description */}
      <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {topic.title}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">{topic.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {topic.tags.map(tag => (
          <span key={tag} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-md">
            {tag}
          </span>
        ))}
      </div>

      {/* CTA */}
      <div className="flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400">
        Study Now <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
      </div>
    </button>
  );
}
