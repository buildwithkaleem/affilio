export const CardSkeleton = () => {
  return (
    <div className="flex justify-center mx-2 mt-4 animate-pulse">
      <div className="w-full max-w-md bg-white dark:bg-black/40 rounded-2xl p-4 shadow-md border border-gray-200 dark:border-gray-800">

        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-3"></div>

        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-2"></div>

        <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded-xl mt-4"></div>

      </div>
    </div>
  );
};