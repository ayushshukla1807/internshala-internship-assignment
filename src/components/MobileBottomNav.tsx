'use client';
import { Home, Briefcase, Heart, FileText, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MobileBottomNav() {
  const pathname = usePathname();

  const handleOpenSaved = (e: React.MouseEvent) => {
    e.preventDefault();
    document.dispatchEvent(new CustomEvent('open-saved-drawer'));
  };

  const handleOpenApplications = (e: React.MouseEvent) => {
    e.preventDefault();
    document.dispatchEvent(new CustomEvent('open-applications-hub'));
  };

  const handleOpenAuth = (e: React.MouseEvent) => {
    e.preventDefault();
    // Dispatch click to login button in desktop or dispatch open event
    document.dispatchEvent(new CustomEvent('open-auth-modal'));
  };

  const navItems = [
    { name: 'Home', icon: Home, href: '/' },
    { name: 'Internships', icon: Briefcase, href: '/' },
    { name: 'Saved', icon: Heart, href: '#saved', onClick: handleOpenSaved },
    { name: 'Applications', icon: FileText, href: '#applications', onClick: handleOpenApplications },
    { name: 'Profile', icon: User, href: '#profile', onClick: handleOpenAuth },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-40 pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = !item.onClick && (pathname === item.href || (item.name === 'Internships' && pathname === '/'));
          
          if (item.onClick) {
            return (
              <button
                key={item.name}
                onClick={item.onClick}
                className="flex flex-col items-center justify-center w-full h-full space-y-1 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-250 cursor-pointer"
              >
                <Icon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <span className="text-[10px] font-medium">{item.name}</span>
              </button>
            );
          }

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
                isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'fill-blue-100 dark:fill-blue-900/30' : ''}`} />
              <span className="text-[10px] font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
