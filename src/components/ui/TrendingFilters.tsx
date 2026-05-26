'use client';
import { Filters } from '@/hooks/useInternshipFilters';

const TRENDING_PROFILES = [
  { label: 'Software Dev', value: 'Software Development' },
  { label: 'Data Science', value: 'Data Science' },
  { label: 'Design', value: 'Design' },
  { label: 'Marketing', value: 'Marketing' },
  { label: 'Finance', value: 'Finance' },
  { label: 'Content', value: 'Content Writing' },
  { label: 'Work From Home', value: null, wfh: true },
];

interface TrendingFiltersProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

export function TrendingFilters({ filters, setFilters }: TrendingFiltersProps) {
  const handleClick = (item: typeof TRENDING_PROFILES[number]) => {
    if (item.wfh) {
      setFilters((prev) => ({ ...prev, wfh: !prev.wfh }));
    } else {
      const isActive = filters.profile === item.value;
      setFilters((prev) => ({ ...prev, profile: isActive ? '' : (item.value ?? '') }));
    }
  };

  const isActive = (item: typeof TRENDING_PROFILES[number]) => {
    if (item.wfh) return filters.wfh;
    return filters.profile === item.value;
  };

  return (
    <div className="flex flex-wrap items-center gap-2 mb-5">
      <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider shrink-0">
        Trending:
      </span>
      {TRENDING_PROFILES.map((item) => (
        <button
          key={item.label}
          onClick={() => handleClick(item)}
          className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 hover:scale-105 active:scale-95 ${
            isActive(item)
              ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
              : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400'
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
