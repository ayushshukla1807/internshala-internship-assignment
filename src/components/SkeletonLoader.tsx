export default function SkeletonLoader() {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-5 mb-4 shadow-sm relative overflow-hidden">
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-gray-100 dark:via-gray-800 to-transparent z-10" />
      <div className="flex justify-between items-start mb-4">
        <div className="space-y-3 flex-1">
          <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4"></div>
        </div>
        <div className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded"></div>
      </div>
      <div className="flex items-center space-x-2 text-sm mb-4">
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-20"></div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-16"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-20"></div>
        </div>
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-16"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-20"></div>
        </div>
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-16"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-20"></div>
        </div>
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-16"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-20"></div>
        </div>
      </div>
      <div className="flex items-center space-x-2 mb-4">
        <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded-full w-24"></div>
        <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded-full w-24"></div>
      </div>
      <div className="border-t border-gray-100 dark:border-gray-800 pt-4 mt-2 flex justify-end">
        <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-24 mr-3"></div>
        <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-24"></div>
      </div>
    </div>
  );
}
