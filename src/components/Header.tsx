'use client';
import { Bookmark, MessageSquare, Bell, Search, Menu, ChevronDown, Sun, Moon } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm dark:bg-gray-900 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Mobile Menu */}
          <div className="flex items-center">
            <button className="p-2 -ml-2 mr-2 md:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              <Menu className="w-6 h-6" />
            </button>
            <Link href="/" className="flex items-center flex-shrink-0">
              <span className="text-xl md:text-2xl font-bold tracking-tight text-blue-600 dark:text-blue-500">
                Internshala
              </span>
            </Link>
          </div>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden md:flex ml-8 space-x-6 items-center flex-1">
            <div className="relative group cursor-pointer">
              <div className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 py-2">
                Internships <ChevronDown className="w-4 h-4 ml-1" />
              </div>
            </div>
            <div className="relative group cursor-pointer">
              <div className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 py-2">
                Jobs <ChevronDown className="w-4 h-4 ml-1" />
              </div>
            </div>
            <div className="relative group cursor-pointer">
              <div className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 py-2">
                Courses <ChevronDown className="w-4 h-4 ml-1" />
              </div>
            </div>
          </nav>

          {/* Search Bar (Hidden on Mobile) */}
          <div className="hidden lg:flex flex-1 max-w-xs mr-6">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-9 pr-3 py-1.5 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
                placeholder="Search..."
              />
            </div>
          </div>

          {/* Right Authentication & Theme Buttons */}
          <div className="flex items-center space-x-3">
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle Dark Mode"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            )}
            
            <button className="hidden sm:block text-sm font-medium text-blue-600 border border-blue-600 rounded px-4 py-1.5 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-blue-900/30 transition-colors">
              Login
            </button>
            <button className="text-sm font-medium text-white bg-blue-600 border border-transparent rounded px-4 py-1.5 hover:bg-blue-700 transition-colors">
              Candidate Sign-up
            </button>
            <button className="hidden md:block text-sm font-medium text-white bg-gray-800 border border-transparent rounded px-4 py-1.5 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors">
              Employer Sign-up
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
