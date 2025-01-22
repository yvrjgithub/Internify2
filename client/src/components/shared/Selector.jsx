import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '@/redux/jobSlice';

const Selector = () => {
  const [selected, setSelected] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchQuery(selected));
  }, [selected]);

  const filterData = [
    {
      filterType: "Location",
      Array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
      filterType: "Domain",
      Array: ["Fullstack Developer", "Frontend Developer", "App developer", "Graphic Designer"]
    },
    {
      filterType: "Stipend",
      Array: ["<10k", "10k-30k", "30k-50k", ">50k"]
    },
  ];

  const handleClear = () => {
    setSelected("");
  };

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Filter</h1>
        {selected && (
          <button 
            onClick={handleClear}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Clear Filter
          </button>
        )}
      </div>
      {filterData.map((data, index) => (
        <div key={`section-${index}`} className="mb-4">
          <h2 className="text-lg font-semibold mb-2">{data.filterType}</h2>
          <div className="space-y-2">
            {data.Array.map((item, idx) => {
              const jobId = `${data.filterType}-${idx}`;
              return (
                <div key={jobId} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id={jobId}
                    name={data.filterType}
                    value={item}
                    onChange={(e) => {
                      setSelected(e.target.value);
                    }}
                    checked={selected === item}
                    className="h-4 w-4"
                  />
                  <label 
                    htmlFor={jobId}
                    className="font-medium text-gray-700 cursor-pointer"
                  >
                    {item}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Selector;