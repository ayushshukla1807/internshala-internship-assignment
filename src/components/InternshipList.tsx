'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import FilterSidebar from './FilterSidebar';
import InternshipCard from './InternshipCard';
import SkeletonLoader from './SkeletonLoader';
import { useInternshipFilters } from '@/hooks/useInternshipFilters';
import { ITEMS_PER_PAGE, SORT_LABELS } from '@/constants';
import { SortOption } from '@/hooks/useInternshipFilters';
import { SearchX, LayoutList, LayoutGrid, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Component ───────────────────────────────────────────────────────────────

export default function InternshipList() {
  const {
    filteredInternships,
    loading,
    error,
    filters,
    setFilters,
    clearFilters,
    sortBy,
    setSortBy,
    profileOptions,
    locationOptions,
  } = useInternshipFilters();

  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);

  // Reset pagination whenever filters or sort change
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [filters, sortBy]);

  // Dynamic page title based on active filters
  useEffect(() => {
    const parts: string[] = [];
    if (filters.profile) parts.push(filters.profile);
    if (filters.location) parts.push(`in ${filters.location}`);
    if (filters.wfh) parts.push('Work From Home');
    document.title = parts.length
      ? `${parts.join(' ')} Internships | Internshala`
      : 'Internships in India | Internshala';
  }, [filters]);

  // Infinite scroll via IntersectionObserver
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

  const visibleInternships = filteredInternships.slice(0, visibleCount);
  const hasMore = visibleCount < filteredInternships.length;

  const handleSortSelect = useCallback((key: SortOption) => {
    setSortBy(key);
    setIsSortOpen(false);
  }, [setSortBy]);

  // ── Render ─────────────────────────────────────────────────────────────────

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-red-500 font-medium">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 text-blue-600 hover:underline"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">

        {/* ── Sidebar ──────────────────────────────────────────────────── */}
        <aside className="w-full md:w-1/4">
          <div className="sticky top-20">
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              profileOptions={profileOptions}
              locationOptions={locationOptions}
            />
          </div>
        </aside>

        {/* ── Main Content ─────────────────────────────────────────────── */}
        <section className="w-full md:w-3/4" aria-label="Internship listings">

          {/* Controls Bar */}
          <div className="bg-white dark:bg-gray-900 rounded-xl px-4 py-3 mb-6 shadow-sm border border-gray-200 dark:border-gray-800 flex flex-wrap items-center justify-between gap-3">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              {loading ? 'Loading...' : `${filteredInternships.length} internships found`}
            </span>

            <div className="flex items-center gap-3">
              {/* Sort Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsSortOpen((v) => !v)}
                  aria-haspopup="listbox"
                  aria-expanded={isSortOpen}
                  className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  Sort: {SORT_LABELS[sortBy]}
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isSortOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isSortOpen && (
                    <motion.ul
                      role="listbox"
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-50 min-w-[190px] overflow-hidden"
                    >
                      {(Object.entries(SORT_LABELS) as [SortOption, string][]).map(([key, label]) => (
                        <li
                          key={key}
                          role="option"
                          aria-selected={sortBy === key}
                          onClick={() => handleSortSelect(key)}
                          className={`px-4 py-2.5 text-sm cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 ${
                            sortBy === key
                              ? 'text-blue-600 dark:text-blue-400 font-semibold bg-blue-50 dark:bg-blue-900/20'
                              : 'text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          {label}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>

              {/* View Mode Toggle */}
              <div
                role="group"
                aria-label="View mode"
                className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1"
              >
                <button
                  onClick={() => setViewMode('list')}
                  aria-label="List view"
                  aria-pressed={viewMode === 'list'}
                  className={`p-1.5 rounded-md transition-all ${
                    viewMode === 'list'
                      ? 'bg-white dark:bg-gray-700 shadow text-blue-600'
                      : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <LayoutList className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  aria-label="Grid view"
                  aria-pressed={viewMode === 'grid'}
                  className={`p-1.5 rounded-md transition-all ${
                    viewMode === 'grid'
                      ? 'bg-white dark:bg-gray-700 shadow text-blue-600'
                      : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Card List */}
          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }, (_, i) => (
                <SkeletonLoader key={i} />
              ))}
            </div>
          ) : filteredInternships.length > 0 ? (
            <>
              <AnimatePresence mode="popLayout">
                <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 gap-4' : 'space-y-4'}>
                  {visibleInternships.map((internship, index) => (
                    <motion.div
                      key={internship.id}
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.2, delay: Math.min(index * 0.03, 0.4) }}
                    >
                      <InternshipCard internship={internship} viewMode={viewMode} />
                    </motion.div>
                  ))}
                </div>
              </AnimatePresence>

              {/* Infinite scroll sentinel */}
              <div ref={loaderRef} className="mt-8 flex justify-center">
                {hasMore ? (
                  <div className="flex items-center gap-2 text-gray-400 text-sm py-4">
                    <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    Loading more...
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm py-4">
                    All {filteredInternships.length} internships loaded
                  </p>
                )}
              </div>
            </>
          ) : (
            <EmptyState onClear={clearFilters} />
          )}
        </section>
      </div>
    </main>
  );
}

// ─── Empty State Sub-component ───────────────────────────────────────────────

function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-12 text-center border border-gray-200 dark:border-gray-700 flex flex-col items-center">
      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-full mb-4">
        <SearchX className="w-10 h-10 text-gray-400" />
      </div>
      <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1">
        No internships found
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs mb-6">
        No internships match your current filters. Try adjusting your preferences.
      </p>
      <button
        onClick={onClear}
        className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors active:scale-95"
      >
        Clear all filters
      </button>
    </div>
  );
}
