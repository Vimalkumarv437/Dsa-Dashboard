import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { systemDesignById } from '../data/systemDesignData';
import { useLocalStorage } from '../hooks/useLocalStorage';
import ArchitectureBlock from '../components/ArchitectureBlock';
import VideoCard from '../components/VideoCard';
import { cn } from '../components/Sidebar';
import {
  ArrowLeft, CheckCircle2, BookOpen, Lightbulb,
  ThumbsUp, ThumbsDown, ListChecks, PlayCircle, Layers
} from 'lucide-react';

const statusOptions = ['Not Started', 'Learning', 'Completed'];
const statusStyles = {
  'Not Started': 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300',
  'Learning': 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400',
  'Completed': 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400',
};

/**
 * SystemDesignDetail — full topic page with explanation, design steps, architecture, and videos
 */
export default function SystemDesignDetail() {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const topic = systemDesignById[topicId];
  const [progress, setProgress] = useLocalStorage('sd-progress', {});
  const [, setLastOpened] = useLocalStorage('last-sd-topic', null);

  // Track last opened for "Continue Learning" on dashboard
  useEffect(() => {
    if (topic) {
      setLastOpened({ id: topic.id, title: topic.title, type: 'system-design' });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic?.id]);

  if (!topic) {
    return (
      <div className="max-w-3xl mx-auto py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Topic not found</h2>
        <button onClick={() => navigate('/system-design')} className="mt-4 text-blue-600 hover:underline">
          ← Back to System Design
        </button>
      </div>
    );
  }

  const currentStatus = progress[topic.id] || 'Not Started';
  const setStatus = (status) => setProgress({ ...progress, [topic.id]: status });
  const cycleStatus = () => {
    const idx = statusOptions.indexOf(currentStatus);
    setStatus(statusOptions[(idx + 1) % statusOptions.length]);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Back + Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={() => navigate('/system-design')}
          className="flex items-center text-sm text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to System Design
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

      {/* Title Header */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-6 sm:p-8 text-white shadow-lg">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
            <Layers className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-xs font-semibold bg-white/20 px-2.5 py-1 rounded-full uppercase tracking-wider">{topic.level}</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold mt-2">{topic.title}</h1>
            <p className="text-blue-100 mt-1 text-sm">{topic.description}</p>
          </div>
        </div>
      </div>

      {/* What is it & Why Important */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-3">
            <BookOpen className="w-4 h-4 text-blue-500" /> What is it?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{topic.explanation}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-3">
            <Lightbulb className="w-4 h-4 text-yellow-500" /> Why is it important?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{topic.whyImportant}</p>
        </div>
      </div>

      {/* Real-World Example */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-200 dark:border-blue-800/50 p-6">
        <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-2 text-sm uppercase tracking-wider">🌍 Real-World Example</h3>
        <p className="text-blue-900 dark:text-blue-200 text-sm leading-relaxed">{topic.realWorldExample}</p>
      </div>

      {/* Key Concepts */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
        <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
          <ListChecks className="w-4 h-4 text-purple-500" /> Key Concepts
        </h3>
        <ul className="space-y-2">
          {topic.keyConcepts.map((concept, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700 dark:text-gray-300">
              <span className="mt-1 w-5 h-5 flex-shrink-0 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-400 flex items-center justify-center text-xs font-bold">{i+1}</span>
              {concept}
            </li>
          ))}
        </ul>
      </div>

      {/* Architecture Block */}
      {topic.architectureBlocks && topic.architectureBlocks.length > 0 && (
        <ArchitectureBlock blocks={topic.architectureBlocks} />
      )}

      {/* Step-by-Step Design (Advanced topics) */}
      {topic.steps && topic.steps.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 dark:text-white mb-5">🏗️ Design Walkthrough</h3>
          <div className="space-y-4">
            {topic.steps.map((step) => (
              <div key={step.step} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white flex items-center justify-center font-bold text-sm">
                  {step.step}
                </div>
                <div className="flex-1 pb-4 border-b border-gray-100 dark:border-gray-700 last:border-0">
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">{step.title}</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{step.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pros & Cons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <h3 className="font-bold text-green-700 dark:text-green-400 flex items-center gap-2 mb-3">
            <ThumbsUp className="w-4 h-4" /> Pros
          </h3>
          <ul className="space-y-1.5">
            {topic.pros.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" /> {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <h3 className="font-bold text-red-600 dark:text-red-400 flex items-center gap-2 mb-3">
            <ThumbsDown className="w-4 h-4" /> Cons & Challenges
          </h3>
          <ul className="space-y-1.5">
            {topic.cons.map((c, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                <span className="text-red-500 mt-0.5 flex-shrink-0">✕</span> {c}
              </li>
            ))}
            {topic.scalingChallenges?.map((c, i) => (
              <li key={`sc-${i}`} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                <span className="text-orange-400 mt-0.5 flex-shrink-0">⚠</span> {c}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* When to Use */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl border border-yellow-200 dark:border-yellow-800/50 p-5">
        <h3 className="font-bold text-yellow-800 dark:text-yellow-300 text-sm uppercase tracking-wider mb-1">💡 When to Use</h3>
        <p className="text-yellow-900 dark:text-yellow-200 text-sm">{topic.whenToUse}</p>
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
