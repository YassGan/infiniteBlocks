// components/sidebar/FilterSidebar.js
const FilterSidebar = ({ filters, onFilterChange }) => {
    return (
      <aside className="bg-[#181818] border border-gray-700 rounded w-full  pt-2">
        <div className=" shadow-md rounded p-4">
          <h4 className="text-lg text-white font-semibold mb-4">Filter by:</h4>
          {filters.map((filter, index) => (
            <div key={index} className="mb-3">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-white-600 h-5 w-5"
                  checked={filter.checked}
                  onChange={(e) => onFilterChange(filter, e.target.checked)}
                />
                <span className="ml-2 text-white">{filter.label}</span>
              </label>
            </div>
          ))}
        </div>
      </aside>
    );
  };
  
  export default FilterSidebar;
  