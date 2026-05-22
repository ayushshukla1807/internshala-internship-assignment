'use client';
import { Filter, Search } from 'lucide-react';

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

export default function FilterSidebar({ filters, setFilters, profileOptions, locationOptions }: FilterProps) {
  const handleClear = () => {
    setFilters({
      profile: '',
      location: '',
      wfh: false,
      partTime: false,
      ppo: false,
      duration: '',
      minStipend: 0,
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-5 md:sticky top-20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center text-gray-800 dark:text-gray-200 font-semibold text-lg">
          <Filter className="w-5 h-5 mr-2 text-blue-500" />
          Filters
        </div>
        <button 
          onClick={handleClear}
          className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          Clear all
        </button>
      </div>

      <div className="space-y-6">
        {/* Profile Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Profile
          </label>
          <select
            className="w-full border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm appearance-none"
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
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Location
          </label>
          <select
            className="w-full border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm appearance-none"
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          >
            <option value="">Any Location</option>
            {locationOptions.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>

        {/* Preferences Toggles */}
        <div className="space-y-3">
          <div className="flex items-center">
            <input
              id="wfh"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
              checked={filters.wfh}
              onChange={(e) => setFilters({ ...filters, wfh: e.target.checked })}
            />
            <label htmlFor="wfh" className="ml-2 block text-sm text-gray-700 dark:text-gray-300 cursor-pointer select-none">
              Work from home
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              id="partTime"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
              checked={filters.partTime}
              onChange={(e) => setFilters({ ...filters, partTime: e.target.checked })}
            />
            <label htmlFor="partTime" className="ml-2 block text-sm text-gray-700 dark:text-gray-300 cursor-pointer select-none">
              Part-time
            </label>
          </div>

          <div className="flex items-center">
            <input
              id="ppo"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
              checked={filters.ppo}
              onChange={(e) => setFilters({ ...filters, ppo: e.target.checked })}
            />
            <label htmlFor="ppo" className="ml-2 block text-sm text-gray-700 dark:text-gray-300 cursor-pointer select-none">
              Internships with job offer
            </label>
          </div>
        </div>

        {/* Minimum Stipend Filter */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Minimum Stipend
            </label>
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
              ₹{filters.minStipend.toLocaleString()}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="40000"
            step="2000"
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            value={filters.minStipend}
            onChange={(e) => setFilters({ ...filters, minStipend: parseInt(e.target.value) })}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1 px-1">
            <span>₹0</span>
            <span>₹40K</span>
          </div>
        </div>

        {/* Duration Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Max. duration (months)
          </label>
          <select
            className="w-full border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm appearance-none"
            value={filters.duration}
            onChange={(e) => setFilters({ ...filters, duration: e.target.value })}
          >
            <option value="">Any</option>
            <option value="1">1 Month</option>
            <option value="2">2 Months</option>
            <option value="3">3 Months</option>
            <option value="4">4 Months</option>
            <option value="6">6 Months</option>
          </select>
        </div>
      </div>
    </div>
  );
}
