'use client';
import { useEffect, useState, useCallback } from 'react';
import { Command } from 'cmdk';
import { Search, Clock, Briefcase, MapPin, X } from 'lucide-react';
import {
  RECENT_SEARCHES_KEY,
  MAX_RECENT_SEARCHES,
  QUICK_SEARCH_PROFILES,
  QUICK_SEARCH_LOCATIONS,
} from '@/constants';

const MAX_RECENT = MAX_RECENT_SEARCHES;
const STORAGE_KEY = RECENT_SEARCHES_KEY;

export default function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Load recent searches from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setRecentSearches(JSON.parse(stored));
    } catch { /* ignore */ }
  }, [open]);

  // Toggle on ⌘K / Ctrl+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const addRecent = useCallback((term: string) => {
    setRecentSearches((prev) => {
      const updated = [term, ...prev.filter((s) => s !== term)].slice(0, MAX_RECENT);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const removeRecent = useCallback((term: string) => {
    setRecentSearches((prev) => {
      const updated = prev.filter((s) => s !== term);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const handleSelect = useCallback((term: string) => {
    addRecent(term);
    setOpen(false);
    setQuery('');
  }, [addRecent]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4 bg-black/50 backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <Command
        label="Search internships"
        className="bg-white dark:bg-gray-900 w-full max-w-xl rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center border-b border-gray-200 dark:border-gray-800 px-4 py-3.5 gap-3">
          <Search className="w-5 h-5 text-gray-400 shrink-0" />
          <Command.Input
            autoFocus
            value={query}
            onValueChange={setQuery}
            placeholder="Search internships, companies, locations..."
            className="flex-1 bg-transparent border-none outline-none text-gray-900 dark:text-gray-100 placeholder:text-gray-400 text-base"
          />
          <kbd className="hidden sm:flex items-center gap-1 text-[10px] font-medium text-gray-400 border border-gray-200 dark:border-gray-700 rounded px-1.5 py-0.5">
            ESC
          </kbd>
        </div>

        <Command.List className="max-h-[60vh] overflow-y-auto p-2">
          <Command.Empty className="py-10 text-center text-sm text-gray-500">
            No results found for &quot;{query}&quot;
          </Command.Empty>

          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <Command.Group
              heading={
                <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-gray-400 px-2 py-1.5">
                  <Clock className="w-3 h-3" /> Recent Searches
                </span>
              }
            >
              {recentSearches.map((term) => (
                <Command.Item
                  key={term}
                  value={term}
                  onSelect={() => handleSelect(term)}
                  className="flex items-center justify-between px-3 py-2 mt-0.5 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 aria-selected:bg-gray-100 dark:aria-selected:bg-gray-800 transition-colors text-sm text-gray-700 dark:text-gray-300 group"
                >
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    {term}
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); removeRecent(term); }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 hover:text-red-500"
                    aria-label={`Remove ${term} from recent`}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </Command.Item>
              ))}
            </Command.Group>
          )}

          {/* Top Profiles */}
          <Command.Group
            heading={
              <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-gray-400 px-2 py-1.5 mt-1">
                <Briefcase className="w-3 h-3" /> Top Profiles
              </span>
            }
          >
            {QUICK_SEARCH_PROFILES.map((profile) => (
              <Command.Item
                key={profile}
                value={profile}
                onSelect={() => handleSelect(profile)}
                className="flex items-center gap-2.5 px-3 py-2 mt-0.5 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 aria-selected:bg-gray-100 dark:aria-selected:bg-gray-800 transition-colors text-sm text-gray-700 dark:text-gray-300"
              >
                <Briefcase className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                {profile}
              </Command.Item>
            ))}
          </Command.Group>

          {/* Top Locations */}
          <Command.Group
            heading={
              <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-gray-400 px-2 py-1.5 mt-1">
                <MapPin className="w-3 h-3" /> Top Locations
              </span>
            }
          >
            {QUICK_SEARCH_LOCATIONS.map((location) => (
              <Command.Item
                key={location}
                value={location}
                onSelect={() => handleSelect(location)}
                className="flex items-center gap-2.5 px-3 py-2 mt-0.5 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 aria-selected:bg-gray-100 dark:aria-selected:bg-gray-800 transition-colors text-sm text-gray-700 dark:text-gray-300"
              >
                <MapPin className="w-3.5 h-3.5 text-green-500 shrink-0" />
                {location}
              </Command.Item>
            ))}
          </Command.Group>
        </Command.List>

        {/* Footer hint */}
        <div className="border-t border-gray-100 dark:border-gray-800 px-4 py-2 flex items-center gap-4 text-[11px] text-gray-400">
          <span className="flex items-center gap-1"><kbd className="border border-gray-200 dark:border-gray-700 rounded px-1">↑↓</kbd> navigate</span>
          <span className="flex items-center gap-1"><kbd className="border border-gray-200 dark:border-gray-700 rounded px-1">↵</kbd> select</span>
          <span className="flex items-center gap-1"><kbd className="border border-gray-200 dark:border-gray-700 rounded px-1">ESC</kbd> close</span>
        </div>
      </Command>
    </div>
  );
}
