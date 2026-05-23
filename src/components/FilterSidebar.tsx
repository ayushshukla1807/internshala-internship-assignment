'use client';
import { Filter, X, Home, Clock, Briefcase, IndianRupee, Calendar } from 'lucide-react';

interface FilterProps {
  filters: {
    profile: string;
    location: string;
    wfh: boolean;
    duration: string;
    partTime: boolean;
    ppo: boolean;
    minStipend: number;
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    profile: string;
    location: string;
    wfh: boolean;
    duration: string;
    partTime: boolean;
    ppo: boolean;
    minStipend: number;
  }>>;
  profileOptions: string[];
  locationOptions: string[];
}

const activeFilterCount = (filters: FilterProps['filters']) => {
  let count = 0;
  if (filters.profile) count++;
  if (filters.location) count++;
  if (filters.wfh) count++;
  if (filters.partTime) count++;
  if (filters.ppo) count++;
  if (filters.minStipend > 0) count++;
  if (filters.duration) count++;
  return count;
};

export default function FilterSidebar({ filters, setFilters, profileOptions, locationOptions }: FilterProps) {
  const handleClear = () => {
    setFilters({ profile: '', location: '', wfh: false, partTime: false, ppo: false, duration: '', minStipend: 0 });
  };

  const activeCount = activeFilterCount(filters);

  return (
    <div className="glass border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-5 transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-gray-800 dark:text-gray-200 font-semibold text-lg">
          <Filter className="w-5 h-5 text-blue-500" />
          Filters
          {activeCount > 0 && (
            <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold bg-blue-600 text-white rounded-full">
              {activeCount}
            </span>
          )}
        </div>
        {activeCount > 0 && (
          <button
            onClick={handleClear}
            aria-label="Clear all filters"
            className="flex items-center gap-1 text-xs font-medium text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-full transition-colors"
          >
            <X className="w-3 h-3" /> Clear all
          </button>
        )}
      </div>

      <div className="space-y-5">
        {/* Profile Filter */}
        <div>
          <label htmlFor="profile-filter" className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
            <Briefcase className="w-3.5 h-3.5" /> Profile
          </label>
          <select
            id="profile-filter"
            className="w-full border border-gray-200 dark:border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white text-sm bg-white/80 transition-colors"
            value={filters.profile}
            onChange={(e) => setFilters({ ...filters, profile: e.target.value })}
          >
            <option value="">Any Profile</option>
            {profileOptions.map(profile => (
              <option key={profile} value={profile}>{profile}</option>
            ))}
          </select>
        </div>

        {/* Location Filter */}
        <div>
          <label htmlFor="location-filter" className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
            <Home className="w-3.5 h-3.5" /> Location
          </label>
          <select
            id="location-filter"
            className="w-full border border-gray-200 dark:border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white text-sm bg-white/80 transition-colors"
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          >
            <option value="">Any Location</option>
            {locationOptions.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 dark:border-gray-700" />

        {/* Toggle Filters */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">Preferences</p>
          <div className="space-y-3">
            {[
              { id: 'wfh', label: 'Work From Home', key: 'wfh', emoji: '🏠' },
              { id: 'partTime', label: 'Part-time', key: 'partTime', emoji: '⏰' },
              { id: 'ppo', label: 'With Job Offer (PPO)', key: 'ppo', emoji: '🏆' },
            ].map(({ id, label, key, emoji }) => (
              <label
                key={id}
                htmlFor={id}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <div className="relative">
                  <input
                    id={id}
                    type="checkbox"
                    className="sr-only peer"
                    checked={filters[key as keyof typeof filters] as boolean}
                    onChange={(e) => setFilters({ ...filters, [key]: e.target.checked })}
                  />
                  <div className="w-9 h-5 bg-gray-200 dark:bg-gray-700 rounded-full peer-checked:bg-blue-600 transition-colors duration-200" />
                  <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 peer-checked:translate-x-4" />
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 select-none transition-colors">
                  {emoji} {label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 dark:border-gray-700" />

        {/* Min Stipend Slider */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="stipend-filter" className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              <IndianRupee className="w-3.5 h-3.5" /> Min. Stipend
            </label>
            <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
              {filters.minStipend === 0 ? 'Any' : `₹${filters.minStipend.toLocaleString('en-IN')}/mo`}
            </span>
          </div>
          <input
            id="stipend-filter"
            type="range"
            min="0"
            max="40000"
            step="2000"
            aria-label="Minimum stipend slider"
            className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer dark:bg-gray-700 accent-blue-600"
            value={filters.minStipend}
            onChange={(e) => setFilters({ ...filters, minStipend: parseInt(e.target.value) })}
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1.5">
            <span>₹0</span>
            <span>₹10K</span>
            <span>₹20K</span>
            <span>₹40K</span>
          </div>
        </div>

        {/* Duration */}
        <div>
          <label htmlFor="duration-filter" className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
            <Calendar className="w-3.5 h-3.5" /> Max Duration
          </label>
          <select
            id="duration-filter"
            className="w-full border border-gray-200 dark:border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white text-sm bg-white/80 transition-colors"
            value={filters.duration}
            onChange={(e) => setFilters({ ...filters, duration: e.target.value })}
          >
            <option value="">Any Duration</option>
            <option value="1">Up to 1 Month</option>
            <option value="2">Up to 2 Months</option>
            <option value="3">Up to 3 Months</option>
            <option value="4">Up to 4 Months</option>
            <option value="6">Up to 6 Months</option>
          </select>
        </div>
      </div>
    </div>
  );
}
