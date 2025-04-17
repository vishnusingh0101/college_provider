// import { useState, useEffect } from "react";
// import CollegeData from "../../data/CollegeData";
// import { Link } from "react-router-dom";

// function CollegeSlider() {

//   const [currentSlide, setCurrentSlide] = useState(0)

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % CollegeData.length)
//     }, 5000)

//     return () => clearInterval(timer)
//   }, [])

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % CollegeData.length)
//   }

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + CollegeData.length) % CollegeData.length)
//   }

//   const goToSlide = (index) => {
//     setCurrentSlide(index)
//   }

//   return (
//     <section className="max-w-2xl md:max-w-5xl mx-auto px-6 py-16">
//       <h2 className="text-4xl font-bold text-[#1a237e] mb-12">Top Colleges</h2>

//       <div className="relative">
//         {/* Slider Container */}
//         <div className="relative h-70 md:h-120 overflow-hidden rounded-lg">
//           {CollegeData.map((college, index) => (
//             <div
//               key={college.title}
//               className={`absolute w-full h-full transition-transform duration-500 ease-in-out ${
//                 index === currentSlide ? "translate-x-0" : "translate-x-full"
//               }`}
//               style={{
//                 transform: `translateX(${100 * (index - currentSlide)}%)`,
//               }}
//             >
//               <img
//                 src={college.imgLink || "/placeholder.svg"}
//                 alt={college.name}
//                 className="w-full h-full"
//               />
//             </div>
//           ))}

//           {/* Navigation Arrows */}
//           <button
//             onClick={prevSlide}
//             className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//             </svg>
//           </button>
//           <button
//             onClick={nextSlide}
//             className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//             </svg>
//           </button>
//         </div>

//         {/* Slide Indicators */}
//         <div className="flex justify-center gap-2 mt-4">
//           {CollegeData.map((_, index) => (
//             <div>
//             <button
//               key={index}
//               onClick={() => goToSlide(index)}
//               className={`w-3 h-3 rounded-full transition-colors ${
//                 index === currentSlide ? "bg-[#6366f1]" : "bg-gray-300"
//               }`}
//             />
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="flex justify-center mt-8">
//         <Link
//           to="/colleges"
//           className="bg-[#6366f1] text-white px-8 py-3 rounded-md hover:bg-[#4f46e5] transition-colors"
//         >
//           Browse All
//         </Link>
//       </div>
//     </section>
//   )
// }

// export default CollegeSlider;