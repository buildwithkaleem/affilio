export const WithdrawalSkeleton = () => {
  return (
    <div className="flex justify-center mt-5 px-2 animate-pulse">
      <div className="w-full max-w-md bg-white dark:bg-black/40 p-4 rounded-2xl border shadow-md">

        {/* Title */}
        <div className="h-5 w-40 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>

        {/* Payment Method Box */}
        <div className="mb-4 p-3 rounded-xl bg-gray-100 dark:bg-gray-800">
          <div className="flex justify-between mb-2">
            <div className="h-3 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="h-3 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
          </div>
          <div className="flex justify-between mb-2">
            <div className="h-3 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="h-3 w-28 bg-gray-300 dark:bg-gray-700 rounded"></div>
          </div>
          <div className="flex justify-between">
            <div className="h-3 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="h-3 w-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
          </div>
        </div>

        {/* Input */}
        <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded-xl mb-4"></div>

        {/* Button */}
        <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded-xl"></div>

      </div>
    </div>
  );
};