import { SearchX } from 'lucide-react';

export function EmptyState({ onClear }: { onClear: () => void }) {
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
