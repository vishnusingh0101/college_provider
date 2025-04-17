// import React, { useState } from "react";
// import CS from "../../services/CallScheduler";


// const CounsellorPage = () => {
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
//           <h1 className="text-2xl font-bold">Top Counsellors</h1>
//         </div>

//         {/* Counsellor Cards */}
//         <div className="grid gap-6">
//           {[1, 2, 3].map((item) => (
//             <div key={item} className="rounded-lg border border-gray-300 p-6">
//               <div className="flex items-start justify-between">
//                 <div className="flex gap-4">
//                   <img
//                     src="/placeholder.svg?height=80&width=80"
//                     alt="ABC consultancy"
//                     className="h-20 w-20 rounded-lg"
//                   />
//                   <div>
//                     <div className="flex items-start justify-between">
//                       <div>
//                         <h2 className="text-xl font-bold">ABC consultancy</h2>
//                         <p className="text-sm text-gray-600">Top 10 at collegeconnect | Region : Delhi, NCR</p>
//                       </div>
//                     </div>

//                     <div className="mt-4">
//                       <h3 className="font-medium mb-2">About</h3>
//                       <p className="text-sm text-gray-600">
//                         Alumni are former students of a college or university who have graduated and moved on to their
//                         professional or personal pursuits. They play a vital role in supporting current students by
//                         sharing experiences, offering mentorship, and providing networking opportunities. Alumni often
//                         act as ambassadors for their institution, contributing to its growth and reputation.
//                       </p>
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
//                     <span className="font-medium text-gray-600">/5</span>
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
//       </main>
//       {isOpen && ( <CS onStateChange={closePopup} /> )}
//     </div>
//   )
// }

// export default CounsellorPage

