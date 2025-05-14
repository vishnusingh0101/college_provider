import { useState, useEffect } from "react";
import axios from "axios";
import CircleLoader from "react-spinners/CircleLoader";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import CS from "../../services/CallScheduler";


function StudentCards() {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [studentData, setStudentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { apiUrl, token } = useAuth();

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${apiUrl}college/studentlist`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          }
        });
        setStudentData(response.data.data);
      } catch (error) {
        console.error('Error fetching student data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  const filteredStudent = studentData.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.currentcompany.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.expertise.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Student
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Connect with our distinguished Student network
          </p>
          
          {/* Search input */}
          <div className="mt-8 max-w-md mx-auto">
            <div className="relative rounded-md shadow-sm">
              <input
                type="text"
                className="block w-full rounded-md border-0 py-3 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                placeholder="Search by name, company, or expertise..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Student cards grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-10">
                 <CircleLoader size={50} color="#3B82F6" loading={loading} />
                 <p className="text-gray-500 mt-4">Loading ...</p>
               </div>
        ) : filteredStudent.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">No student found matching your search.</p>
          </div>
        ): (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStudent.map((student, index) => (
            <StudentCard
              key={index}
              student={student}
              onClick={() => setSelectedStudent(student)}
            />
          ))}
        </div>
        )}
      </div>

      {/* Modal for student details */}
      {selectedStudent && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedStudent(null)}
        >
          <div
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <StudentCardDetails student={selectedStudent} onClose={() => setSelectedStudent(null)} />
          </div>
        </div>
      )}
    </div>
  );
}

function StudentCard({ student, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-white transition-all duration-300 ${
        isHovered ? "transform scale-105 shadow-xl" : "shadow-md"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Card header with gradient */}
      <div className="h-24 bg-gradient-to-r from-indigo-500 to-indigo-600 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 rounded-full bg-indigo-400 opacity-20"></div>
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-32 h-32 rounded-full bg-indigo-700 opacity-20"></div>
      </div>
      
      {/* Card content */}
      <div className="relative p-6 -mt-10">
        <div className="bg-white flex shadow-lg rounded-lg p-4 mb-4">
          <img
            src={student.profile}
            alt={student.name}
            className="w-12 h-12 rounded-full"
          />
          <h2 className="text-xl font-bold text-gray-900">{student.name}</h2>
          {/* <p className="text-indigo-600">{student.profile}</p> */}
        </div>
        
        <div className="space-y-4">
          
          <div className="flex items-center text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-indigo-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
              <path d="M6 12v5c0 2 1 3 3 3h6c2 0 3-1 3-3v-5"></path>
            </svg>
            <div>
              <p className="font-medium">{student.college}</p>
              <p className="text-sm text-gray-500">Class of {student.course}</p>
            </div>
          </div>
        </div>
        
        {/* Expertise tags */}
        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            {student.expertise.split(", ").slice(0, 2).map((skill, index) => (
              <span
                key={index}
                className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-xs"
              >
                {skill}
              </span>
            ))}
            {student.expertise.split(", ").length > 2 && (
              <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-xs">
                +{student.expertise.split(", ").length - 2} more
              </span>
            )}
          </div>
        </div>
        
        {/* View profile button */}
        <button className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
          View Profile
        </button>
      </div>
    </div>
  );
}

function StudentCardDetails({ student, onClose }) {
  const [isOpen, setIsOpen] = useState(false);
  const {isLoggedIn} = useAuth();
  const navigate = useNavigate();
  const [studentId, setStudentId] = useState();

  const openPopup = (studentId) => {
    if(!isLoggedIn) {
      navigate('/login');
      return;
    }
    setIsOpen(true);
    setStudentId(studentId);
  };
  const closePopup = () => setIsOpen(false);


  return (
    <>
      <div className="relative flex bg-gradient-to-r from-indigo-500 to-indigo-600 text-white p-6 rounded-t-lg">
        <button
          className="absolute right-4 top-4 text-white hover:bg-white/20 p-1 rounded-full transition-colors"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <img
          src={student.profile}
          alt={student.name}
          className="w-12 h-12 rounded-full"
        />
        <h2 className="text-2xl font-bold">{student.name}</h2>
        {/* <p className="text-white/80 text-lg">{student.profile}</p> */}
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="space-y-4">

            <div className="flex items-start gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-indigo-600 mt-0.5"
              >
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                <path d="M6 12v5c0 2 1 3 3 3h6c2 0 3-1 3-3v-5"></path>
              </svg>
              <div>
                <h3 className="font-medium text-gray-900">Education</h3>
                <p className="text-gray-600">{student.college}</p>
                <p className="text-gray-600">
                  {student.course}, {student.graduationyear}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-start gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-indigo-600 mt-0.5"
            >
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
            </svg>
            <div>
              <h3 className="font-medium text-gray-900">Bio</h3>
              <p className="text-gray-600 mt-1">{student.bio}</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-medium text-gray-900 mb-2">Expertise</h3>
          <div className="flex flex-wrap gap-2">
            {student.expertise.split(", ").map((skill, index) => (
              <span
                key={index}
                className="bg-indigo-100 text-indigo-700 px-2.5 py-0.5 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-start gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-indigo-600 mt-0.5"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            <div>
              <h3 className="font-medium text-gray-900">Description</h3>
              <p className="text-gray-600 mt-1">{student.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 border-t border-gray-200 p-6 rounded-b-lg">
        <button onClick={() => openPopup(studentId)} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition-colors">
          Connect with {student.name.split(" ")[0]}
        </button>
      </div>
      {isOpen && ( <CS participantId={student._id} participantModel="studentlist" onStateChange={closePopup} /> )}
    </>
  );
}

export default StudentCards;



// import React, { useState, useEffect } from "react";
// import CS from "../../services/CallScheduler";
// import axios from "axios";
// import DescriptionItem from '../../components/counsellor/Description';
// import HashLoader from "react-spinners/HashLoader";
// import { useAuth } from "../../context/AuthContext";
// import { useNavigate } from "react-router-dom";


// const StudentPage = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [item, setItem] = useState();
//   const { apiUrl, token, isLoggedIn } = useAuth();
//   const navigate = useNavigate();

//   const openPopup = (item) => {
//     if(!isLoggedIn) {
//       navigate('/login');
//       return;
//     }
//     setIsOpen(true);
//     setItem(item);
//   };
//   const closePopup = () => setIsOpen(false);

//   const [studentData, setStudentData] = useState([]);
//   const [loading, setLoading] = useState(true);


//   useEffect(() => {
//     const fetchStudentData = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(`${apiUrl}college/studentlist`, {
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': token
//           }
//         });
//         setStudentData(response.data.data);
//       } catch (error) {
//         console.error('Error fetching student data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStudentData();
//   }, []);



//   return (
//     <div className="min-h-screen bg-white">
//       {/* Main Content */}
//       <main className="mx-auto max-w-7xl px-4 py-6">
//         <div className="flex items-center justify-between mb-6">
//           <h1 className="text-2xl text-gray-800 font-bold">Top Students</h1>
//         </div>

//         {/* Counsellor Cards */}
//         {loading ? (
//           <div className="flex flex-col items-center justify-center py-10">
//             <HashLoader size={50} color="#3B82F6" loading={loading} />
//             <p className="text-gray-500 mt-4">Loading ...</p>
//           </div>
//         ) : studentData.length === 0 ? (
//           <div className="text-center py-10">
//             <p className="text-gray-500">No Student found</p>
//           </div>
//         ) : (
//         <div className="grid gap-6">
//           {studentData.map((item) => (
//             <div key={item._id} className="rounded-lg border border-gray-300 p-6">
//               <div className="flex items-start justify-between">
//                 <div className="flex gap-4">
//                 <img
//                   src={item.profile}
//                   alt={item.name}
//                   className="rounded-full w-12 h-12"
//                 />
//                   <div>
//                     <div className="flex items-start justify-between">
//                       <div>
//                         <h2 className="text-xl font-bold text-gray-700">{item.name}</h2>
//                         <p className="text-sm text-gray-600">{item.bio}</p>
//                         <p className="text-sm text-gray-600">{item.expertise}</p>
//                       </div>
//                     </div>
//                     <DescriptionItem description={item.description} />
//                   </div>
//                 </div>
//                 {/* <div className="flex flex-col items-end gap-2">
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
//                 </div> */}
//               </div>

//               <div className="mt-4 flex items-center justify-center border-t border-gray-300 pt-4">
//                 {/* <div>
//                   <span className="text-indigo-600 font-medium">Counselling Fee</span>
//                   <span className="ml-2">- Rs 500 / 2 hr</span>
//                 </div> */}
//                 <button onClick={() => openPopup(item)} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
//                   Schedule a Call
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//         )
//         }
//       </main>
//       {isOpen && ( <CS participantId={item._id} participantModel="studentlist" onStateChange={closePopup} /> )}
//     </div>
//   )
// }

// export default StudentPage;