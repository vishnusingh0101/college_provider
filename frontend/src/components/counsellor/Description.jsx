import { useState } from "react";

export default function DescriptionItem({ description }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mt-4 transition-all duration-300 ease-in-out">
      <h3 className="font-medium mb-2">About</h3>

      <p
        className={`text-sm text-gray-600 transition-all duration-300 ease-in-out ${
          expanded ? "line-clamp-none max-h-[1000px]" : "line-clamp-3 max-h-[4.5em]"
        } overflow-hidden`}
      >
        {description}
      </p>

      <button
        onClick={() => setExpanded(!expanded)}
        className="text-blue-500 text-sm mt-1 focus:outline-none"
      >
        {expanded ? "Show less" : "Read more"}
      </button>
    </div>
  );
}
