import React, { useState } from "react";
import "./App.css";import { Link } from "react-router-dom"
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import ProblemSection from "../components/home/ProblemSection.jsx";
import HowItWorks from "../components/home/HowItWorks.jsx";
import WhyChooseUs from "../components/home/WhyChooseUs.jsx";
import FAQSection from "../components/home/FAQSection.jsx";
import TestimonialSlider from "../components/home/TestimonialSlider.jsx";



function LandingPage() {

  const navItems = [
    { index: "01",
      name: "Alumni", 
      path: "/alumni", 
      img: "https://media.istockphoto.com/vectors/group-of-male-and-female-characters-in-graduation-gowns-and-caps-vector-id1145644143?k=6&m=1145644143&s=612x612&w=0&h=Dox7jdjzhVCVw-eVOYFKaJZwH51vWB3OoJ7M9Wt20n8=", 
      description: "Connect with the alumni of the colleges, and get real feedback about the college." },
    // { name: "Faculty", 
    //   path: "/faculty", 
    //   img: "/assets/images/home_2.png", 
    //   description: "Engage with experienced faculty members to gain insights into academic programs." },
    { index: "02",
      name: "Student", 
      path: "/student", 
      img: "https://img.freepik.com/premium-photo/drawing-students-studying-classroom_664644-4809.jpg", 
      description: "Interact with current students to understand campus life and study experiences." },
    // { name: "Counsellor", 
    //   path: "/counsellor", 
    //   img: "/assets/images/home_2.png", 
    //   description: "Get guidance from professional counselors for career and academic planning." }
  ];

  // const sliderSettings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 1000,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   autoplay: true,
  //   autoplaySpeed: 5000,
  //   arrows: false
  // };


  return (
    <>
    <div>
      <section className="flex sm:justify-between items-center justify-center w-full mx-auto sm:pt-24 lg:px-16 md:px-8 pt-8 px-4">
        <div className="flex flex-col justify-center items-center sm:items-start sm:max-w-[50%]">
         <img 
          src="/assets/images/home_1.png" 
          alt="College Connect Meeting Illustration" 
          className="sm:max-w-[50%] sm:hidden" 
        />
          <h1 className="lg:text-5xl md:text-4xl text-2xl text-gray-800 sm:text-left text-center leading-18 font-bold mb-4">
            Seamless College and <br/>
            Career Guidance with <br/>
            <span className="text-indigo-600">
            CollegeProvider
            </span>
          </h1>
          <p className="text-xl text-center text-gray-500 mb-8">
            The platform connects colleges, alumni, faculty, students, and counselors.
          </p>
        </div>
        <img 
          src="/assets/images/home_1.png" 
          alt="College Connect Meeting Illustration" 
          className="sm:max-w-[50%] hidden sm:block" 
        />
      </section>

      <div className="home-container">
      <header className="hero-section">
        <button className="info-button">Listed over 5000 Alumni & 300 Colleges</button>
        <div className="oval-background"></div>
        <h1 className="black-text">
        Get Into Your Dream<span className="highlight"> College</span>
        — With 1:1 Guidance From <span className="highlight">Alumni</span> Who’ve Been There.
        </h1>
        <p className="slogan">No more guesswork. No generic advice. Just real, actionable insights from alumni who cracked the code.</p>
        <button className="cta-button">Book Your First Session (Free Trial)</button>
      </header>
    </div>

      <section className="mx-auto sm:my-16 lg:px-16 md:px-8 px-4">
        <div className="p-4 text-center">
          <h2 className="inline text-start lg:text-5xl md:text-4xl text-2xl font-bold text-indigo-600">Connect </h2>
          <span className="lg:text-5xl md:text-4xl text-2xl"> with</span>
        </div>
        {navItems.map((item) => (
          <div key={item.index} className="flex flex-col md:flex-row justify-center items-center mb-8">
            <div className="flex flex-col justify-center items-center m-6 p-6">
            <img 
                src={item.img} 
                alt={`${item.name} Illustration`} 
                className="transition duration-300 hover:-translate-y-0.5 rounded-2xl m-4 md:max-w-[50%]" 
              />
            <Link to={item.path}>
            <div key={item.name} className=" text-2xl text-center w-40 p-4 m-4 lg:m-0 lg:p-0 text-indigo-600 transition duration-300 font-bold rounded-2xl border-2 hover:-translate-y-0.5 hover:text-indigo-800 active:text-indigo-800 cursor-pointer">
              {item.name}
            </div>
            </Link>
            </div>
          </div>
        ))}
      </section>
    </div>
    <ProblemSection />
    <HowItWorks/>
    <WhyChooseUs/>
    <FAQSection/>
    <TestimonialSlider/>
    </>
  );
 
}

