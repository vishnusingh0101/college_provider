import { useState } from "react";
import { Search, MapPin, Building2, Briefcase, User, ChevronDown } from "lucide-react";

const SearchAlumni = ({ data, onFilterChange, onReset }) => {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [location, setLocation] = useState("");
  const [company, setCompany] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [expertise, setExpertise] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    if (!name && !course && !location && !company && !jobRole && !expertise) {
      onReset();
      return;
    }

    const filtered = data.filter((alumni) => {
      const nameMatch = alumni.name.toLowerCase().includes(name.toLowerCase());
      const courseMatch = alumni.course.toLowerCase().includes(course.toLowerCase());
      const locationMatch = alumni.joblocation.toLowerCase().includes(location.toLowerCase());
      const companyMatch = alumni.currentcompany.toLowerCase().includes(company.toLowerCase());
      const roleMatch = alumni.currentjobrole.toLowerCase().includes(jobRole.toLowerCase());
      const expertiseMatch = alumni.expertise.toLowerCase().includes(expertise.toLowerCase());

      return (
        (!name || nameMatch) &&
        (!course || courseMatch) &&
        (!location || locationMatch) &&
        (!company || companyMatch) &&
        (!jobRole || roleMatch) &&
        (!expertise || expertiseMatch)
      );
    });

    onFilterChange(filtered);
  };

  return (
    <form onSubmit={handleSearch} className="bg-white p-6 rounded-lg shadow-md max-w-5xl mx-auto mt-6 space-y-4">
      {/* Name */}
      <div className="relative">
        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full pl-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Course */}
      <div className="relative">
        <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by Course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          className="w-full pl-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Job Location */}
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by Job Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full pl-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Company */}
      <div className="relative">
        <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="w-full pl-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Job Role */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by Job Role"
          value={jobRole}
          onChange={(e) => setJobRole(e.target.value)}
          className="w-full pl-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Expertise */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by Expertise"
          value={expertise}
          onChange={(e) => setExpertise(e.target.value)}
          className="w-full pl-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <button
        type="submit"
        className="w-full md:w-auto px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
      >
        Search
      </button>
    </form>
  );
};

export default SearchAlumni;
