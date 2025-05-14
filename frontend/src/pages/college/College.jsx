import FilterColleges from "../../components/college/FilterColleges";
import { useState, useEffect } from 'react';
import { LayoutGrid, List} from "lucide-react"
import CollegeCard from "../../components/college/CollegeCard";
import HashLoader from "react-spinners/HashLoader";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";


const Property = () => {
  const handleResetData = () => {
    setCurrentPage(1);
    setCollegeData(allCollegeData);
  };
  const handleFilterChange = (filteredData) => {
    setCurrentPage(1);
    setCollegeData(filteredData);
  };
  const [loading, setLoading] = useState(true);
  const [allCollegeData, setAllCollegeData] = useState([]);
  const [collegeData, setCollegeData] = useState([]);
  const [colActiv, setColActiv] = useState(false);
  const { apiUrl, token } = useAuth();
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const totalPages = Math.ceil(collegeData.length / itemsPerPage);


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentColleges = collegeData.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    const fetchCollegeData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${apiUrl}college/collegelist`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          }
        });
        setCollegeData(response.data.data);
        setAllCollegeData(response.data.data);
      } catch (error) {
        console.error('Error fetching college data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCollegeData();
  }, []);


  return (
    <>
      {loading ? (
          <div className="flex flex-col items-center justify-center min-h-screen py-10">
            <HashLoader size={50} color="#3B82F6" loading={loading} />
            <p className="text-gray-500 mt-4">Loading ...</p>
          </div>
        ) : collegeData.length === null ? (
          <div className="text-center py-10 min-h-screen">
            <p className="text-gray-500">No College found</p>
          </div>
        ) : (
      <div>
      <FilterColleges data={allCollegeData} onFilterChange={handleFilterChange} onReset={handleResetData} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between mb-6">
          <div className="flex flex-col justify-end">
          {/* <p className="text-gray-600 text-xl mb-4 sm:mb-0">
            Showing <span className="text-indigo-600 font-medium">{collegeData.length}</span> colleges
          </p> */}
          <p className="text-gray-600">
            Showing{" "}
            <span className="text-indigo-600 font-medium">
              {Math.min((currentPage - 1) * itemsPerPage + 1, collegeData.length)}
            </span>{" "}
            -{" "}
            <span className="text-indigo-600 font-medium">
              {Math.min(currentPage * itemsPerPage, collegeData.length)}
            </span>{" "}
            of{" "}
            <span className="text-indigo-600 font-medium">{collegeData.length}</span>{" "}
            colleges
          </p>
          {/* <div className="flex mt-1">
          <p className="text-gray-600">
            Page {currentPage} of {Math.ceil(collegeData.length / itemsPerPage)}
          </p>
          </div> */}
          </div>

          <div className="">
          <button
            onClick={handleResetData}
            className="mt-4 mx-2 w-full md:w-auto px-6 py-2 border border-b-indigo-500 text-indigo-600 rounded-xl focus:ring-2 transition-colors hover:text-indigo-800 cursor-pointer focus:ring-offset-2"
          >
            Reset
          </button>
          </div>

          <div className="sm:flex items-center space-x-4 hidden">
            {/* <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="relevance">Sort by Relevance</option>
              <option value="rating">Sort by Rating</option>
              <option value="fees">Sort by Fees</option>
            </select> */}
            <div className="flex space-x-2">
              <button
                onClick={() => setColActiv(false)}
                className={`p-2 rounded-lg ${
                  !colActiv ? "bg-indigo-600 text-white" : "bg-white text-gray-600 border border-gray-300"
                }`}
              >
                <LayoutGrid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setColActiv(true)}
                className={`p-2 rounded-lg ${
                  colActiv ? "bg-indigo-600 text-white" : "bg-white text-gray-600 border border-gray-300"
                }`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <main className="container mx-auto px-4 py-8">
        <div className={`grid grid-cols-1 md:${colActiv ? "grid-cols-1" : "grid-cols-2"} lg:${colActiv ? "grid-cols-2" : "grid-cols-3"} gap-6`}>
          {currentColleges.map((college) => (
            <CollegeCard key={college._id} college={college} colActiv={colActiv} />
          ))}
        </div>
        {/* <div className="flex justify-center mt-8 space-x-2 flex-wrap">
  <button
    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
    disabled={currentPage === 1}
    className={`px-4 py-2 border rounded ${
      currentPage === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-600'
    }`}
  >
    Prev
  </button>

  {Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter(page =>
      page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)
    )
    .reduce((acc, page, idx, arr) => {
      if (idx > 0 && page - arr[idx - 1] > 1) acc.push('...');
      acc.push(page);
      return acc;
    }, [])
    .map((item, index) =>
      item === '...' ? (
        <span key={index} className="px-3 py-2 text-gray-400 select-none">...</span>
      ) : (
        <button
          key={item}
          onClick={() => setCurrentPage(item)}
          className={`px-4 py-2 border rounded ${
            currentPage === item ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600'
          }`}
        >
          {item}
        </button>
      )
    )}

  <button
    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
    disabled={currentPage === totalPages}
    className={`px-4 py-2 border rounded ${
      currentPage === totalPages ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-600'
    }`}
  >
    Next
  </button>
</div> */}
        <div className="flex justify-center mt-8 space-x-2 flex-wrap">
  <button
    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
    disabled={currentPage === 1}
    className={`px-4 py-2 border rounded ${
      currentPage === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-600'
    }`}
  >
    Prev
  </button>

  {/* First Page */}
  {currentPage > 2 && (
    <>
      <button
        onClick={() => setCurrentPage(1)}
        className={`px-4 py-2 border rounded ${
          currentPage === 1 ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600'
        }`}
      >
        1
      </button>
      {currentPage > 3 && <span className="px-2 text-gray-400">...</span>}
    </>
  )}

  {/* Current Page - 1 */}
  {currentPage > 1 && (
    <button
      onClick={() => setCurrentPage(currentPage - 1)}
      className="px-4 py-2 border rounded bg-white text-gray-600"
    >
      {currentPage - 1}
    </button>
  )}

  {/* Current Page */}
  <button className="px-4 py-2 border rounded bg-indigo-600 text-white">
    {currentPage}
  </button>

  {/* Current Page + 1 */}
  {currentPage < totalPages && (
    <button
      onClick={() => setCurrentPage(currentPage + 1)}
      className="px-4 py-2 border rounded bg-white text-gray-600"
    >
      {currentPage + 1}
    </button>
  )}

  {/* Last Page */}
  {currentPage < totalPages - 1 && (
    <>
      {currentPage < totalPages - 2 && <span className="px-2 text-gray-400">...</span>}
      <button
        onClick={() => setCurrentPage(totalPages)}
        className={`px-4 py-2 border rounded ${
          currentPage === totalPages ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600'
        }`}
      >
        {totalPages}
      </button>
    </>
  )}

  <button
    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
    disabled={currentPage === totalPages}
    className={`px-4 py-2 border rounded ${
      currentPage === totalPages ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-600'
    }`}
  >
    Next
  </button>
</div>
        {/* Pagination Info */}
         <div className="flex justify-center mt-4">
          <p className="text-gray-600">
            Showing{" "}
            <span className="text-indigo-600 font-medium">
              {Math.min((currentPage - 1) * itemsPerPage + 1, collegeData.length)}
            </span>{" "}
            -{" "}
            <span className="text-indigo-600 font-medium">
              {Math.min(currentPage * itemsPerPage, collegeData.length)}
            </span>{" "}
            of{" "}
            <span className="text-indigo-600 font-medium">{collegeData.length}</span>{" "}
            colleges
          </p>
        </div>

      </main>
      </div>
      </div>
      )
      }
    </>
  );
};

export default Property;