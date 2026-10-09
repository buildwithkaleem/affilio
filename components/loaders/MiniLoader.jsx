export const MiniLoader = ({color}) => {
  return (
    <div className="flex items-center gap-2">
      <div className="w-4 h-4 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      <span className="text-sm">Loading...</span>
    </div>
  );
};



// export const MiniLoader = () => {
//   return (
//     <div className="flex items-center gap-2">
//       <div className="w-4 h-4 rounded-full animate-spin bg-gradient-to-r from-green-400 to-green-700 p-[2px]">
//         <div className="w-full h-full bg-white dark:bg-black rounded-full"></div>
//       </div>
//       <span className="text-sm bg-gradient-to-r from-green-400 to-green-700 bg-clip-text text-transparent">
//         Loading...
//       </span>
//     </div>
//   );
// };