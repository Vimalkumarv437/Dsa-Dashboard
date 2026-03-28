import { CalendarClock, ArrowRight } from 'lucide-react';

export default function MockInterviewAlert({ nextMockTask }) {
  if (!nextMockTask) return null;

  const daysUntil = (targetDateStr) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(targetDateStr);
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysLeft = daysUntil(nextMockTask.date);
  
  let alertStyle = "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/40 dark:border-blue-800 dark:text-blue-300";
  let iconStyle = "text-blue-600 dark:text-blue-400";
  
  if (daysLeft === 0) {
    alertStyle = "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/40 dark:border-red-800 dark:text-red-300";
    iconStyle = "text-red-600 dark:text-red-400";
  } else if (daysLeft <= 3) {
    alertStyle = "bg-orange-50 border-orange-200 text-orange-800 dark:bg-orange-900/40 dark:border-orange-800 dark:text-orange-300";
    iconStyle = "text-orange-600 dark:text-orange-400";
  }

  return (
    <div className={`rounded-xl border p-4 shadow-sm flex items-start sm:items-center justify-between flex-col sm:flex-row gap-4 transition-colors ${alertStyle}`}>
      <div className="flex items-center">
        <div className={`p-2 bg-white/60 dark:bg-gray-900/50 rounded-lg mr-4 backdrop-blur-sm shadow-sm`}>
          <CalendarClock className={`w-6 h-6 ${iconStyle}`} />
        </div>
        <div>
          <h4 className="font-bold text-[15px]">
            {daysLeft === 0 ? "Mock Interview Today!" : `Upcoming Mock Interview in ${daysLeft} ${daysLeft === 1 ? 'day' : 'days'}`}
          </h4>
          <p className="text-sm opacity-80 mt-0.5">
            Day {nextMockTask.day} • {nextMockTask.date} • {nextMockTask.problems}
          </p>
        </div>
      </div>
      <button className="flex items-center text-sm font-bold opacity-90 hover:opacity-100 bg-white/40 dark:bg-gray-900/40 px-4 py-2 rounded-lg transition-all hover:shadow-sm">
        Prepare Now <ArrowRight className="w-4 h-4 ml-1.5" />
      </button>
    </div>
  );
}
