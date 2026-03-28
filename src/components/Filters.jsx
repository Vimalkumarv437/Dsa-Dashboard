import { Search, Filter, X } from 'lucide-react';

export default function Filters({ searchTerm, setSearchTerm, statusFilter, setStatusFilter, topicFilter, setTopicFilter, companyFilter, setCompanyFilter, topics, companies }) {
  
  const handleClearFilters = () => {
    setSearchTerm('');
    setStatusFilter('All');
    setTopicFilter('All');
    setCompanyFilter('All');
  };

  const hasActiveFilters = searchTerm !== '' || statusFilter !== 'All' || topicFilter !== 'All' || companyFilter !== 'All';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center">
          <Filter className="w-4 h-4 mr-2 text-blue-500" /> Filters
        </h3>
        {hasActiveFilters && (
          <button 
            onClick={handleClearFilters}
            className="text-xs font-medium text-red-500 hover:text-red-700 flex items-center transition-colors dark:hover:text-red-400"
          >
            <X className="w-3 h-3 mr-1" /> Clear All
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-shadow"
            placeholder="Search problems..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white border appearance-none"
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Done">Done</option>
        </select>

        {/* Topic Filter */}
        <select
          value={topicFilter}
          onChange={(e) => setTopicFilter(e.target.value)}
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white border appearance-none"
        >
          <option value="All">All Topics</option>
          {topics.map(topic => (
            <option key={topic} value={topic}>{topic}</option>
          ))}
        </select>

        {/* Company Filter */}
        <select
          value={companyFilter}
          onChange={(e) => setCompanyFilter(e.target.value)}
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white border appearance-none"
        >
          <option value="All">All Companies</option>
          {companies.map(company => (
            <option key={company} value={company}>{company}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
