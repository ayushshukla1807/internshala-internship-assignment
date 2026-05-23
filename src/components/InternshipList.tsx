'use client';
import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import FilterSidebar from './FilterSidebar';
import InternshipCard from './InternshipCard';
import SkeletonLoader from './SkeletonLoader';
import { Internship, InternshipApiResponse } from '@/types/internship';
import { SearchX, LayoutList, LayoutGrid, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type SortOption = 'default' | 'stipend_high' | 'newest' | 'shortest';

const ITEMS_PER_PAGE = 20;

export default function InternshipList() {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);

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
        const parsedInternships = data.internship_ids
          .map((id) => data.internships_meta[id.toString()])
          .filter(Boolean);
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

  // Reset visible count whenever filters/sort change
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [filters, sortBy]);

  // Dynamic SEO title based on active filters
  useEffect(() => {
    const parts: string[] = [];
    if (filters.profile) parts.push(filters.profile);
    if (filters.location) parts.push(`in ${filters.location}`);
    if (filters.wfh) parts.push('Work From Home');
    const title = parts.length > 0
      ? `${parts.join(' ')} Internships | Internshala Clone`
      : 'Internships in India | Internshala Clone';
    document.title = title;
  }, [filters]);

  // Infinite scroll via Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
        }
      },
      { threshold: 0.1 }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, []);

  // EXTRACT OPTIONS FOR DROPDOWNS
  const profileOptions = useMemo(() => {
    return Array.from(new Set(internships.map((i) => i.profile_name))).filter(Boolean).sort();
  }, [internships]);

  const locationOptions = useMemo(() => {
    return Array.from(new Set(internships.flatMap((i) => i.location_names))).filter(Boolean).sort();
  }, [internships]);

  // FILTERING
  const filteredInternships = useMemo(() => {
    let result = internships.filter((internship) => {
      if (filters.profile &&
        !internship.profile_name?.toLowerCase().includes(filters.profile.toLowerCase()) &&
        !internship.title.toLowerCase().includes(filters.profile.toLowerCase())) return false;

      if (filters.location) {
        const matchesLocation = internship.location_names?.some((loc) =>
          loc.toLowerCase().includes(filters.location.toLowerCase())
        );
        if (!matchesLocation && !internship.work_from_home) return false;
      }

      if (filters.wfh && !internship.work_from_home) return false;
      if (filters.partTime && !internship.part_time) return false;
      if (filters.ppo && !internship.is_ppo) return false;

      if (filters.minStipend > 0) {
        const stipendValue = internship.stipend?.salaryValue1 || 0;
        if (stipendValue < filters.minStipend) return false;
      }

      if (filters.duration) {
        const selectedDuration = parseInt(filters.duration, 10);
        const durationMatch = internship.duration?.match(/(\d+)\s*(Month|Week)/i);
        if (durationMatch) {
          let durationInMonths = parseInt(durationMatch[1], 10);
          if (durationMatch[2].toLowerCase().startsWith('week')) durationInMonths = durationInMonths / 4;
          if (durationInMonths > selectedDuration) return false;
        }
      }

      return true;
    });

    // SORTING
    switch (sortBy) {
      case 'stipend_high':
        result = [...result].sort((a, b) => (b.stipend?.salaryValue1 || 0) - (a.stipend?.salaryValue1 || 0));
        break;
      case 'newest':
        result = [...result].sort((a, b) => (b.postedOnDateTime || 0) - (a.postedOnDateTime || 0));
        break;
      case 'shortest':
        result = [...result].sort((a, b) => {
          const getDur = (d: string) => {
            const m = d?.match(/(\d+)\s*(Month|Week)/i);
            if (!m) return 999;
            let v = parseInt(m[1]);
            if (m[2].toLowerCase().startsWith('week')) v = v / 4;
            return v;
          };
          return getDur(a.duration) - getDur(b.duration);
        });
        break;
      default:
        break;
    }

    return result;
  }, [internships, filters, sortBy]);

  const visibleInternships = useMemo(() => filteredInternships.slice(0, visibleCount), [filteredInternships, visibleCount]);
  const hasMore = visibleCount < filteredInternships.length;

  const sortLabels: Record<SortOption, string> = {
    default: 'Relevance',
    stipend_high: 'Highest Stipend',
    newest: 'Newest First',
    shortest: 'Shortest Duration',
  };

  const clearFilters = useCallback(() => {
    setFilters({ profile: '', location: '', wfh: false, partTime: false, ppo: false, duration: '', minStipend: 0 });
  }, []);

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
          <div className="sticky top-20">
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              profileOptions={profileOptions}
              locationOptions={locationOptions}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-3/4">
          {/* Controls Bar */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-4 mb-6 shadow-sm border border-gray-200 dark:border-gray-800 flex flex-wrap items-center justify-between gap-3">
            <span className="text-gray-700 dark:text-gray-300 font-semibold">
              {loading ? 'Loading...' : `${filteredInternships.length} internships found`}
            </span>
            <div className="flex items-center gap-3">
              {/* Sort Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <span>Sort: {sortLabels[sortBy]}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isSortOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-50 min-w-[200px] overflow-hidden"
                    >
                      {(Object.entries(sortLabels) as [SortOption, string][]).map(([key, label]) => (
                        <button
                          key={key}
                          onClick={() => { setSortBy(key); setIsSortOpen(false); }}
                          className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 ${sortBy === key ? 'text-blue-600 dark:text-blue-400 font-semibold bg-blue-50 dark:bg-blue-900/20' : 'text-gray-700 dark:text-gray-300'}`}
                        >
                          {label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* View Toggle */}
              <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('list')}
                  aria-label="List view"
                  className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white dark:bg-gray-700 shadow text-blue-600' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                >
                  <LayoutList className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  aria-label="Grid view"
                  className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-gray-700 shadow text-blue-600' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Cards */}
          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => <SkeletonLoader key={`skeleton-${i}`} />)}
            </div>
          ) : filteredInternships.length > 0 ? (
            <>
              <AnimatePresence mode="popLayout">
                <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 gap-4' : 'space-y-4'}>
                  {visibleInternships.map((internship, index) => (
                    <motion.div
                      key={internship.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.25, delay: Math.min(index * 0.04, 0.5) }}
                    >
                      <InternshipCard internship={internship} viewMode={viewMode} />
                    </motion.div>
                  ))}
                </div>
              </AnimatePresence>

              {/* Infinite Scroll Trigger */}
              <div ref={loaderRef} className="mt-6 flex justify-center">
                {hasMore ? (
                  <div className="flex items-center gap-2 text-gray-400 text-sm py-4">
                    <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    Loading more internships...
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm py-4">All {filteredInternships.length} internships loaded</p>
                )}
              </div>
            </>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-12 text-center border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center">
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-full mb-4">
                <SearchX className="w-12 h-12 text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">No internships found</h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-sm mb-6 text-sm">
                We couldn't find any internships matching your current filters. Try adjusting your preferences.
              </p>
              <button
                onClick={clearFilters}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition-all duration-200 active:scale-95"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
