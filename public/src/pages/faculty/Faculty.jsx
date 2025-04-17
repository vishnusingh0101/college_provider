// import React, { useState } from "react";
// import CS from "../../services/CallScheduler";
// import FacultyData from "../../data/FacultyData";


// const FacultyPage = () => {

//   const [isOpen, setIsOpen] = useState(false);

//   const openPopup = () => {
//     setIsOpen(true);
//   };
//   const closePopup = () => setIsOpen(false);

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Main Content */}
//       <main className="mx-auto max-w-7xl px-4 py-6">
//         <div className="flex items-center justify-between mb-6">
//           <h1 className="text-2xl text-gray-800 font-bold">Top Faculty</h1>
//         </div>
//         {/* Counsellor Cards */}
//         <div className="grid gap-6">
//           {FacultyData.map((item) => (
//             <div key={item} className="rounded-lg border border-gray-300 p-6">
//               <div className="flex items-start justify-between">
//                 <div className="flex gap-4">
//                   <img
//                     src={item.Profile}
//                     alt="consultancy_img"
//                     className="h-20 w-20 rounded-lg"
//                   />
//                   <div>
//                     <div className="flex items-start justify-between">
//                       <div>
//                         <h2 className="text-xl font-bold text-gray-700">{item.Name}</h2>
//                         <p className="text-sm text-gray-600">{item.Bio}</p>
//                         <p className="text-sm text-gray-600">{item["I can help with"]}</p>
//                       </div>
//                     </div>

//                     <div className="mt-4">
//                       <h3 className="font-medium mb-2">About</h3>
//                       <p className="text-sm text-gray-600">{item.Description}</p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex flex-col items-end gap-2">
//                   <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
//                       />
//                     </svg>
//                   </button>
//                   <div className="flex items-center gap-1">
//                     <span className="font-medium text-gray-600">4.5</span>
//                     <span className="text-gray-600 font-medium">/5</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-4 flex items-center justify-between border-t border-gray-300 pt-4">
//                 <div>
//                   <span className="text-indigo-600 font-medium">Counselling Fee</span>
//                   <span className="ml-2">- Rs 500 / 2 hr</span>
//                 </div>
//                 <button onClick={openPopup} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
//                   Schedule a Call
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//         {isOpen && ( <CS onStateChange={closePopup} /> )}
//       </main>
//     </div>
//   )
// }

// export default FacultyPage;