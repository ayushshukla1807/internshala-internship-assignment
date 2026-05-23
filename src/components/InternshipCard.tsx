'use client';
import {
  MapPin,
  PlayCircle,
  Calendar,
  IndianRupee,
  Clock,
  Heart,
  Share2,
  Copy,
  ExternalLink,
  CheckCircle,
} from 'lucide-react';
import { Internship } from '@/types/internship';
import { toast } from 'sonner';
import { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';

// ─── Types ───────────────────────────────────────────────────────────────────

interface InternshipCardProps {
  internship: Internship;
  viewMode?: 'list' | 'grid';
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function Tooltip({ text, children }: { text: string; children: React.ReactNode }) {
  return (
    <div className="relative group/tooltip inline-flex">
      {children}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 bg-gray-800 dark:bg-gray-700 text-white text-xs rounded-md whitespace-nowrap opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 z-50 pointer-events-none shadow-lg">
        {text}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800 dark:border-t-gray-700" />
      </div>
    </div>
  );
}

function Badge({
  children,
  color = 'gray',
  tooltip,
}: {
  children: React.ReactNode;
  color?: 'blue' | 'green' | 'purple' | 'gray' | 'orange' | 'pink';
  tooltip?: string;
}) {
  const colorMap = {
    blue: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    green: 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    purple: 'bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
    gray: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400',
    orange: 'bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
    pink: 'bg-pink-50 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300',
  };

  const badge = (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorMap[color]}`}>
      {children}
    </span>
  );

  return tooltip ? <Tooltip text={tooltip}>{badge}</Tooltip> : badge;
}

// ─── Utilities ───────────────────────────────────────────────────────────────

function formatStipend(stipend: Internship['stipend']): string {
  if (!stipend?.salaryValue1) return stipend?.salary || 'Unpaid';
  return (
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(stipend.salaryValue1) + '/month'
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function InternshipCard({ internship, viewMode = 'list' }: InternshipCardProps) {
  const [bookmarked, setBookmarked] = useState(false);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`bookmark_${internship.id}`);
    if (saved) setBookmarked(true);
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
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.7 } });
    toast.success(`Applied to ${internship.company_name} successfully`);
    setTimeout(() => setApplied(false), 3000);
  }, [internship.company_name]);

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

        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-800">
          <button
            onClick={handleApply}
            disabled={applied}
            aria-label={`Apply to ${internship.title} at ${internship.company_name}`}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-green-600 text-white text-sm font-semibold rounded-lg transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
          >
            {applied ? (
              <>
                <CheckCircle className="w-4 h-4" /> Applied
              </>
            ) : (
              'Apply Now'
            )}
          </button>
        </div>
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
            onClick={() => toast.info(`Opening details for ${internship.title}`)}
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
        </div>
      </div>
    </article>
  );
}

// ─── Shared Micro-components (keep components small and focused) ──────────────

/**
 * Displays the company logo from Internshala's CDN.
 * Falls back to a generated letter avatar if the logo URL is empty or broken.
 */
function CompanyAvatar({ name, logo, size }: { name: string; logo?: string; size: 'sm' | 'md' }) {
  const [imgError, setImgError] = useState(false);
  const sizeClass = size === 'md' ? 'w-11 h-11 text-base' : 'w-9 h-9 text-sm';
  const cdnUrl = logo ? `https://internshala.com/static/images/company_logos/${logo}` : null;

  if (cdnUrl && !imgError) {
    return (
      <div className={`${sizeClass} shrink-0 rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden bg-white`}>
        <img
          src={cdnUrl}
          alt={`${name} logo`}
          className="w-full h-full object-contain"
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  return (
    <div
      className={`${sizeClass} shrink-0 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg flex items-center justify-center font-bold text-gray-500 dark:text-gray-300`}
    >
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

function BookmarkButton({ bookmarked, onClick }: { bookmarked: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={bookmarked ? 'Remove bookmark' : 'Save internship'}
      aria-pressed={bookmarked}
      className={`p-1.5 rounded-full transition-all duration-200 active:scale-90 ${
        bookmarked
          ? 'text-red-500 bg-red-50 dark:bg-red-900/20'
          : 'text-gray-400 hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20'
      }`}
    >
      <Heart className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
    </button>
  );
}

function DetailItem({
  icon,
  label,
  value,
  valueClass = 'text-gray-800 dark:text-gray-200',
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <div className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
        {icon}
        {label}
      </div>
      <span className={`text-sm font-medium ${valueClass}`}>{value}</span>
    </div>
  );
}

function PostedLabel({ label, type }: { label: string; type: string }) {
  const isRecent = type === 'success';
  return (
    <div
      className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
        isRecent
          ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400'
          : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
      }`}
    >
      <Clock className="w-3 h-3" />
      {label}
    </div>
  );
}
