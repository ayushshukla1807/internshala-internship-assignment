'use client';
import { useState } from 'react';
import { Filter, X, Home, IndianRupee, Calendar, ChevronDown, Search } from 'lucide-react';
import { Filters, INITIAL_FILTERS } from '@/hooks/useInternshipFilters';
import { ToggleSwitch } from './ui/ToggleSwitch';

interface FilterSidebarProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  profileOptions: string[];
  locationOptions: string[];
}

const activeFilterCount = (filters: Filters): number =>
  [
    filters.keyword,
    filters.profile,
    filters.location,
    filters.wfh,
    filters.partTime,
    filters.ppo,
    filters.minStipend > 0,
    filters.duration,
  ].filter(Boolean).length;

export default function FilterSidebar({
  filters,
  setFilters,
  profileOptions,
  locationOptions,
}: FilterSidebarProps) {
  const [showMore, setShowMore] = useState(false);
  const count = activeFilterCount(filters);

  const handleClear = () => setFilters(INITIAL_FILTERS);

  const set = <K extends keyof Filters>(key: K, value: Filters[K]) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-2 font-semibold text-gray-800 dark:text-gray-200">
          <Filter className="w-4 h-4 text-blue-500" />
          Filters
          {count > 0 && (
            <span className="w-5 h-5 flex items-center justify-center bg-blue-600 text-white text-xs font-bold rounded-full">
              {count}
            </span>
          )}
        </div>
        {count > 0 && (
          <button
            onClick={handleClear}
            aria-label="Clear all filters"
            className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 transition-colors"
          >
            <X className="w-3 h-3" /> Clear all
          </button>
        )}
      </div>

      <div className="p-5 space-y-5">
        {/* Keyword Search */}
        <div>
          <label htmlFor="keyword-search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Keyword Search
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input
              id="keyword-search"
              type="text"
              placeholder="e.g. Design, Mumbai, Infosys"
              className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={filters.keyword}
              onChange={(e) => set('keyword', e.target.value)}
            />
          </div>
        </div>

        <div className="border-t border-gray-100 dark:border-gray-700" />

        {/* Profile (autocomplete) */}
        <div>
          <label htmlFor="profile-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Profile
          </label>
          <input
            id="profile-filter"
            list="profile-options"
            type="text"
            placeholder="e.g. Marketing"
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={filters.profile}
            onChange={(e) => set('profile', e.target.value)}
          />
          <datalist id="profile-options">
            {profileOptions.map((p) => (
              <option key={p} value={p} />
            ))}
          </datalist>
        </div>

        {/* Location (autocomplete) */}
        <div>
          <label htmlFor="location-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Location
          </label>
          <input
            id="location-filter"
            list="location-options"
            type="text"
            placeholder="e.g. Delhi"
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={filters.location}
            onChange={(e) => set('location', e.target.value)}
          />
          <datalist id="location-options">
            {locationOptions.map((l) => (
              <option key={l} value={l} />
            ))}
          </datalist>
        </div>

        <div className="border-t border-gray-100 dark:border-gray-700" />

        {/* Checkboxes */}
        <div className="space-y-3">
          {[
            { id: 'wfh', label: 'Work from home', key: 'wfh' as keyof Filters },
            { id: 'partTime', label: 'Part-time', key: 'partTime' as keyof Filters },
            { id: 'ppo', label: 'Internships with job offer', key: 'ppo' as keyof Filters },
          ].map(({ id, label, key }) => (
            <ToggleSwitch
              key={id}
              id={id}
              label={label}
              checked={filters[key] as boolean}
              onChange={(checked) => set(key, checked as Filters[typeof key])}
            />
          ))}
        </div>

        <div className="border-t border-gray-100 dark:border-gray-700" />

        {/* Min Stipend */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="stipend-filter" className="flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
              <IndianRupee className="w-3.5 h-3.5" /> Min. Monthly Stipend
            </label>
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
              {filters.minStipend === 0 ? 'Any' : `₹${filters.minStipend.toLocaleString('en-IN')}`}
            </span>
          </div>
          <input
            id="stipend-filter"
            type="range"
            min="0"
            max="40000"
            step="2000"
            aria-label="Minimum stipend"
            className="w-full accent-blue-600"
            value={filters.minStipend}
            onChange={(e) => set('minStipend', parseInt(e.target.value))}
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>₹0</span>
            <span>₹10K</span>
            <span>₹20K</span>
            <span>₹40K</span>
          </div>
        </div>

        {/* View more filters toggle */}
        <button
          onClick={() => setShowMore((v) => !v)}
          aria-expanded={showMore}
          className="flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 transition-colors"
        >
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showMore ? 'rotate-180' : ''}`} />
          {showMore ? 'View fewer filters' : 'View more filters'}
        </button>

        {/* More filters (collapsed by default) */}
        {showMore && (
          <div className="space-y-4">
            <div className="border-t border-gray-100 dark:border-gray-700" />

            {/* Duration */}
            <div>
              <label htmlFor="duration-filter" className="flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                <Calendar className="w-3.5 h-3.5" /> Max Duration
              </label>
              <select
                id="duration-filter"
                className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                value={filters.duration}
                onChange={(e) => set('duration', e.target.value)}
              >
                <option value="">Any Duration</option>
                <option value="1">Up to 1 Month</option>
                <option value="2">Up to 2 Months</option>
                <option value="3">Up to 3 Months</option>
                <option value="4">Up to 4 Months</option>
                <option value="6">Up to 6 Months</option>
              </select>
            </div>

            {/* Home city toggle */}
            <ToggleSwitch
              id="home-city"
              label={
                <span className="flex items-center gap-1">
                  <Home className="w-3.5 h-3.5" /> Internships in my city
                </span>
              }
              checked={filters.location === 'Delhi'}
              onChange={(checked) => set('location', checked ? 'Delhi' : '')}
            />
          </div>
        )}
      </div>
    </div>
  );
}
