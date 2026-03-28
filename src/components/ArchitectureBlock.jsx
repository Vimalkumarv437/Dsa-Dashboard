import { cn } from './Sidebar';

// Block type → visual style mapping
const blockStyles = {
  client:  "bg-blue-50 dark:bg-blue-900/30 border-blue-300 dark:border-blue-600 text-blue-800 dark:text-blue-300",
  cache:   "bg-orange-50 dark:bg-orange-900/30 border-orange-300 dark:border-orange-600 text-orange-800 dark:text-orange-300",
  service: "bg-purple-50 dark:bg-purple-900/30 border-purple-300 dark:border-purple-600 text-purple-800 dark:text-purple-300",
  db:      "bg-green-50 dark:bg-green-900/30 border-green-300 dark:border-green-600 text-green-800 dark:text-green-300",
  infra:   "bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200",
};

/**
 * ArchitectureBlock — renders a simplified architecture diagram using divs.
 * blocks: array of { label, type, connects }
 */
export default function ArchitectureBlock({ blocks }) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
      <h4 className="font-bold text-gray-900 dark:text-white mb-5 text-sm uppercase tracking-wider">
        Architecture Diagram
      </h4>
      <div className="overflow-x-auto">
        <div className="flex flex-wrap gap-3 items-center min-w-0">
          {blocks.map((block, idx) => (
            <div key={idx} className="flex items-center gap-3">
              {/* Block node */}
              <div className={cn(
                "px-4 py-3 rounded-xl border-2 text-sm font-semibold text-center min-w-[120px] shadow-sm",
                blockStyles[block.type] || blockStyles.infra
              )}>
                {block.label}
              </div>
              {/* Arrow to next block */}
              {idx < blocks.length - 1 && (
                <div className="text-gray-400 dark:text-gray-500 text-lg font-bold flex-shrink-0">→</div>
              )}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 mt-5 pt-4 border-t border-gray-200 dark:border-gray-700">
          {Object.entries(blockStyles).map(([type]) => (
            <div key={type} className="flex items-center gap-1.5">
              <div className={cn("w-3 h-3 rounded border-2", blockStyles[type])}></div>
              <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">{type}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
