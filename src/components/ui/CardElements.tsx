'use client';
import { Heart, Clock } from 'lucide-react';
import { useState } from 'react';

export function Tooltip({ text, children }: { text: string; children: React.ReactNode }) {
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

export function Badge({
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

export function CompanyAvatar({ name, logo, size }: { name: string; logo?: string; size: 'sm' | 'md' }) {
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

export function BookmarkButton({ bookmarked, onClick }: { bookmarked: boolean; onClick: () => void }) {
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

export function DetailItem({
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

export function PostedLabel({ label, type }: { label: string; type: string }) {
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
