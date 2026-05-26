'use client';
import { motion } from 'framer-motion';

export function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center border border-gray-200 dark:border-gray-700 flex flex-col items-center shadow-sm"
    >
      {/* SVG Illustration */}
      <div className="mb-6">
        <svg width="120" height="100" viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-80">
          <ellipse cx="60" cy="88" rx="44" ry="6" fill="#E5E7EB" className="dark:fill-gray-700" />
          <rect x="20" y="20" width="80" height="60" rx="8" fill="#F3F4F6" className="dark:fill-gray-700" stroke="#D1D5DB" strokeWidth="2" />
          <rect x="30" y="32" width="40" height="4" rx="2" fill="#D1D5DB" />
          <rect x="30" y="42" width="56" height="3" rx="1.5" fill="#E5E7EB" />
          <rect x="30" y="51" width="48" height="3" rx="1.5" fill="#E5E7EB" />
          <rect x="30" y="60" width="36" height="3" rx="1.5" fill="#E5E7EB" />
          {/* Magnifier */}
          <circle cx="85" cy="30" r="14" fill="white" stroke="#3B82F6" strokeWidth="2.5" className="dark:fill-gray-800" />
          <circle cx="85" cy="30" r="8" fill="#EFF6FF" className="dark:fill-blue-900/40" />
          <line x1="95" y1="40" x2="105" y2="50" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" />
          {/* X mark inside magnifier */}
          <line x1="82" y1="27" x2="88" y2="33" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="88" y1="27" x2="82" y2="33" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
        No internships found
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs mb-6 leading-relaxed">
        Your filters returned no results. Try removing a filter or broadening your search.
      </p>
      <button
        onClick={onClear}
        className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-all duration-200 active:scale-95 shadow-sm hover:shadow-md"
      >
        Reset all filters
      </button>
    </motion.div>
  );
}
