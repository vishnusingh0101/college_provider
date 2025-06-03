import { useState } from "react";
import { Search, MapPin, Building2, User } from "lucide-react";

const SearchStudent = ({ data, onFilterChange, onReset }) => {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [expertise, setExpertise] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    if (!name && !course && !expertise) {
      onReset();
      return;
    }

    const filtered = data.filter((student) => {
      const nameMatch = student.name.toLowerCase().includes(name.toLowerCase());
      const courseMatch = student.course.toLowerCase().includes(course.toLowerCase());
      const expertiseMatch = student.expertise.toLowerCase().includes(expertise.toLowerCase());

      return (
        (!name || nameMatch) &&
        (!course || courseMatch) &&
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

export default SearchStudent;