export default LandingPage;











// import Navbar from "../components/layout/Navbar"
// import Footer from "../components/layout/Footer"
// import { Link } from "react-router-dom"
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";



// export default function LandingPage() {

//   const navItems = [
//     { name: "Alumni", 
//       path: "/alumni", 
//       img: "/assets/images/home_2.png", 
//       description: "Connect with the alumni of the colleges, and get real feedback about the college." },
//     { name: "Faculty", 
//       path: "/faculty", 
//       img: "/assets/images/home_2.png", 
//       description: "Engage with experienced faculty members to gain insights into academic programs." },
//     { name: "Student", 
//       path: "/student", 
//       img: "/assets/images/home_2.png", 
//       description: "Interact with current students to understand campus life and study experiences." },
//     { name: "Counsellor", 
//       path: "/counsellor", 
//       img: "/assets/images/home_2.png", 
//       description: "Get guidance from professional counselors for career and academic planning." }
//   ];

//   const sliderSettings = {
//     dots: true,
//     infinite: true,
//     speed: 1000,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 5000,
//     arrows: false
//   };

//   return (
//     <div>
//     <Navbar />
//       <section className="flex sm:justify-between items-center justify-center w-full mx-auto sm:my-16 lg:px-16 md:px-8 px-4">
//         <div className="flex flex-col justify-center items-center sm:items-start sm:max-w-[50%]">
//         <img 
//           src="/assets/images/home_1.png" 
//           alt="College Connect Meeting Illustration" 
//           className="sm:max-w-[50%] sm:hidden" 
//         />
//           <h1 className="lg:text-5xl md:text-4xl text-2xl text-gray-800 sm:text-left text-center leading-18 font-bold mb-4">
//             Seamless College and <br/>
//             Career Guidance with <br/>
//             <span className="text-indigo-600">
//             CollegeConnect
//             </span>
//           </h1>
//           <p className="text-xl text-center text-gray-500 mb-8">
//             The platform connects colleges, alumni, faculty, students, and counselors.
//           </p>
//         </div>
//         <img 
//           src="/assets/images/home_1.png" 
//           alt="College Connect Meeting Illustration" 
//           className="sm:max-w-[50%] hidden sm:block" 
//         />
//       </section>

//       <section className="mx-auto sm:my-16 lg:px-16 md:px-8 px-4">
//         <div className="flex flex-col lg:flex-row justify-between items-center mb-8">
//           <div className="sm:mr-20 p-4">
//             <h2 className="inline text-start lg:text-5xl md:text-4xl text-2xl font-bold text-indigo-600">Connect </h2>
//             <span className="lg:text-5xl md:text-4xl text-2xl"> with</span>
//           </div>
//           {navItems.map((item) => (
//             <Link to={item.path}>
//             <div key={item.name} className="hidden lg:block text-xl text-center w-40 p-4 m-4 lg:m-0 lg:p-0 text-gray-700 transition duration-300 hover:-translate-y-0.5 hover:text-indigo-600 active:text-indigo-600 cursor-pointer">
//               {item.name}
//             </div>
//             </Link>
//           ))}
//         </div>
//       </section>

//       {/* Slider Section */}
//       <section className="bg-[#f8f8ff] lg:py-16">
//         <Slider {...sliderSettings}>
//           {navItems.map((item, index) => (
//             <div className="">
//             <div key={index} className="flex justify-between items-center mx-auto lg:px-16 md:px-8 px-4">
//               <img 
//                 src={item.img} 
//                 alt={`${item.name} Illustration`} 
//                 className="rounded-xl md:max-w-[50%] max-w-[40%]" 
//               />
//               <div className="lg:mx-30 md:mx-20 mx-4">
//                 <Link to={item.path}>
//                 <h2 className="lg:text-8xl md:text-6xl font-bold text-4xl text-indigo-600 mb-4">{item.name}</h2>
//                 <p className="lg:text-xl text-gray-500">{item.description}</p>
//                 </Link>
//               </div>
//               </div>
              
//             </div>
//           ))}
//         </Slider>
//       </section>
//       <Footer />
//     </div>
//   )
// }