import { ExternalLink, PlayCircle } from 'lucide-react';

/**
 * VideoCard — renders a YouTube embed with a title and external link
 */
export default function VideoCard({ video }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
      {/* Embed */}
      <div className="relative w-full" style={{ paddingBottom: '56.25%' /* 16:9 */ }}>
        <iframe
          className="absolute inset-0 w-full h-full"
          src={video.url}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
      {/* Footer */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <PlayCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
          <span className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">{video.title}</span>
        </div>
        <a
          href={video.url.replace('/embed/', '/watch?v=')}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 p-1 text-gray-400 hover:text-blue-500 transition-colors flex-shrink-0"
          title="Open on YouTube"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
