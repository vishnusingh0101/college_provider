import { MapPin, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom";


const CollegeCard = ({ college, colActiv }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className={`${colActiv ? "h-96" : "h-48"} w-full`}>
        <Link to={`/college/${college._id}`}>
        <img src={college.imgLink} alt={college.name} className="w-full h-full cursor-pointer" />
        </Link>
      </div>
      <div className="p-6">
        <h2 className={`text-xl ${colActiv ? "" : "line-clamp-1" } font-bold text-[#1a237e] mb-2`}>{college.title}</h2>
        <div className="flex items-center gap-1 text-gray-600 mb-4">
          <MapPin className="h-4 w-4" />
          <span>{college.location}</span>
        </div>

        <p className={`text-gray-600 mb-4 ${colActiv ? "" : "line-clamp-3" }`}>{college.description}</p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-600">Established</p>
            <p className="text-lg font-semibold text-indigo-600">{college.established}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Area</p>
            <p className="text-lg font-semibold text-indigo-600">{college.area}</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">NAAC Grade</p>
            <p className="text-lg text-indigo-600 font-semibold">{college.naacGrade}</p>
          </div>
          <Link to={`/college/${college._id}`}>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors cursor-pointer">
            Details <ArrowRight className="h-4 w-4" />
          </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
export default CollegeCard;