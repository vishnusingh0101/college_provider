import { useState } from "react";
import { Search, MapPin, Building2, ChevronDown } from "lucide-react";

const Banner = ({data, onFilterChange, onReset}) => {

  const [searchTerm, setSearchTerm] = useState("")
  const [location, setLocation] = useState("")
  const [course, setCourse] = useState("")

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
        if (searchTerm === "" && location === "") {
          onReset(); // Call the reset function if the search query is empty
        } else {
          // Filter the data based on the search query
          const filteredData = data.filter((item) =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) && item.location.toLowerCase()===location.toLowerCase()
          );
          // Call the parent component's callback to send the filtered data
          onFilterChange(filteredData);
        }
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // console.log("Searching:", { searchTerm, location, course })
    if (searchTerm === "" && location === "") {
      onReset(); // Call the reset function if the search query is empty
    } else {
      // Filter the data based on the search query
      const filteredData = data.filter((item) =>
        location===""?item.title.toLowerCase().includes(searchTerm.toLowerCase()):item.location.toLowerCase()===location.toLowerCase() && item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

      // Call the parent component's callback to send the filtered data
      onFilterChange(filteredData);
    }
  }


  return (
    <div className="bg-gradient-to-b from-indigo-100 to-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-12">Search Colleges</h1>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search for Colleges"
                value={searchTerm}
                onKeyDown={handleKeyPress}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {/* Location Select */}
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="">Select Location</option>
                <option value="greater noida">Greater Noida</option>
                <option value="ghaziabad">Ghaziabad</option>
                <option value="noida">Noida</option>
                <option value="gurugram">Gurugram</option>
                <option value="delhi">Delhi</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>

            {/* Course Select */}
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="">Courses Offered</option>
                <option value="btech">B.Tech.</option>
                <option value="mtech">M.Tech.</option>
                <option value="bba">BBA</option>
                <option value="mba">MBA</option>
                <option value="bca">BCA</option>
                <option value="mca">MCA</option>
                <option value="pgdm">PGDM</option>
                {/* <option value="engineering">Engineering</option>
                <option value="medical">Medical</option>
                <option value="business">Business</option> */}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 w-full md:w-auto px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default Banner;
