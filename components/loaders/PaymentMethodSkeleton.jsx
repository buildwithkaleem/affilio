export const PaymentMethodSkeleton = () => {
  return (
    <div className="flex justify-center mt-4 px-2 animate-pulse">
      <div className="w-full  max-w-md min-h-[214px] bg-white dark:bg-black/40 rounded-2xl p-4 shadow-md border border-gray-200 dark:border-gray-800">

        {/* Title */}
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-4"></div>

        {/* Method Row */}
        <div className="flex justify-between mb-3">
          <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>

        {/* Name Row */}
        <div className="flex justify-between mb-3">
          <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-28 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>

        {/* Account Row */}
        <div className="flex justify-between mb-4">
          <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>

        {/* Button */}
        <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded-xl"></div>

      </div>
    </div>
  );
};