'use client';
import { Sparkles, TrendingUp, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';

const STATS = [
  { icon: <TrendingUp className="w-4 h-4" />, value: '7,100+', label: 'Live Internships' },
  { icon: <Building2 className="w-4 h-4" />, value: '3,200+', label: 'Companies Hiring' },
  { icon: <Sparkles className="w-4 h-4" />, value: '₹50K+', label: 'Top Stipend / Month' },
];

export default function HeroBanner() {
  return (
    <section
      aria-label="Hero banner"
      className="bg-gradient-to-b from-blue-50/60 to-transparent dark:from-blue-950/20 border-b border-gray-100 dark:border-gray-800/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-3 leading-tight">
              Find your{' '}
              <span className="text-blue-600 dark:text-blue-400">perfect internship</span>
              {' '}in India
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-base md:text-lg mb-8">
              Discover paid summer internships 2026 — apply in one click and get hired.
            </p>
          </motion.div>

          {/* Animated stat pills */}
          <motion.div
            className="flex flex-wrap justify-center gap-3"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
          >
            {STATS.map(({ icon, value, label }) => (
              <div
                key={label}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                <span className="text-blue-500">{icon}</span>
                <span className="font-bold text-gray-900 dark:text-white">{value}</span>
                <span className="text-gray-400">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
