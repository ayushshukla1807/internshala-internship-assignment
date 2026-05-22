'use client';
import { Bookmark, MessageSquare, Bell, Search, Menu } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
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

          {/* Search Bar (Hidden on Mobile) */}
          <div className="hidden md:flex flex-1 max-w-lg ml-8 mr-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
                placeholder="Search for internships..."
              />
            </div>
          </div>

          {/* Right Navigation */}
          <div className="flex items-center space-x-1 sm:space-x-4">
            <button className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 hidden sm:block">
              <Bookmark className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 hidden sm:block">
              <MessageSquare className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 block w-2 h-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-900"></span>
            </button>
            
            {/* Avatar Profile */}
            <div className="ml-2 flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold border border-blue-200">
                A
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
