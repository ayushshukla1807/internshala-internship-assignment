'use client';
import { useState, useEffect, useMemo } from 'react';
import FilterSidebar from './FilterSidebar';
import InternshipCard from './InternshipCard';
import SkeletonLoader from './SkeletonLoader';
import { Internship, InternshipApiResponse } from '@/types/internship';
import { SearchX, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function InternshipList() {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter State
  const [filters, setFilters] = useState({
    profile: '',
    location: '',
    wfh: false,
    partTime: false,
    ppo: false,
    duration: '',
    minStipend: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://internshala.com/hiring/search');
        if (!response.ok) throw new Error('Failed to fetch data');
        const data: InternshipApiResponse = await response.json();
        
        // Convert the meta object into an array using the ordered IDs
        const parsedInternships = data.internship_ids.map(
          (id) => data.internships_meta[id.toString()]
        ).filter(Boolean); // Remove any potential undefined
        
        setInternships(parsedInternships);
      } catch (err) {
        setError('Unable to load internships. Please try again later.');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // EXTRACT OPTIONS FOR DROPDOWNS
  const profileOptions = useMemo(() => {
    return Array.from(new Set(internships.map(i => i.profile_name))).filter(Boolean).sort();
  }, [internships]);

  const locationOptions = useMemo(() => {
    return Array.from(new Set(internships.flatMap(i => i.location_names))).filter(Boolean).sort();
  }, [internships]);

  // FRONTEND FILTERING LOGIC
  const filteredInternships = useMemo(() => {
    return internships.filter((internship) => {
      // 1. Profile Filter
      if (filters.profile && !internship.profile_name?.toLowerCase().includes(filters.profile.toLowerCase()) && !internship.title.toLowerCase().includes(filters.profile.toLowerCase())) {
        return false;
      }

      // 2. Location Filter
      if (filters.location) {
        const matchesLocation = internship.location_names?.some(loc => 
          loc.toLowerCase().includes(filters.location.toLowerCase())
        );
        if (!matchesLocation && !internship.work_from_home) {
          // Allow WFH to pass location filter sometimes, but strictly we should filter out if they asked for a specific city and it's not there.
          return false;
        }
      }

      // 3. Work From Home Filter
      if (filters.wfh && !internship.work_from_home) {
        return false;
      }

      // 4. Part-time Filter
      if (filters.partTime && !internship.part_time) {
        return false;
      }

      // 5. PPO Filter
      if (filters.ppo && !internship.is_ppo) {
        return false;
      }

      // 6. Minimum Stipend Filter
      if (filters.minStipend > 0) {
        // Some internships have null stipend values or no salaryValue1
        const stipendValue = internship.stipend?.salaryValue1 || 0;
        if (stipendValue < filters.minStipend) {
          return false;
        }
      }

      // 7. Duration Filter
      if (filters.duration) {
        const selectedDuration = parseInt(filters.duration, 10);
        // Extract number from strings like "3 Months" or "6 Weeks"
        const durationMatch = internship.duration?.match(/(\d+)\s*(Month|Week)/i);
        if (durationMatch) {
          let durationInMonths = parseInt(durationMatch[1], 10);
          if (durationMatch[2].toLowerCase().startsWith('week')) {
            durationInMonths = durationInMonths / 4; // approximate
          }
          if (durationInMonths > selectedDuration) {
            return false; // Filter out if it exceeds the max duration
          }
        }
      }

      return true;
    });
  }, [internships, filters]);

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-red-500 font-medium">{error}</p>
        <button onClick={() => window.location.reload()} className="mt-4 text-blue-600 hover:underline">
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-1/4">
          <FilterSidebar 
            filters={filters} 
            setFilters={setFilters} 
            profileOptions={profileOptions}
            locationOptions={locationOptions}
          />
        </div>

        {/* List */}
        <div className="w-full md:w-3/4">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-4 mb-6 shadow-sm border border-gray-200 dark:border-gray-800 flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300 font-medium">{filteredInternships.length} internships found</span>
          </div>

          <div className="space-y-4">
            {loading ? (
              // Skeleton Loaders
              [...Array(5)].map((_, i) => (
                <SkeletonLoader key={`skeleton-${i}`} />
              ))
            ) : filteredInternships.length > 0 ? (
              <AnimatePresence mode="popLayout">
                {filteredInternships.map((internship, index) => (
                  <motion.div
                    key={internship.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <InternshipCard internship={internship} />
                  </motion.div>
                ))}
              </AnimatePresence>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-12 text-center border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-full mb-4">
                  <SearchX className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">No internships found</h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-sm mb-6 text-sm">
                  We couldn't find any internships matching your current filters. Try adjusting your preferences.
                </p>
                <button 
                  onClick={() => setFilters({ profile: '', location: '', wfh: false, partTime: false, ppo: false, duration: '', minStipend: 0 })}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md font-medium transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
