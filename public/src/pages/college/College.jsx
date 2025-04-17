import FilterColleges from "../../components/college/FilterColleges";
import { useState, useEffect } from 'react';
import { LayoutGrid, List} from "lucide-react"
import CollegeCard from "../../components/college/CollegeCard";
import HashLoader from "react-spinners/HashLoader";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";


const Property = () => {
  const handleResetData = () => {
    setCollegeData(collegeData);
  };
  const handleFilterChange = (collegeData) => {
    setCollegeData(collegeData);
  };
  const [loading, setLoading] = useState(true);
  const [collegeData, setCollegeData] = useState([]);
  const [colActiv, setColActiv] = useState(false);
  const { apiUrl, token } = useAuth();
  



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
      <FilterColleges data={collegeData} onFilterChange={handleFilterChange} onReset={handleResetData} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <p className="text-gray-600 mb-4 sm:mb-0">
            Showing <span className="text-indigo-600 font-medium">{collegeData.length}</span> colleges
          </p>
          <div className="flex items-center space-x-4">
            {/* <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="relevance">Sort by Relevance</option>
              <option value="rating">Sort by Rating</option>
              <option value="fees">Sort by Fees</option>
            </select> */}
            <div className="hidden sm:flex space-x-2">
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
          {collegeData.map((college) => (
            <CollegeCard key={college._id} college={college} colActiv={colActiv} />
          ))}
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