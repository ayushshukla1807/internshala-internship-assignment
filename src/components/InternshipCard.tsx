'use client';
import { MapPin, PlayCircle, Calendar, IndianRupee, Clock, Heart, Share2, Copy, ExternalLink } from 'lucide-react';
import { Internship } from '@/types/internship';
import { toast } from 'sonner';
import { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';

interface InternshipCardProps {
  internship: Internship;
  viewMode?: 'list' | 'grid';
}

const Tooltip = ({ text, children }: { text: string; children: React.ReactNode }) => (
  <div className="relative group/tooltip inline-flex">
    {children}
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded whitespace-nowrap opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 z-50 pointer-events-none">
      {text}
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-700" />
    </div>
  </div>
);

export default function InternshipCard({ internship, viewMode = 'list' }: InternshipCardProps) {
  const [bookmarked, setBookmarked] = useState(false);
  const [isApplying, setIsApplying] = useState(false);

  // Load bookmark state from localStorage
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
      toast.success('Saved to your bookmarks! ❤️');
    }
  }, [bookmarked, internship.id]);

  const handleApply = useCallback(() => {
    setIsApplying(true);
    // Confetti burst!
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.7 },
      colors: ['#006BFF', '#00C48C', '#FFD600', '#FF6B6B', '#845EF7'],
    });
    toast.success(`🎉 Applied to ${internship.company_name}! All the best!`, {
      duration: 4000,
    });
    setTimeout(() => setIsApplying(false), 2000);
  }, [internship.company_name]);

  const handleShare = useCallback(async () => {
    const url = `https://internshala.com/internship/detail/${internship.url}`;
    const shareData = {
      title: `${internship.title} at ${internship.company_name}`,
      text: `Check out this internship: ${internship.title} at ${internship.company_name}. Stipend: ${internship.stipend?.salary}`,
      url,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // User cancelled
      }
    } else {
      await navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard!');
    }
  }, [internship]);

  const handleCopyLink = useCallback(async () => {
    const url = `https://internshala.com/internship/detail/${internship.url}`;
    await navigator.clipboard.writeText(url);
    toast.success('🔗 Link copied!');
  }, [internship.url]);

  const formatStipend = (stipend: Internship['stipend']) => {
    if (!stipend?.salaryValue1) return stipend?.salary || 'Unpaid';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(stipend.salaryValue1) + '/month';
  };

  if (viewMode === 'grid') {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex flex-col h-full overflow-hidden group">
        <div className="p-4 flex-1">
          <div className="flex justify-between items-start mb-3">
            <div className="w-10 h-10 flex-shrink-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 border border-blue-100 dark:border-blue-800 rounded-lg flex items-center justify-center">
              <span className="text-base font-bold text-blue-600 dark:text-blue-400">
                {internship.company_name.charAt(0)}
              </span>
            </div>
            <button
              onClick={handleBookmark}
              className={`p-1.5 rounded-full transition-all duration-200 ${bookmarked ? 'text-red-500 bg-red-50 dark:bg-red-900/20' : 'text-gray-400 hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20'}`}
            >
              <Heart className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
            </button>
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm line-clamp-2 mb-1">{internship.title}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{internship.company_name}</p>
          <div className="space-y-1.5 text-xs text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1"><MapPin className="w-3 h-3 shrink-0" /><span className="truncate">{internship.work_from_home ? 'Work From Home' : internship.location_names?.[0] || 'N/A'}</span></div>
            <div className="flex items-center gap-1"><IndianRupee className="w-3 h-3 shrink-0" /><span className="font-semibold text-green-600 dark:text-green-400">{formatStipend(internship.stipend)}</span></div>
            <div className="flex items-center gap-1"><Calendar className="w-3 h-3 shrink-0" /><span>{internship.duration}</span></div>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {internship.is_ppo && (
              <Tooltip text="Pre-Placement Offer - may convert to a full-time job!">
                <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 cursor-help">PPO</span>
              </Tooltip>
            )}
            {internship.part_time && (
              <Tooltip text="Part-time internship - flexible hours">
                <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 cursor-help">Part-time</span>
              </Tooltip>
            )}
            {internship.work_from_home && (
              <Tooltip text="Work from the comfort of your home!">
                <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 cursor-help">WFH</span>
              </Tooltip>
            )}
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-800">
          <button
            onClick={handleApply}
            disabled={isApplying}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-all duration-200 active:scale-95 disabled:opacity-70"
          >
            {isApplying ? '✓ Applied!' : 'Apply Now'}
          </button>
        </div>
      </div>
    );
  }

  // List View (default)
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden group">
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {internship.title}
              </h3>
              {internship.is_premium && (
                <Tooltip text="Premium listing – verified employer">
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 cursor-help tracking-wide">PREMIUM</span>
                </Tooltip>
              )}
            </div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">{internship.company_name}</p>
          </div>
          <div className="flex items-center gap-2 ml-4">
            <Tooltip text={bookmarked ? 'Remove bookmark' : 'Save internship'}>
              <button
                onClick={handleBookmark}
                className={`p-2 rounded-full transition-all duration-200 active:scale-90 ${bookmarked ? 'text-red-500 bg-red-50 dark:bg-red-900/20' : 'text-gray-400 hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20'}`}
              >
                <Heart className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
              </button>
            </Tooltip>
            <div className="w-12 h-12 flex-shrink-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 border border-gray-200 dark:border-gray-600 rounded-lg flex items-center justify-center">
              <span className="text-xl font-bold text-gray-500 dark:text-gray-300">
                {internship.company_name.charAt(0)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-start text-sm text-gray-600 dark:text-gray-400 mb-4">
          <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-gray-400" />
          <span className="line-clamp-1">
            {internship.work_from_home ? 'Work From Home' : internship.location_names?.join(', ') || 'N/A'}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="flex flex-col">
            <div className="flex items-center text-[10px] uppercase tracking-wider font-semibold text-gray-400 mb-1">
              <PlayCircle className="w-3 h-3 mr-1" /> Start
            </div>
            <span className="font-medium text-gray-800 dark:text-gray-200 text-sm">{internship.start_date}</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center text-[10px] uppercase tracking-wider font-semibold text-gray-400 mb-1">
              <Calendar className="w-3 h-3 mr-1" /> Duration
            </div>
            <span className="font-medium text-gray-800 dark:text-gray-200 text-sm">{internship.duration}</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center text-[10px] uppercase tracking-wider font-semibold text-gray-400 mb-1">
              <IndianRupee className="w-3 h-3 mr-1" /> Stipend
            </div>
            <span className="font-semibold text-green-600 dark:text-green-400 text-sm">{formatStipend(internship.stipend)}</span>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2 mt-4">
          {internship.is_ppo && (
            <Tooltip text="Pre-Placement Offer – may convert to a full-time job!">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 cursor-help">
                🏆 With Job Offer
              </span>
            </Tooltip>
          )}
          {internship.part_time && (
            <Tooltip text="Part-time internship – flexible working hours">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 cursor-help">
                ⏰ Part-time
              </span>
            </Tooltip>
          )}
          {internship.work_from_home && (
            <Tooltip text="You can work from the comfort of your home!">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 cursor-help">
                🏠 Work From Home
              </span>
            </Tooltip>
          )}
          {internship.labels_app && !internship.is_ppo && !internship.part_time && !internship.work_from_home && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400">
              {internship.labels_app}
            </span>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={`flex items-center text-xs font-medium px-2 py-1 rounded-full ${internship.posted_by_label_type === 'success' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-200/70 text-gray-500 dark:bg-gray-800 dark:text-gray-400'}`}>
            <Clock className="w-3 h-3 mr-1" />
            {internship.posted_by_label}
          </div>
          {internship.application_deadline && (
            <span className="text-xs text-orange-500 font-medium">⏳ {internship.expiring_in}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Tooltip text="Copy link">
            <button
              onClick={handleCopyLink}
              className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200 active:scale-90"
            >
              <Copy className="w-4 h-4" />
            </button>
          </Tooltip>
          <Tooltip text="Share internship">
            <button
              onClick={handleShare}
              className="p-2 text-gray-400 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-all duration-200 active:scale-90"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </Tooltip>
          <button
            onClick={() => toast.info(`Opening details for ${internship.title}`)}
            className="px-3 py-1.5 text-blue-600 dark:text-blue-400 border border-blue-300 dark:border-blue-700 text-sm font-medium rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 flex items-center gap-1.5 active:scale-95"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Details
          </button>
          <button
            onClick={handleApply}
            disabled={isApplying}
            className="px-5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-all duration-200 active:scale-95 disabled:opacity-70 min-w-[90px]"
          >
            {isApplying ? '✓ Applied!' : 'Apply Now'}
          </button>
        </div>
      </div>
    </div>
  );
}
