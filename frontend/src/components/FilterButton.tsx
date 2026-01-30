import React from "react";

interface FilterButtonProps {
  onClick: () => void;
  activeFiltersCount?: number;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  onClick,
  activeFiltersCount = 0,
}) => {
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center justify-center p-2 rounded-lg border transition-all duration-200 
        ${
          activeFiltersCount > 0
            ? "bg-blue-50 border-blue-500 text-blue-600"
            : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50"
        }`}
      aria-label="Filter Clubs"
    >
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
      >
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
      </svg>

      {activeFiltersCount > 0 && (
        <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
          {activeFiltersCount}
        </span>
      )}
    </button>
  );
};

export default FilterButton;
