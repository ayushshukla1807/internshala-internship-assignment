'use client';
import { X, Zap } from 'lucide-react';
import { Filters, INITIAL_FILTERS } from '@/hooks/useInternshipFilters';

interface ActiveFilterChipsProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

/** Returns human-readable label for each active filter */
function getActiveChips(filters: Filters): Array<{ key: keyof Filters; label: string }> {
  const chips: Array<{ key: keyof Filters; label: string }> = [];
  if (filters.keyword) chips.push({ key: 'keyword', label: `"${filters.keyword}"` });
  if (filters.profile) chips.push({ key: 'profile', label: filters.profile });
  if (filters.location) chips.push({ key: 'location', label: filters.location });
  if (filters.wfh) chips.push({ key: 'wfh', label: 'Work From Home' });
  if (filters.partTime) chips.push({ key: 'partTime', label: 'Part-time' });
  if (filters.ppo) chips.push({ key: 'ppo', label: 'With Job Offer' });
  if (filters.minStipend > 0)
    chips.push({ key: 'minStipend', label: `Min ₹${filters.minStipend.toLocaleString('en-IN')}` });
  if (filters.duration)
    chips.push({ key: 'duration', label: `≤ ${filters.duration} Month${Number(filters.duration) > 1 ? 's' : ''}` });
  return chips;
}

export function ActiveFilterChips({ filters, setFilters }: ActiveFilterChipsProps) {
  const chips = getActiveChips(filters);
  if (chips.length === 0) return null;

  const remove = (key: keyof Filters) =>
    setFilters((prev) => ({ ...prev, [key]: INITIAL_FILTERS[key] }));

  const clearAll = () => setFilters(INITIAL_FILTERS);

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4 py-2 px-1">
      <span className="flex items-center gap-1 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
        <Zap className="w-3 h-3 text-blue-500" />
        Active:
      </span>
      {chips.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => remove(key)}
          className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700 rounded-full text-xs font-semibold hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors group"
        >
          {label}
          <X className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
        </button>
      ))}
      {chips.length > 1 && (
        <button
          onClick={clearAll}
          className="text-xs font-medium text-red-500 hover:text-red-700 dark:text-red-400 transition-colors ml-1"
        >
          Clear all
        </button>
      )}
    </div>
  );
}
