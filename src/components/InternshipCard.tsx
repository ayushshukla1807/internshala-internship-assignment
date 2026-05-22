'use client';
import { MapPin, Briefcase, PlayCircle, Calendar, IndianRupee, Clock } from 'lucide-react';
import { Internship } from '@/types/internship';

export default function InternshipCard({ internship }: { internship: Internship }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200 overflow-hidden mb-4">
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 line-clamp-1">
                {internship.title}
              </h3>
            </div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
              {internship.company_name}
            </p>
          </div>
          <div className="w-12 h-12 flex-shrink-0 bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-md p-1 ml-4 flex items-center justify-center">
            {/* Placeholder for company logo as API returns hashes instead of absolute URLs sometimes */}
            <span className="text-xl font-bold text-gray-400">
              {internship.company_name.charAt(0)}
            </span>
          </div>
        </div>

        <div className="mt-2 mb-4">
          <div className="flex items-start text-sm text-gray-600 dark:text-gray-400 mb-2">
            <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
            <span className="line-clamp-1">
              {internship.work_from_home 
                ? 'Work From Home' 
                : internship.location_names.join(', ')}
            </span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex flex-col">
              <div className="flex items-center text-xs uppercase tracking-wide font-medium text-gray-500 mb-1">
                <PlayCircle className="w-3.5 h-3.5 mr-1" />
                Start Date
              </div>
              <span className="font-medium text-gray-800 dark:text-gray-200">{internship.start_date}</span>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center text-xs uppercase tracking-wide font-medium text-gray-500 mb-1">
                <Calendar className="w-3.5 h-3.5 mr-1" />
                Duration
              </div>
              <span className="font-medium text-gray-800 dark:text-gray-200">{internship.duration}</span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center text-xs uppercase tracking-wide font-medium text-gray-500 mb-1">
                <IndianRupee className="w-3.5 h-3.5 mr-1" />
                Stipend
              </div>
              <span className="font-medium text-gray-800 dark:text-gray-200">{internship.stipend.salary}</span>
            </div>
          </div>
        </div>

        {/* Labels & Tags */}
        <div className="flex flex-wrap items-center gap-2 mt-4">
          {internship.labels_app && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
              {internship.labels_app}
            </span>
          )}
          {internship.is_ppo && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
              {internship.ppo_label_value || 'With PPO'}
            </span>
          )}
          {internship.is_premium && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
              Premium
            </span>
          )}
        </div>
      </div>
      
      {/* Footer */}
      <div className="px-5 py-3 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
        <div className="flex items-center text-xs font-medium text-gray-500 bg-gray-200/50 dark:bg-gray-800 px-2 py-1 rounded">
          <Clock className="w-3 h-3 mr-1" />
          {internship.posted_by_label}
        </div>
        <div className="flex gap-3">
          <button className="text-blue-600 dark:text-blue-400 text-sm font-semibold hover:text-blue-800 dark:hover:text-blue-300">
            View details
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md text-sm font-semibold transition-colors">
            Apply now
          </button>
        </div>
      </div>
    </div>
  );
}
