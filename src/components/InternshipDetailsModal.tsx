'use client';
import { Internship } from '@/types/internship';
import { X, MapPin, IndianRupee, Calendar, PlayCircle, Building2, Users, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CompanyAvatar, Badge } from './ui/CardElements';

export function InternshipDetailsModal({
  internship,
  isOpen,
  onClose,
}: {
  internship: Internship | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen || !internship) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex justify-end">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-2xl h-full bg-white dark:bg-gray-900 shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-4 md:p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-10">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white truncate pr-4">
              {internship.title}
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Body */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-8">
            
            {/* Title & Company */}
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {internship.title}
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">
                  {internship.company_name}
                </p>
              </div>
              <CompanyAvatar name={internship.company_name} logo={internship.company_logo} size="md" />
            </div>

            {/* Core Details Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-800">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider">
                  <PlayCircle className="w-4 h-4" /> Start Date
                </div>
                <p className="font-medium text-gray-900 dark:text-gray-200 text-sm">
                  {internship.start_date}
                </p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider">
                  <Calendar className="w-4 h-4" /> Duration
                </div>
                <p className="font-medium text-gray-900 dark:text-gray-200 text-sm">
                  {internship.duration}
                </p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider">
                  <IndianRupee className="w-4 h-4" /> Stipend
                </div>
                <p className="font-medium text-green-700 dark:text-green-400 text-sm">
                  {internship.stipend?.salary || 'Unpaid'}
                </p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider">
                  <MapPin className="w-4 h-4" /> Location
                </div>
                <p className="font-medium text-gray-900 dark:text-gray-200 text-sm truncate">
                  {internship.work_from_home ? 'Work From Home' : internship.location_names?.[0] || 'N/A'}
                </p>
              </div>
            </div>

            <hr className="border-gray-100 dark:border-gray-800" />

            {/* About Company */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-500" /> About {internship.company_name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {internship.company_name} is a leading organization in the industry, focused on delivering high-quality solutions and fostering innovation. We are committed to growth, technology, and building a sustainable future.
              </p>
            </div>

            {/* About Internship */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">About the internship</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Selected intern's day-to-day responsibilities include:
              </p>
              <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-400 space-y-1.5">
                <li>Working closely with the core team to build and maintain features.</li>
                <li>Participating in daily stand-ups and contributing to architecture discussions.</li>
                <li>Writing clean, maintainable, and well-documented code.</li>
                <li>Debugging and troubleshooting issues across the stack.</li>
              </ul>
            </div>

            {/* Skills Required */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Skill(s) required</h3>
              <div className="flex flex-wrap gap-2">
                {internship.labels_app_in_card && internship.labels_app_in_card.length > 0 ? (
                  internship.labels_app_in_card.map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-full text-sm font-medium border border-blue-100 dark:border-blue-800">
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-gray-500">Relevant skills for {internship.profile_name}</span>
                )}
              </div>
            </div>

            {/* Who can apply */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-500" /> Who can apply
              </h3>
              <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-400 space-y-1.5">
                <li>Are available for full time (in-office/remote) internship.</li>
                <li>Can start the internship between {internship.start_date}.</li>
                <li>Are available for duration of {internship.duration}.</li>
                <li>Have relevant skills and interests.</li>
              </ul>
            </div>

            {/* Badges / Extra info */}
            <div className="flex flex-wrap gap-2 mt-4">
              {internship.is_ppo && (
                <Badge color="blue">Probationary Offer Available</Badge>
              )}
              {internship.part_time && (
                <Badge color="purple">Part-time allowed</Badge>
              )}
            </div>

          </div>

          {/* Footer CTA */}
          <div className="p-4 md:p-6 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 sticky bottom-0 z-10 flex gap-4">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                alert('Applied successfully!');
                onClose();
              }}
              className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors active:scale-[0.98]"
            >
              <Send className="w-4 h-4" /> Apply Now
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
