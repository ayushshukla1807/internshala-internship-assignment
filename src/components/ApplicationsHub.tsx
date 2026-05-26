'use client';
import { useState, useEffect } from 'react';
import { X, CheckCircle, Clock, Calendar, AlertCircle, Play, Sparkles, User, FileText, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

export interface Application {
  id: string;
  title: string;
  companyName: string;
  location: string;
  stipend: string;
  skills: string[];
  appliedDate: string;
  status: 'In Process' | 'Selected' | 'Rejected' | 'Applied';
  approvedDate?: string;
  feedback?: string;
  currentRound?: {
    name: string;
    date: string;
    time: string;
    duration: string;
    feedback: string;
    requiresAction: boolean;
    userAttending?: 'yes' | 'no' | null;
  };
  rounds: {
    id: string;
    name: string;
    status: 'completed' | 'current' | 'upcoming';
    date?: string;
  }[];
}

const PRE_POPULATED_APPLICATION: Application = {
  id: 'internshala-sde-assignment',
  title: 'Software Development Intern',
  companyName: 'InternShala',
  location: 'Gurugram, India',
  stipend: '₹ 18,000 /month',
  skills: ['Python', 'CSS', 'React', 'PHP', 'Java'],
  appliedDate: '21 May 2026',
  approvedDate: '21 May 2026',
  status: 'In Process',
  feedback: 'Your profile has cleared our review and is with the company for shortlisting.',
  currentRound: {
    name: 'R2: Technical Round (Assignment)',
    date: '26 May 2026',
    time: '10:00 am',
    duration: '30 mins',
    feedback: 'Assignment details shared with students. They need to complete it by 26th May, 2026',
    requiresAction: true,
    userAttending: null,
  },
  rounds: [
    { id: 'r1', name: 'R1: Introductory Round / Screening', status: 'completed', date: '21 May 2026' },
    { id: 'r2', name: 'R2: Technical Round (Assignment)', status: 'current', date: '26 May 2026' },
    { id: 'r3', name: 'R3: HR Round', status: 'upcoming' },
  ],
};

export function ApplicationsHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    document.addEventListener('open-applications-hub', handleOpen);
    return () => document.removeEventListener('open-applications-hub', handleOpen);
  }, []);

  useEffect(() => {
    if (isOpen) {
      // Load existing applications, or initialize with the pre-populated one
      const localSaved = localStorage.getItem('applications_list');
      if (localSaved) {
        try {
          const parsed = JSON.parse(localSaved);
          // Ensure the pre-populated SDE one is always present
          if (!parsed.some((app: Application) => app.id === PRE_POPULATED_APPLICATION.id)) {
            parsed.unshift(PRE_POPULATED_APPLICATION);
          }
          setApplications(parsed);
        } catch (e) {
          setApplications([PRE_POPULATED_APPLICATION]);
        }
      } else {
        setApplications([PRE_POPULATED_APPLICATION]);
        localStorage.setItem('applications_list', JSON.stringify([PRE_POPULATED_APPLICATION]));
      }
    }
  }, [isOpen]);

  const handleAttendingResponse = (appId: string, response: 'yes' | 'no') => {
    const updated = applications.map((app) => {
      if (app.id === appId && app.currentRound) {
        const updatedRound = { ...app.currentRound, userAttending: response };
        return { ...app, currentRound: updatedRound };
      }
      return app;
    });
    setApplications(updated);
    localStorage.setItem('applications_list', JSON.stringify(updated));
    toast.success(
      response === 'yes'
        ? 'Attendance confirmed! Good luck with the round.'
        : 'Response submitted. We will notify the recruiter.'
    );
  };

  const onClose = () => setIsOpen(false);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Drawer Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-xl bg-white dark:bg-gray-950 h-full shadow-2xl flex flex-col z-50 overflow-hidden"
        >
          {/* Header */}
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-500 animate-pulse" />
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  Applications & Interview Hub
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">Track and manage your recruiting rounds</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-gray-150 dark:hover:bg-gray-800 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List of Applications */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {applications.length === 0 ? (
              <div className="text-center py-12">
                <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-600 dark:text-gray-400 font-medium">No active applications yet.</p>
                <p className="text-sm text-gray-400 mt-1">Apply to internships to track them here.</p>
              </div>
            ) : (
              applications.map((app) => (
                <div
                  key={app.id}
                  className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Card Title Header */}
                  <div className="p-5 border-b border-gray-150 dark:border-gray-850 bg-gradient-to-r from-blue-50/30 to-indigo-50/20 dark:from-blue-950/10 dark:to-indigo-950/10">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                          {app.status}
                        </span>
                        <h3 className="text-base font-bold text-gray-900 dark:text-white mt-2">{app.title}</h3>
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">{app.companyName}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{app.location}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-400">Stipend</p>
                        <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{app.stipend}</p>
                      </div>
                    </div>

                    {/* Skill Badges */}
                    <div className="flex flex-wrap gap-1.5 mt-3.5">
                      {app.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 text-[11px] font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Details and Activity Section */}
                  <div className="p-5 space-y-4">
                    {/* Feedback Alert */}
                    {app.feedback && (
                      <div className="flex gap-2.5 bg-blue-50/50 dark:bg-blue-950/20 p-3 rounded-xl border border-blue-100/50 dark:border-blue-900/30">
                        <AlertCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs font-bold text-blue-800 dark:text-blue-300">Recruiter Feedback</p>
                          <p className="text-xs text-blue-700 dark:text-blue-400 mt-0.5">{app.feedback}</p>
                        </div>
                      </div>
                    )}

                    {/* Active Action Round Card */}
                    {app.currentRound && (
                      <div className="bg-amber-50/40 dark:bg-amber-950/10 border border-amber-200/50 dark:border-amber-900/30 p-4 rounded-xl space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 dark:text-amber-400">
                            <Clock className="w-3.5 h-3.5 animate-spin-slow" />
                            Next Round: {app.currentRound.name}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {app.currentRound.duration}
                          </span>
                        </div>

                        <div className="flex gap-2.5 text-xs">
                          <Calendar className="w-4 h-4 text-gray-400 mt-0.5" />
                          <div>
                            <span className="font-semibold text-gray-800 dark:text-gray-200">
                              {app.currentRound.date} at {app.currentRound.time}
                            </span>
                            <p className="text-gray-500 dark:text-gray-400 mt-1">{app.currentRound.feedback}</p>
                          </div>
                        </div>

                        {app.currentRound.requiresAction && (
                          <div className="pt-2 border-t border-amber-200/30 dark:border-amber-900/20 flex items-center justify-between gap-4 flex-wrap">
                            <span className="text-[11px] font-semibold text-gray-600 dark:text-gray-400">
                              Will you attend this round?
                            </span>
                            <div className="flex gap-2">
                              {app.currentRound.userAttending === null ? (
                                <>
                                  <button
                                    onClick={() => handleAttendingResponse(app.id, 'yes')}
                                    className="px-3.5 py-1 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold rounded-lg transition-colors"
                                  >
                                    Yes
                                  </button>
                                  <button
                                    onClick={() => handleAttendingResponse(app.id, 'no')}
                                    className="px-3.5 py-1 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-350 text-xs font-semibold rounded-lg transition-colors"
                                  >
                                    No
                                  </button>
                                </>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-600 dark:text-green-400">
                                  <CheckCircle className="w-3.5 h-3.5" />
                                  {app.currentRound.userAttending === 'yes' ? 'Confirmed Attending' : 'Declined'}
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Hiring Timeline Process */}
                    <div>
                      <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                        Recruiting Pipeline
                      </h4>
                      <div className="relative pl-6 space-y-4">
                        {/* vertical line */}
                        <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-gray-200 dark:bg-gray-800" />

                        {app.rounds.map((round) => {
                          const isDone = round.status === 'completed';
                          const isCurrent = round.status === 'current';

                          return (
                            <div key={round.id} className="relative flex gap-3 text-xs">
                              {/* status indicator dot */}
                              <div
                                className={`absolute -left-[20px] w-2.5 h-2.5 rounded-full border-2 ${
                                  isDone
                                    ? 'bg-blue-600 border-blue-600'
                                    : isCurrent
                                    ? 'bg-white border-amber-500 dark:bg-gray-950 scale-125 shadow-sm'
                                    : 'bg-white border-gray-300 dark:border-gray-700 dark:bg-gray-950'
                                }`}
                              />
                              <div className="flex-1 flex justify-between">
                                <span
                                  className={`${
                                    isDone
                                      ? 'text-gray-500 dark:text-gray-400 line-through'
                                      : isCurrent
                                      ? 'font-semibold text-gray-900 dark:text-white'
                                      : 'text-gray-400 dark:text-gray-600'
                                  }`}
                                >
                                  {round.name}
                                </span>
                                {round.date && (
                                  <span className="text-[10px] text-gray-400">{round.date}</span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
