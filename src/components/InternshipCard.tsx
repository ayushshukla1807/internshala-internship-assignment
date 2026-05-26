'use client';
import {
  MapPin,
  PlayCircle,
  Calendar,
  IndianRupee,
  Share2,
  Copy,
  ExternalLink,
  CheckCircle,
} from 'lucide-react';
import { Internship } from '@/types/internship';
import { toast } from 'sonner';
import { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { InternshipDetailsModal } from './InternshipDetailsModal';
import { formatStipend } from '@/utils';

// ─── Types ───────────────────────────────────────────────────────────────────

interface InternshipCardProps {
  internship: Internship;
  viewMode?: 'list' | 'grid';
}

// ─── Sub-components (imported from ui/CardElements for modularity) ────────────

import { Tooltip, Badge, CompanyAvatar, BookmarkButton, DetailItem, PostedLabel } from './ui/CardElements';

// ─── Main Component ──────────────────────────────────────────────────────────

export default function InternshipCard({ internship, viewMode = 'list' }: InternshipCardProps) {
  const [bookmarked, setBookmarked] = useState(false);
  const [applied, setApplied] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`bookmark_${internship.id}`);
    if (saved) setBookmarked(true);
    const hasApplied = localStorage.getItem(`applied_${internship.id}`);
    if (hasApplied) setApplied(true);
  }, [internship.id]);

  const handleBookmark = useCallback(() => {
    if (bookmarked) {
      localStorage.removeItem(`bookmark_${internship.id}`);
      setBookmarked(false);
      toast.info('Removed from saved internships');
    } else {
      localStorage.setItem(`bookmark_${internship.id}`, 'true');
      setBookmarked(true);
      toast.success('Saved to bookmarks');
    }
  }, [bookmarked, internship.id]);

  const handleApply = useCallback(() => {
    setApplied(true);
    localStorage.setItem(`applied_${internship.id}`, 'true');
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.7 } });
    toast.success(`Applied to ${internship.company_name} successfully`);

    // Add to applications hub
    const localSaved = localStorage.getItem('applications_list');
    let currentApps = [];
    if (localSaved) {
      try {
        currentApps = JSON.parse(localSaved);
      } catch { /* localStorage data was malformed — start fresh */ }
    }
    const newApp = {
      id: internship.id.toString(),
      title: internship.title,
      companyName: internship.company_name,
      location: internship.location_names?.join(', ') || 'Remote',
      stipend: formatStipend(internship.stipend),
      skills: internship.segment ? [internship.segment, internship.profile_name] : [internship.profile_name || 'General'],
      appliedDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: 'Applied',
      rounds: [
        { id: 'r1', name: 'Resume Screening', status: 'current' },
        { id: 'r2', name: 'Interview Round', status: 'upcoming' }
      ]
    };
    if (!currentApps.some((app: { id: string }) => app.id === newApp.id)) {
      currentApps.unshift(newApp);
      localStorage.setItem('applications_list', JSON.stringify(currentApps));
    }
  }, [internship]);

  const handleWithdraw = useCallback(() => {
    setApplied(false);
    localStorage.removeItem(`applied_${internship.id}`);
    toast.success(`Application withdrawn from ${internship.company_name}`);

    // Remove from applications hub
    const localSaved = localStorage.getItem('applications_list');
    if (localSaved) {
      try {
        const currentApps = JSON.parse(localSaved);
        const filtered = currentApps.filter((app: { id: string }) => app.id !== internship.id.toString());
        localStorage.setItem('applications_list', JSON.stringify(filtered));
      } catch { /* ignore */ }
    }
  }, [internship]);

  const handleShare = useCallback(async () => {
    const url = `https://internshala.com/internship/detail/${internship.url}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: internship.title, url });
      } catch {
        // user cancelled
      }
    } else {
      await navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard');
    }
  }, [internship]);

  const handleCopyLink = useCallback(async () => {
    const url = `https://internshala.com/internship/detail/${internship.url}`;
    await navigator.clipboard.writeText(url);
    toast.success('Link copied');
  }, [internship.url]);

  // ── Grid View ──────────────────────────────────────────────────────────────

  if (viewMode === 'grid') {
    return (
      <article className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col h-full overflow-hidden">
        <div className="p-4 flex-1">
          <div className="flex justify-between items-start mb-3">
            <CompanyAvatar name={internship.company_name} logo={internship.company_logo} size="sm" />
            <BookmarkButton bookmarked={bookmarked} onClick={handleBookmark} />
          </div>

          <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm line-clamp-2 mb-1">
            {internship.title}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{internship.company_name}</p>

          <div className="space-y-1.5 text-xs text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3 h-3 shrink-0 text-gray-400" />
              <span className="truncate">
                {internship.work_from_home ? 'Work From Home' : internship.location_names?.[0] || 'N/A'}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <IndianRupee className="w-3 h-3 shrink-0 text-gray-400" />
              <span className="font-semibold text-green-700 dark:text-green-400">
                {formatStipend(internship.stipend)}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3 h-3 shrink-0 text-gray-400" />
              <span>{internship.duration}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-3">
            {internship.is_ppo && (
              <Badge color="blue" tooltip="This internship may convert to a full-time job offer">
                {internship.ppo_label_value || 'With Job Offer'}
              </Badge>
            )}
            {internship.part_time && (
              <Badge color="purple" tooltip="Flexible, part-time working hours">Part-time</Badge>
            )}
            {internship.work_from_home && (
              <Badge color="green" tooltip="Work remotely from anywhere">Work From Home</Badge>
            )}
            {internship.is_international_job && (
              <Badge color="orange" tooltip="This is an international internship">International</Badge>
            )}
            {internship.segment === 'internship_for_women' && (
              <Badge color="pink" tooltip="This internship is open for women candidates">For Women</Badge>
            )}
          </div>
        </div>

        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-800 flex gap-2">
          <button
            onClick={() => setDetailsOpen(true)}
            className="flex-1 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 text-sm font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Details
          </button>
          <button
            onClick={handleApply}
            disabled={applied}
            aria-label={`Apply to ${internship.title} at ${internship.company_name}`}
            className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-green-600 text-white text-sm font-semibold rounded-lg transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
          >
            {applied ? (
              <>
                <CheckCircle className="w-4 h-4" /> Applied
              </>
            ) : (
              'Apply'
            )}
          </button>
          {applied && (
            <button
              onClick={handleWithdraw}
              className="py-2 px-3 bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-950/30 dark:text-red-400 dark:hover:bg-red-900/40 text-sm font-semibold rounded-lg transition-colors border border-red-200 dark:border-red-900/50 flex-shrink-0"
              aria-label={`Withdraw application from ${internship.title}`}
            >
              Withdraw
            </button>
          )}
        </div>
        <InternshipDetailsModal internship={internship} isOpen={detailsOpen} onClose={() => setDetailsOpen(false)} />
      </article>
    );
  }

  // ── List View (default) ────────────────────────────────────────────────────

  return (
    <article className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden">
      <div className="p-5">
        {/* Header Row */}
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 truncate hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-default">
              {internship.title}
            </h3>
            <div className="flex items-center gap-2 mt-0.5 flex-wrap">
              <p className="text-sm text-gray-500 dark:text-gray-400">{internship.company_name}</p>
              {internship.is_active && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1 animate-pulse" />
                  Actively hiring
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 ml-4 shrink-0">
            <BookmarkButton bookmarked={bookmarked} onClick={handleBookmark} />
            <CompanyAvatar name={internship.company_name} logo={internship.company_logo} size="md" />
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 mt-3">
          <MapPin className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">
            {internship.work_from_home ? 'Work From Home' : internship.location_names?.join(', ') || 'N/A'}
          </span>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <DetailItem icon={<PlayCircle className="w-3.5 h-3.5" />} label="Start Date" value={internship.start_date} />
          <DetailItem icon={<Calendar className="w-3.5 h-3.5" />} label="Duration" value={internship.duration} />
          <DetailItem
            icon={<IndianRupee className="w-3.5 h-3.5" />}
            label="Stipend"
            value={formatStipend(internship.stipend)}
            valueClass="text-green-700 dark:text-green-400"
          />
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mt-4">
          {internship.is_ppo && (
            <Badge color="blue" tooltip="This internship may convert to a full-time job offer">
              {internship.ppo_label_value || 'With Job Offer'}
            </Badge>
          )}
          {internship.part_time && (
            <Badge color="purple" tooltip="Flexible, part-time working hours">Part-time</Badge>
          )}
          {internship.work_from_home && (
            <Badge color="green" tooltip="Work remotely from anywhere">Work From Home</Badge>
          )}
          {internship.is_premium && (
            <Badge color="gray" tooltip="Verified premium employer">Premium</Badge>
          )}
          {internship.is_international_job && (
            <Badge color="orange" tooltip="This is an international internship">International</Badge>
          )}
          {internship.segment === 'internship_for_women' && (
            <Badge color="pink" tooltip="Open for women candidates">For Women</Badge>
          )}
        </div>

        {/* Office Days */}
        {internship.office_days && !internship.work_from_home && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            {internship.office_days}
          </p>
        )}

        {/* Skills / Labels */}
        {internship.labels_app_in_card && internship.labels_app_in_card.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {internship.labels_app_in_card.map((label) => (
              <span
                key={label}
                className="px-2.5 py-0.5 text-xs text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-full"
              >
                {label}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-5 py-3 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <PostedLabel label={internship.posted_by_label} type={internship.posted_by_label_type} />
          {internship.expiring_in && (
            <span className="text-xs text-orange-500 font-medium">{internship.expiring_in}</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Tooltip text="Copy link">
            <button
              onClick={handleCopyLink}
              aria-label="Copy internship link"
              className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
            >
              <Copy className="w-4 h-4" />
            </button>
          </Tooltip>
          <Tooltip text="Share">
            <button
              onClick={handleShare}
              aria-label="Share internship"
              className="p-1.5 text-gray-400 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </Tooltip>
          <button
            onClick={() => setDetailsOpen(true)}
            aria-label="View internship details"
            className="px-3 py-1.5 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 text-sm font-medium rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors flex items-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Details
          </button>
          <button
            onClick={handleApply}
            disabled={applied}
            aria-label={`Apply to ${internship.title}`}
            className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:bg-green-600 text-white text-sm font-semibold rounded-lg transition-all duration-200 active:scale-95 flex items-center gap-1.5 min-w-[90px] justify-center"
          >
            {applied ? (
              <>
                <CheckCircle className="w-3.5 h-3.5" /> Applied
              </>
            ) : (
              'Apply Now'
            )}
          </button>
          {applied && (
            <button
              onClick={handleWithdraw}
              className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-950/30 dark:text-red-400 dark:hover:bg-red-900/40 text-sm font-semibold rounded-lg transition-colors border border-red-200 dark:border-red-900/50"
              aria-label={`Withdraw application from ${internship.title}`}
            >
              Withdraw
            </button>
          )}
        </div>
      </div>
      <InternshipDetailsModal internship={internship} isOpen={detailsOpen} onClose={() => setDetailsOpen(false)} />
    </article>
  );
}

