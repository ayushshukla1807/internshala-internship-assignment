'use client';
import { useState, useEffect } from 'react';
import { Heart, X, Trash2 } from 'lucide-react';
import { Internship } from '@/types/internship';
import { motion, AnimatePresence } from 'framer-motion';

interface SavedInternshipsDrawerProps {
  internships?: Internship[];
}

export function SavedInternshipsDrawer({ internships: propInternships }: SavedInternshipsDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [savedInternships, setSavedInternships] = useState<Internship[]>([]);
  const [localInternships, setLocalInternships] = useState<Internship[]>([]);

  useEffect(() => {
    if (propInternships) return;
    const fetchAll = async () => {
      try {
        const fallbackRes = await fetch('/fallback-internships.json');
        if (!fallbackRes.ok) throw new Error('Failed to load local json');
        const data = await fallbackRes.json();
        const parsed = data.internship_ids
          .map((id: number) => data.internships_meta[id.toString()])
          .filter(Boolean);
        setLocalInternships(parsed);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAll();
  }, [propInternships]);

  const loadSaved = () => {
    const savedIds = Object.keys(localStorage)
      .filter((key) => key.startsWith('bookmark_'))
      .map((key) => parseInt(key.replace('bookmark_', ''), 10));

    const sourceList = propInternships || localInternships;
    const matched = sourceList.filter((i) => savedIds.includes(i.id));
    setSavedInternships(matched);
  };

  useEffect(() => {
    if (isOpen) {
      loadSaved();
    }
  }, [isOpen, propInternships, localInternships]);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    document.addEventListener('open-saved-drawer', handleOpen);
    return () => document.removeEventListener('open-saved-drawer', handleOpen);
  }, []);

  const removeBookmark = (id: number) => {
    localStorage.removeItem(`bookmark_${id}`);
    setSavedInternships((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-6 p-3 bg-white dark:bg-gray-800 text-red-500 hover:text-red-600 rounded-full shadow-xl hover:shadow-2xl transition-all z-40 border border-gray-200 dark:border-gray-700"
        aria-label="View Saved Internships"
      >
        <Heart className="w-5 h-5 fill-current" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-sm bg-white dark:bg-gray-900 shadow-2xl z-50 flex flex-col border-l border-gray-200 dark:border-gray-800"
            >
              <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between bg-gray-50 dark:bg-gray-800/50">
                <h2 className="text-lg font-bold flex items-center gap-2 text-gray-900 dark:text-white">
                  <Heart className="w-5 h-5 text-red-500 fill-current" />
                  Saved Internships
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {savedInternships.length === 0 ? (
                  <div className="text-center text-gray-500 dark:text-gray-400 mt-10">
                    <Heart className="w-12 h-12 mx-auto mb-4 opacity-20" />
                    <p>No saved internships yet.</p>
                  </div>
                ) : (
                  savedInternships.map((internship) => (
                    <div
                      key={internship.id}
                      className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 relative group"
                    >
                      <button
                        onClick={() => removeBookmark(internship.id)}
                        className="absolute top-2 right-2 p-1.5 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all rounded-md hover:bg-red-50 dark:hover:bg-red-900/20"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <h3 className="font-semibold text-gray-900 dark:text-white pr-8 truncate">
                        {internship.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 truncate">
                        {internship.company_name}
                      </p>
                      <a
                        href={`https://internshala.com/internship/detail/${internship.url}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        View Details &rarr;
                      </a>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
