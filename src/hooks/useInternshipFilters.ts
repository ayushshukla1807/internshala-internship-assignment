import { useState, useEffect, useMemo, useCallback } from 'react';
import { Internship, InternshipApiResponse } from '@/types/internship';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface Filters {
  keyword: string;   // NEW: free-text keyword search
  profile: string;
  location: string;
  wfh: boolean;
  partTime: boolean;
  ppo: boolean;
  duration: string;
  minStipend: number;
}

export type SortOption = 'default' | 'stipend_high' | 'newest' | 'shortest';

export const INITIAL_FILTERS: Filters = {
  keyword: '',
  profile: '',
  location: '',
  wfh: false,
  partTime: false,
  ppo: false,
  duration: '',
  minStipend: 0,
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function parseDurationToMonths(duration: string): number {
  const match = duration?.match(/(\d+)\s*(Month|Week)/i);
  if (!match) return 999;
  const value = parseInt(match[1], 10);
  return match[2].toLowerCase().startsWith('week') ? value / 4 : value;
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useInternshipFilters() {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS);
  const [sortBy, setSortBy] = useState<SortOption>('default');

  // Fetch internships once on mount
  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const response = await fetch('https://internshala.com/hiring/search');
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

        const data: InternshipApiResponse = await response.json();
        const parsed = data.internship_ids
          .map((id) => data.internships_meta[id.toString()])
          .filter(Boolean);

        setInternships(parsed);
      } catch (err) {
        console.warn('[useInternshipFilters] Live fetch failed, falling back to local data...', err);
        try {
          const fallbackRes = await fetch('/fallback-internships.json');
          if (!fallbackRes.ok) throw new Error('Fallback also failed');
          const data: InternshipApiResponse = await fallbackRes.json();
          const parsed = data.internship_ids
            .map((id) => data.internships_meta[id.toString()])
            .filter(Boolean);
          setInternships(parsed);
        } catch (fallbackErr) {
          console.error('[useInternshipFilters] Fallback fetch failed:', fallbackErr);
          setError('Unable to load internships. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchInternships();
  }, []);

  // Derive unique autocomplete options from raw data
  const profileOptions = useMemo(
    () => Array.from(new Set(internships.map((i) => i.profile_name))).filter(Boolean).sort(),
    [internships]
  );

  const locationOptions = useMemo(
    () => Array.from(new Set(internships.flatMap((i) => i.location_names))).filter(Boolean).sort(),
    [internships]
  );

  // Apply all active filters
  const filteredInternships = useMemo(() => {
    let result = internships.filter((internship) => {
      const { keyword, profile, location, wfh, partTime, ppo, minStipend, duration } = filters;

      // Keyword: multi-word search across title, company, profile, and location
      if (keyword) {
        const queryWords = keyword.toLowerCase().split(/\s+/).filter(Boolean);
        const matchesAllWords = queryWords.every((word) => {
          const inTitle = internship.title.toLowerCase().includes(word);
          const inCompany = internship.company_name.toLowerCase().includes(word);
          const inLocation = internship.location_names?.some((loc) => loc.toLowerCase().includes(word));
          const inProfile = internship.profile_name?.toLowerCase().includes(word);
          return inTitle || inCompany || inLocation || inProfile;
        });
        if (!matchesAllWords) return false;
      }

      // Profile: matches title or profile_name
      if (profile) {
        const profileLower = profile.toLowerCase();
        const matchesTitle = internship.title.toLowerCase().includes(profileLower);
        const matchesProfile = internship.profile_name?.toLowerCase().includes(profileLower);
        if (!matchesTitle && !matchesProfile) return false;
      }

      // Location
      if (location) {
        const locationLower = location.toLowerCase();
        const matchesLocation = internship.location_names?.some((loc) =>
          loc.toLowerCase().includes(locationLower)
        );
        if (!matchesLocation && !internship.work_from_home) return false;
      }

      if (wfh && !internship.work_from_home) return false;
      if (partTime && !internship.part_time) return false;
      if (ppo && !internship.is_ppo) return false;

      if (minStipend > 0) {
        const stipend = internship.stipend?.salaryValue1 ?? 0;
        if (stipend < minStipend) return false;
      }

      if (duration) {
        const maxMonths = parseInt(duration, 10);
        const internshipMonths = parseDurationToMonths(internship.duration);
        if (internshipMonths > maxMonths) return false;
      }

      return true;
    });

    // Apply sort
    switch (sortBy) {
      case 'stipend_high':
        result = [...result].sort(
          (a, b) => (b.stipend?.salaryValue1 ?? 0) - (a.stipend?.salaryValue1 ?? 0)
        );
        break;
      case 'newest':
        result = [...result].sort(
          (a, b) => (b.postedOnDateTime ?? 0) - (a.postedOnDateTime ?? 0)
        );
        break;
      case 'shortest':
        result = [...result].sort(
          (a, b) => parseDurationToMonths(a.duration) - parseDurationToMonths(b.duration)
        );
        break;
      default:
        break;
    }

    return result;
  }, [internships, filters, sortBy]);

  const clearFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS);
  }, []);

  const activeFilterCount = useMemo(() => {
    return [
      filters.keyword,
      filters.profile,
      filters.location,
      filters.wfh,
      filters.partTime,
      filters.ppo,
      filters.minStipend > 0,
      filters.duration,
    ].filter(Boolean).length;
  }, [filters]);

  return {
    // Data
    internships,
    filteredInternships,
    loading,
    error,
    // Filter state
    filters,
    setFilters,
    clearFilters,
    activeFilterCount,
    // Sort state
    sortBy,
    setSortBy,
    // Autocomplete options
    profileOptions,
    locationOptions,
  };
}
