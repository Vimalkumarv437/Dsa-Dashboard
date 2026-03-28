import { useState, useMemo, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useLocalStorage } from './hooks/useLocalStorage';
import { generateTasks } from './data/dummyData';
import DashboardLayout from './components/DashboardLayout';
import ProgressTracker from './components/ProgressTracker';
import Filters from './components/Filters';
import TaskTable from './components/TaskTable';
import MockInterviewAlert from './components/MockInterviewAlert';
import SystemDesign from './pages/SystemDesign';
import SystemDesignDetail from './pages/SystemDesignDetail';
import DsaTopics from './pages/DsaTopics';
import DsaTopicDetail from './pages/DsaTopicDetail';
import { RefreshCw, BookOpen, Layers, ArrowRight } from 'lucide-react';

// ─────────────────────────────────────────────────────────────
// Continue Learning Card shown on the dashboard home
// ─────────────────────────────────────────────────────────────
function ContinueLearningCard({ lastSdTopic, lastDsaTopic, onNavigate }) {
  if (!lastSdTopic && !lastDsaTopic) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
      <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-sm uppercase tracking-wide">📖 Continue Learning</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {lastDsaTopic && (
          <button
            onClick={() => onNavigate('dsa-topics', lastDsaTopic.id)}
            className="flex items-center gap-3 p-3 rounded-xl bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800/50 hover:shadow-md transition-all group text-left"
          >
            <div className="p-2 bg-orange-100 dark:bg-orange-900/40 rounded-lg">
              <BookOpen className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-orange-500 dark:text-orange-400 font-semibold">DSA Topic</p>
              <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{lastDsaTopic.title}</p>
            </div>
            <ArrowRight className="w-4 h-4 text-orange-400 ml-auto group-hover:translate-x-1 transition-transform shrink-0" />
          </button>
        )}
        {lastSdTopic && (
          <button
            onClick={() => onNavigate('system-design', lastSdTopic.id)}
            className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 hover:shadow-md transition-all group text-left"
          >
            <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg">
              <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-blue-500 dark:text-blue-400 font-semibold">System Design</p>
              <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{lastSdTopic.title}</p>
            </div>
            <ArrowRight className="w-4 h-4 text-blue-400 ml-auto group-hover:translate-x-1 transition-transform shrink-0" />
          </button>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// DashboardHome — the main daily tasks view (original functionality preserved)
// ─────────────────────────────────────────────────────────────
function DashboardHome({ tasks, filteredTasks, nextMockTask, searchTerm, setSearchTerm, statusFilter, setStatusFilter, topicFilter, setTopicFilter, companyFilter, setCompanyFilter, uniqueTopics, uniqueCompanies, toggleTaskStatus, resetData, lastSdTopic, lastDsaTopic, onNavigate, activeTab }) {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            {activeTab === 'dashboard' && 'Welcome Back, Vimal 👋'}
            {activeTab === 'progress' && 'Your Learning Journey'}
            {activeTab === 'interviews' && 'Mock Interview Arena'}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Stay consistent and master Data Structures &amp; System Design.
          </p>
        </div>
        <button
          onClick={resetData}
          className="flex items-center text-sm px-3 py-1.5 text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-gray-800 rounded-md transition-colors"
        >
          <RefreshCw className="w-4 h-4 mr-1.5" /> Reset Data
        </button>
      </div>

      {/* Dashboard widgets */}
      {activeTab === 'dashboard' && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <MockInterviewAlert nextMockTask={nextMockTask} />
            </div>
            <div className="lg:col-span-1">
              <ProgressTracker tasks={tasks} />
            </div>
          </div>
          <ContinueLearningCard
            lastSdTopic={lastSdTopic}
            lastDsaTopic={lastDsaTopic}
            onNavigate={onNavigate}
          />
        </>
      )}

      {/* Progress detailed view */}
      {activeTab === 'progress' && (
        <ProgressTracker tasks={tasks} />
      )}

      {/* Task Table + Filters */}
      <div className="space-y-4">
        <Filters
          searchTerm={searchTerm} setSearchTerm={setSearchTerm}
          statusFilter={statusFilter} setStatusFilter={setStatusFilter}
          topicFilter={topicFilter} setTopicFilter={setTopicFilter}
          companyFilter={companyFilter} setCompanyFilter={setCompanyFilter}
          topics={uniqueTopics} companies={uniqueCompanies}
        />
        <TaskTable tasks={filteredTasks} toggleTaskStatus={toggleTaskStatus} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Root App
// ─────────────────────────────────────────────────────────────
export default function App() {
  // ── Core task state ───────────────────────────────────────
  const [tasks, setTasks] = useLocalStorage('dsa-tracker-tasks', []);
  const [darkMode, setDarkMode] = useLocalStorage('dsa-tracker-dark', false);

  // ── Continue Learning state ───────────────────────────────
  const [lastSdTopic] = useLocalStorage('last-sd-topic', null);
  const [lastDsaTopic] = useLocalStorage('last-dsa-topic', null);

  // ── UI state ─────────────────────────────────────────────
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  // ── Filter state ─────────────────────────────────────────
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [topicFilter, setTopicFilter] = useState('All');
  const [companyFilter, setCompanyFilter] = useState('All');

  const navigate = useNavigate();

  // Navigate from dashboard "Continue Learning" to a sub-page
  const handleContinueLearning = (tab, topicId) => {
    setActiveTab(tab);
    if (topicId) {
      navigate(`/${tab}/${topicId}`);
    }
  };

  // Seed tasks on first load
  useEffect(() => {
    if (tasks.length === 0) setTasks(generateTasks());
  }, [tasks.length, setTasks]);

  // Sync dark mode class on <html>
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const toggleTaskStatus = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, status: task.status === 'Done' ? 'Pending' : 'Done' } : task
    ));
  };

  const currentStreak = useMemo(() => {
    const doneSet = new Set(tasks.filter(t => t.status === 'Done').map(t => t.date));
    return doneSet.size;
  }, [tasks]);

  const filteredTasks = useMemo(() => tasks.filter(task => {
    const matchSearch = task.problems.toLowerCase().includes(searchTerm.toLowerCase())
      || task.topic.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'All' || task.status === statusFilter;
    const matchTopic = topicFilter === 'All' || task.topic === topicFilter;
    const matchCompany = companyFilter === 'All' || task.companyTag === companyFilter;
    const matchTab = activeTab === 'interviews' ? task.focusArea === 'Mock Interview' : true;
    return matchSearch && matchStatus && matchTopic && matchCompany && matchTab;
  }), [tasks, searchTerm, statusFilter, topicFilter, companyFilter, activeTab]);

  const uniqueTopics = useMemo(() => [...new Set(tasks.map(t => t.topic))], [tasks]);
  const uniqueCompanies = useMemo(() => [...new Set(tasks.map(t => t.companyTag))], [tasks]);
  const nextMockTask = useMemo(() => tasks.find(t => t.focusArea === 'Mock Interview' && t.status !== 'Done') || null, [tasks]);

  const resetData = () => {
    if (confirm('Are you sure you want to reset all progress?')) setTasks(generateTasks());
  };

  if (tasks.length === 0) {
    return (
      <div className={`h-screen flex items-center justify-center ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'} text-gray-500`}>
        Loading tasks...
      </div>
    );
  }

  // Dashboard tab IDs that render the built-in task view
  const dashboardTabs = ['dashboard', 'progress', 'interviews'];

  return (
    <DashboardLayout
      isOpen={isOpen} setIsOpen={setIsOpen}
      activeTab={activeTab} setActiveTab={(tab) => {
        setActiveTab(tab);
        // Navigate to page root when switching to a learning tab
        if (tab === 'system-design') navigate('/system-design');
        else if (tab === 'dsa-topics') navigate('/dsa-topics');
        else navigate('/');
      }}
      darkMode={darkMode} toggleDarkMode={toggleDarkMode}
      streak={currentStreak}
    >
      <Routes>
        {/* ── Dashboard / Progress / Interviews tabs (same component) ── */}
        <Route
          path="/"
          element={
            <DashboardHome
              tasks={tasks} filteredTasks={filteredTasks}
              nextMockTask={nextMockTask}
              searchTerm={searchTerm} setSearchTerm={setSearchTerm}
              statusFilter={statusFilter} setStatusFilter={setStatusFilter}
              topicFilter={topicFilter} setTopicFilter={setTopicFilter}
              companyFilter={companyFilter} setCompanyFilter={setCompanyFilter}
              uniqueTopics={uniqueTopics} uniqueCompanies={uniqueCompanies}
              toggleTaskStatus={toggleTaskStatus} resetData={resetData}
              lastSdTopic={lastSdTopic} lastDsaTopic={lastDsaTopic}
              onNavigate={handleContinueLearning}
              activeTab={activeTab}
            />
          }
        />

        {/* ── DSA Topics ── */}
        <Route path="/dsa-topics" element={<DsaTopics />} />
        <Route path="/dsa-topics/:topicId" element={<DsaTopicDetail />} />

        {/* ── System Design ── */}
        <Route path="/system-design" element={<SystemDesign />} />
        <Route path="/system-design/:topicId" element={<SystemDesignDetail />} />

        {/* Catch-all */}
        <Route path="*" element={<div className="text-center py-20 text-gray-500">Page not found.</div>} />
      </Routes>
    </DashboardLayout>
  );
}
