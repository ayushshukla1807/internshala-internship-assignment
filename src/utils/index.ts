/**
 * Shared utility functions.
 * Pure functions with no side effects — easy to unit-test.
 */

import { Stipend } from '@/types/internship';

/**
 * Formats a raw stipend value into a human-readable Indian Rupee string.
 * Falls back to the API's pre-formatted salary string if no numeric value exists.
 *
 * @example
 * formatStipend({ salaryValue1: 50000, salary: '₹ 50,000 /month' })
 * // → "₹50,000/month"
 */
export function formatStipend(stipend: Stipend | null | undefined): string {
  if (!stipend) return 'Unpaid';
  if (stipend.salaryValue1) {
    return (
      new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
      }).format(stipend.salaryValue1) + '/month'
    );
  }
  return stipend.salary || 'Unpaid';
}

/**
 * Converts a duration string (e.g. "3 Months", "6 Weeks") to months.
 * Returns 999 for unrecognised formats so they sort to the bottom.
 *
 * @example
 * parseDurationToMonths('3 Months') // → 3
 * parseDurationToMonths('8 Weeks')  // → 2
 */
export function parseDurationToMonths(duration: string): number {
  const match = duration?.match(/(\d+)\s*(Month|Week)/i);
  if (!match) return 999;
  const value = parseInt(match[1], 10);
  return match[2].toLowerCase().startsWith('week') ? value / 4 : value;
}

/**
 * Builds a localStorage key for a bookmarked internship.
 *
 * @example
 * buildBookmarkKey(12345) // → "bookmark_12345"
 */
export function buildBookmarkKey(internshipId: number): string {
  return `bookmark_${internshipId}`;
}
