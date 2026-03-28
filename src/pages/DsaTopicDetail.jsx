import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { dsaTopicById } from '../data/dsaTopicsData';
import { useLocalStorage } from '../hooks/useLocalStorage';
import VideoCard from '../components/VideoCard';
import { cn } from '../components/Sidebar';
import {
  ArrowLeft, Code2, Zap, CheckCircle2, ExternalLink,
  Clock, HardDrive, BookOpen, PlayCircle
} from 'lucide-react';

const statusOptions = ['Not Started', 'Learning', 'Completed'];
const statusStyles = {
  'Not Started': 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300',
  'Learning': 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400',
  'Completed': 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400',
};
const difficultyGradient = {
  Easy: 'from-green-500 to-emerald-600',
  Medium: 'from-orange-500 to-amber-600',
  Hard: 'from-red-500 to-rose-700',
};

/**
 * DsaTopicDetail — full DSA topic page with Python code, complexity, and video tutorials
 */
export default function DsaTopicDetail() {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const topic = dsaTopicById[topicId];
  const [progress, setProgress] = useLocalStorage('dsa-topics-progress', {});
  const [, setLastOpened] = useLocalStorage('last-dsa-topic', null);
  const [copied, setCopied] = useState(false);

  // Track last opened topic for dashboard "Continue Learning"
  useEffect(() => {
    if (topic) {
      setLastOpened({ id: topic.id, title: topic.title, type: 'dsa' });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic?.id]);

  if (!topic) {
    return (
      <div className="max-w-3xl mx-auto py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Topic not found</h2>
        <button onClick={() => navigate('/dsa-topics')} className="mt-4 text-orange-600 hover:underline">
          ← Back to DSA Topics
        </button>
      </div>
    );
  }

  const currentStatus = progress[topic.id] || 'Not Started';
  const cycleStatus = () => {
    const idx = statusOptions.indexOf(currentStatus);
    setProgress({ ...progress, [topic.id]: statusOptions[(idx + 1) % statusOptions.length] });
  };

  const copyCode = () => {
    navigator.clipboard?.writeText(topic.codeExample);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Back + Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={() => navigate('/dsa-topics')}
          className="flex items-center text-sm text-gray-500 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to DSA Topics
        </button>
        <button
          onClick={cycleStatus}
          className={cn("px-4 py-2 rounded-xl text-sm font-semibold border-2 border-current transition-all", statusStyles[currentStatus])}
        >
          {currentStatus === 'Not Started' && '○ Not Started — click to start'}
          {currentStatus === 'Learning' && '⏳ Learning — click when done'}
          {currentStatus === 'Completed' && '✓ Completed — click to reset'}
        </button>
      </div>

      {/* Hero Header */}
      <div className={cn("bg-gradient-to-br rounded-2xl p-6 sm:p-8 text-white shadow-lg", difficultyGradient[topic.difficulty])}>
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
            <Code2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-xs font-semibold bg-white/20 px-2.5 py-1 rounded-full uppercase tracking-wider">{topic.difficulty} • {topic.category}</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold mt-2">{topic.title}</h1>
            <p className="text-white/80 mt-1 text-sm">{topic.description}</p>
          </div>
        </div>
      </div>

      {/* Complexity Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Best Case', value: topic.timeComplexity.best, icon: <Zap className="w-4 h-4 text-green-500" /> },
          { label: 'Average', value: topic.timeComplexity.average, icon: <Clock className="w-4 h-4 text-blue-500" /> },
          { label: 'Worst Case', value: topic.timeComplexity.worst, icon: <Clock className="w-4 h-4 text-red-500" /> },
          { label: 'Space', value: topic.spaceComplexity, icon: <HardDrive className="w-4 h-4 text-purple-500" /> },
        ].map(item => (
          <div key={item.label} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 text-center shadow-sm">
            <div className="flex justify-center mb-1">{item.icon}</div>
            <div className="font-mono font-bold text-gray-900 dark:text-white text-sm">{item.value}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.label}</div>
          </div>
        ))}
      </div>

      {/* Explanation */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
        <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-3">
          <BookOpen className="w-4 h-4 text-blue-500" /> Explanation
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{topic.explanation}</p>
      </div>

      {/* Key Concepts */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
        <h3 className="font-bold text-gray-900 dark:text-white mb-4">Key Concepts</h3>
        <ul className="space-y-2">
          {topic.keyConcepts.map((concept, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700 dark:text-gray-300">
              <span className="mt-1 w-5 h-5 flex-shrink-0 rounded-full bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-400 flex items-center justify-center text-xs font-bold">{i+1}</span>
              {concept}
            </li>
          ))}
        </ul>
      </div>

      {/* Python Code */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 bg-gray-900 dark:bg-gray-950 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-xs text-gray-400 font-mono ml-2">solution.py</span>
          </div>
          <button
            onClick={copyCode}
            className="text-xs text-gray-400 hover:text-white px-2 py-1 rounded bg-gray-800 hover:bg-gray-700 transition-colors"
          >
            Copy
          </button>
        </div>
        <pre className="p-5 overflow-x-auto text-sm leading-relaxed font-mono text-green-300 dark:text-green-300 bg-gray-900 dark:bg-gray-950 scrollbar-hide">
          <code>{topic.codeExample}</code>
        </pre>
      </div>

      {/* LeetCode Problems */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
        <h3 className="font-bold text-gray-900 dark:text-white mb-4">🏋️ Practice Problems</h3>
        <div className="space-y-2">
          {topic.leetcodeProblems.map((prob, i) => (
            <a
              key={i}
              href={prob.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-orange-50 dark:hover:bg-orange-900/20 border border-transparent hover:border-orange-200 dark:hover:border-orange-800 transition-all group"
            >
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-orange-400 transition-colors" />
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{prob.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", {
                  'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400': prob.difficulty === 'Easy',
                  'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400': prob.difficulty === 'Medium',
                  'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400': prob.difficulty === 'Hard',
                })}>
                  {prob.difficulty}
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Videos */}
      {topic.videos && topic.videos.length > 0 && (
        <div>
          <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
            <PlayCircle className="w-5 h-5 text-red-500" /> Video Tutorials
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topic.videos.map((v, i) => (
              <VideoCard key={i} video={v} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
