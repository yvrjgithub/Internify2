import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import Navbar from './shared/Navbar';
import Selector from './shared/Selector';
import JobCard from './shared/JobCard';
import { useSelector } from 'react-redux';

const Interns = () => {
  const { allJobs, searchQuery } = useSelector((store) => store.jobs);
  const [filtered, setFiltered] = useState(allJobs);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const filterBySalary = (job, query) => {
    const salary = job.salary;
    switch (query) {
      case '<10k':
        return salary < 10000;
      case '10k-30k':
        return salary >= 10000 && salary <= 30000;
      case '30k-50k':
        return salary >= 30000 && salary <= 50000;
      case '>50k':
        return salary > 50000;
      default:
        return true;
    }
  };

  useEffect(() => {
    if (searchQuery) {
      const jobs = allJobs.filter((job) => {
        if (['<10k', '10k-30k', '30k-50k', '>50k'].includes(searchQuery)) {
          return filterBySalary(job, searchQuery);
        }
        return (
          job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
      setFiltered(jobs);
    } else {
      setFiltered(allJobs);
    }
  }, [allJobs, searchQuery]);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Mobile Menu Button */}
      <div className="md:hidden p-4">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-md bg-white shadow-sm"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`
            fixed md:static
            inset-y-0 left-0
            transform md:transform-none
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            transition duration-200 ease-in-out
            w-64 md:w-72
            bg-white
            border-r
            z-30
            mt-16 md:mt-0
            h-[calc(100vh-4rem)]
          `}
        >
          <div
            className="p-4 h-full overflow-y-auto"
            style={{
              scrollbarWidth: 'none', // For Firefox
              msOverflowStyle: 'none', // For IE/Edge
            }}
          >
            <div
              style={{
                height: '100%',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <Selector />
            </div>
          </div>
        </aside>

        {/* Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
            {filtered.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Interns;
