'use client';
import { Filter, Search } from 'lucide-react';

interface FilterProps {
  filters: {
    profile: string;
    location: string;
    wfh: boolean;
    duration: string;
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    profile: string;
    location: string;
    wfh: boolean;
    duration: string;
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
      duration: '',
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

        {/* Work from Home Toggle */}
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
