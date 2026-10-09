// export const DotsLoader = () => {
//   return (
//     <div className="flex gap-1 justify-center mt-2">
//       <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></span>
//       <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce delay-150"></span>
//       <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce delay-300"></span>
//     </div>
//   );
// };





// export const DotsLoader = () => {
//   return (
//     <div className="flex justify-center items-center gap-2 mt-2">
//       {[0, 1, 2].map((i) => (
//         <span
//           key={i}
//           className="w-2 h-2 rounded-full animate-bounce"
//           style={{
//             background: "linear-gradient(40deg,#4ade80,#166524",
//             boxShadow: "0 0 8px rgba(34,197,94,0.6)",
//             animationDelay: `${i * 0.2}s`,
//           }}
//         ></span>
//       ))}
//     </div>
//   );
// };





export const DotsLoader = ({
  size = 8,
  color1 = "#4ade80", // light green
  color2 = "#16a34a", // medium green
  color3 = "#065f46", // dark green
}) => {
  return (
    <div className="flex justify-center items-center gap-1 mt-2">
      {[color1, color2, color3].map((color, i) => (
        <span
          key={i}
          className="rounded-full animate-bounce"
          style={{
            width: size,
            height: size,
            background: color,
            boxShadow: "0 0 8px rgba(34,197,94,0.6)",
            animationDelay: `${i * 0.15}s`,
          }}
        ></span>
      ))}
    </div>
  );
};