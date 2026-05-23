'use client';
import { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { Search } from 'lucide-react';

export default function CommandMenu() {
  const [open, setOpen] = useState(false);

  // Toggle the menu when ⌘K is pressed
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <Command.Dialog 
      open={open} 
      onOpenChange={setOpen}
      label="Global Command Menu"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity"
    >
      <div className="bg-white dark:bg-gray-900 w-full max-w-xl rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col">
        <div className="flex items-center border-b border-gray-200 dark:border-gray-800 px-4 py-3">
          <Search className="w-5 h-5 text-gray-400 mr-3 shrink-0" />
          <Command.Input 
            autoFocus
            placeholder="Search internships, companies, or locations..." 
            className="flex-1 bg-transparent border-none outline-none text-gray-900 dark:text-gray-100 placeholder:text-gray-500 w-full text-lg"
          />
        </div>
        <Command.List className="max-h-[60vh] overflow-y-auto p-2">
          <Command.Empty className="py-6 text-center text-gray-500">No results found.</Command.Empty>

          <Command.Group heading="Quick Actions" className="px-2 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            <Command.Item 
              onSelect={() => { setOpen(false); window.scrollTo({top: 0, behavior: 'smooth'}); }}
              className="flex items-center px-3 py-2 mt-1 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 aria-selected:bg-gray-100 dark:aria-selected:bg-gray-800 transition-colors text-sm text-gray-900 dark:text-gray-100"
            >
              Back to top
            </Command.Item>
            <Command.Item 
              onSelect={() => { setOpen(false); }}
              className="flex items-center px-3 py-2 mt-1 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 aria-selected:bg-gray-100 dark:aria-selected:bg-gray-800 transition-colors text-sm text-gray-900 dark:text-gray-100"
            >
              Close search
            </Command.Item>
          </Command.Group>

          <Command.Group heading="Top Profiles" className="px-2 py-2 mt-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider border-t border-gray-100 dark:border-gray-800">
            <Command.Item 
              onSelect={() => { setOpen(false); /* Normally would trigger filter */ }}
              className="flex items-center px-3 py-2 mt-1 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 aria-selected:bg-gray-100 dark:aria-selected:bg-gray-800 transition-colors text-sm text-gray-900 dark:text-gray-100"
            >
              Software Engineering
            </Command.Item>
            <Command.Item 
              onSelect={() => { setOpen(false); }}
              className="flex items-center px-3 py-2 mt-1 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 aria-selected:bg-gray-100 dark:aria-selected:bg-gray-800 transition-colors text-sm text-gray-900 dark:text-gray-100"
            >
              Data Science
            </Command.Item>
            <Command.Item 
              onSelect={() => { setOpen(false); }}
              className="flex items-center px-3 py-2 mt-1 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 aria-selected:bg-gray-100 dark:aria-selected:bg-gray-800 transition-colors text-sm text-gray-900 dark:text-gray-100"
            >
              Marketing
            </Command.Item>
          </Command.Group>
        </Command.List>
      </div>
    </Command.Dialog>
  );
}
