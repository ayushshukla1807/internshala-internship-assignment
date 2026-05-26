'use client';
import { Search, Menu, ChevronDown, Sun, Moon, Command } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { AuthModal } from './AuthModal';

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });

    const handleOpenAuth = () => {
      setAuthMode('login');
      setAuthModalOpen(true);
    };
    document.addEventListener('open-auth-modal', handleOpenAuth);

    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('open-auth-modal', handleOpenAuth);
    };
  }, []);

  const openCommandMenu = () => {
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true, bubbles: true }));
  };

  const handleOpenApplications = () => {
    document.dispatchEvent(new CustomEvent('open-applications-hub'));
  };

  return (
    <header
      role="banner"
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'glass shadow-md border-b border-white/20 dark:border-gray-700/50'
          : 'bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              className="p-2 -ml-2 mr-2 md:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <Link href="/" className="flex items-center flex-shrink-0" aria-label="Internshala Home">
              <span className="text-xl md:text-2xl font-bold tracking-tight text-blue-600 dark:text-blue-500">
                internshala
              </span>
            </Link>
          </div>

          {/* Nav Links (Desktop) */}
          <nav aria-label="Main navigation" className="hidden md:flex ml-8 space-x-6 items-center flex-1">
            {['Internships', 'Jobs', 'Courses'].map((item) => (
              <div key={item} className="relative group cursor-pointer">
                <div className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 py-2 transition-colors">
                  {item} <ChevronDown className="w-4 h-4 ml-1 transition-transform group-hover:rotate-180" />
                </div>
              </div>
            ))}
            <button
              onClick={handleOpenApplications}
              className="text-sm font-semibold text-gray-755 dark:text-gray-250 hover:text-blue-600 dark:hover:text-blue-400 py-2 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              My Applications
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
            </button>
          </nav>

          {/* Cmd+K Search Button */}
          <button
            onClick={openCommandMenu}
            aria-label="Open search (Ctrl+K)"
            className="hidden lg:flex items-center gap-2 flex-1 max-w-xs mr-4 px-3 py-1.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-400 hover:border-blue-400 hover:bg-white dark:hover:bg-gray-750 transition-all duration-200 group"
          >
            <Search className="h-4 w-4 group-hover:text-blue-500 transition-colors" />
            <span className="flex-1 text-left">Search internships...</span>
            <kbd className="flex items-center gap-0.5 text-[10px] text-gray-400 border border-gray-200 dark:border-gray-700 rounded px-1.5 py-0.5 font-mono">
              <Command className="w-2.5 h-2.5" />K
            </kbd>
          </button>

          {/* Right Buttons */}
          <div className="flex items-center space-x-2">
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            )}
            <button
              onClick={() => { setAuthMode('login'); setAuthModalOpen(true); }}
              aria-label="Login"
              className="hidden sm:block text-sm font-medium text-blue-600 border border-blue-600 rounded-lg px-4 py-1.5 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-blue-900/30 transition-colors"
            >
              Login
            </button>
            <button
              onClick={() => { setAuthMode('register'); setAuthModalOpen(true); }}
              aria-label="Sign up as candidate"
              className="text-sm font-medium text-white bg-blue-600 rounded-lg px-4 py-1.5 hover:bg-blue-700 transition-colors active:scale-95"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} defaultMode={authMode} />
    </header>
  );
}
