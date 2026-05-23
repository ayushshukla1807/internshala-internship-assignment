/**
 * Application-wide constants.
 * Centralising these prevents magic numbers scattered across components.
 */

/** Number of internship cards loaded per scroll batch */
export const ITEMS_PER_PAGE = 20;

/** localStorage key for the Cmd+K recent searches list */
export const RECENT_SEARCHES_KEY = 'internshala_recent_searches';

/** localStorage key prefix for individual bookmarked internships */
export const BOOKMARK_KEY_PREFIX = 'bookmark_';

/** Maximum number of recent searches to store */
export const MAX_RECENT_SEARCHES = 5;

/** Profiles surfaced in the Cmd+K spotlight for quick navigation */
export const QUICK_SEARCH_PROFILES = [
  'Software Development',
  'Data Science',
  'Marketing',
  'Design',
  'Finance',
  'Content Writing',
];

/** Locations surfaced in the Cmd+K spotlight for quick navigation */
export const QUICK_SEARCH_LOCATIONS = [
  'Delhi',
  'Mumbai',
  'Bengaluru',
  'Hyderabad',
  'Work From Home',
];

/** Sort option labels shown in the sort dropdown */
export const SORT_LABELS: Record<string, string> = {
  default: 'Relevance',
  stipend_high: 'Highest Stipend',
  newest: 'Newest First',
  shortest: 'Shortest Duration',
};
