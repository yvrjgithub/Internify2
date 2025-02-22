import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Briefcase, Target, Star, Circle, Building2, Code, PenTool, Users } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchQuery } from '@/redux/jobSlice';

const AnimatedNumber = ({ value }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(c => c < value ? c + 1 : c);
    }, 100);
    return () => clearInterval(interval);
  }, [value]);

  return <span>{count}K+</span>;
};

const Hero = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSearch = () => {
    dispatch(setSearchQuery(query));
    navigate('/browse');
  };

  const stats = [
    { value: 10, label: "Active Internships" },
    { value: 5, label: "Partner Companies" },
    { value: 15, label: "Success Stories" }
  ];

  const categories = [
    { icon: <Code className="w-8 h-8" />, title: "Tech", color: "bg-blue-100" },
    { icon: <Building2 className="w-8 h-8" />, title: "Business", color: "bg-purple-100" },
    { icon: <PenTool className="w-8 h-8" />, title: "Design", color: "bg-green-100" },
    { icon: <Users className="w-8 h-8" />, title: "Marketing", color: "bg-yellow-100" }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-white to-blue-50 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <Circle
            key={i}
            className={`absolute opacity-10 animate-pulse text-blue-400`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `pulse ${2 + i}s infinite`,
              transform: `scale(${0.5 + Math.random() * 2})`
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Asymmetric layout with two columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column */}
          <div className={`space-y-8 transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
            <div className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-full">
              <span className="animate-pulse">●</span>
              <span className="font-medium">#1 Internship Portal</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
              Launch Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Future Career
              </span>
            </h1>

            <div className="relative">
              <div className="max-w-2xl">
                <Input
                  className="w-full pl-6 pr-32 py-6 text-lg rounded-full border-2 border-blue-100 focus:border-blue-500 transition-colors"
                  placeholder="What kind of internship excites you?"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Button
                  className="absolute right-2 top-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-full transition-transform hover:scale-105"
                  onClick={handleSearch}
                >
                  <Search className="h-5 w-5 mr-2" />
                  Search
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-4 rounded-xl bg-white shadow-lg transform hover:-translate-y-1 transition-transform"
                >
                  <div className="text-2xl font-bold text-blue-600">
                    <AnimatedNumber value={stat.value} />
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column - Static Categories */}
          <div className={`relative transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Popular Categories</h2>
              <div className="grid grid-cols-2 gap-4">
                {categories.map((category, index) => (
                  <div
                    key={index}
                    className="p-6 rounded-xl transition-transform hover:-translate-y-1 cursor-pointer"
                    style={{ background: `${category.color}` }}
                  >
                    <div className="flex flex-col items-center text-gray-800">
                      {category.icon}
                      <span className="mt-2 font-medium">{category.title}</span>
                      <span className="text-sm text-gray-600 mt-1">
                        {Math.floor(Math.random() * 50 + 20)} positions
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                <p className="text-center text-sm text-gray-600">
                  Over 1000+ new internship opportunities added every week
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom feature cards */}
        <div className={`py-8 grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 transform transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          {[
            { icon: <Briefcase />, title: "Verified Companies", desc: "Only trusted employers" },
            { icon: <Target />, title: "Perfect Match", desc: "AI-powered matching" },
            { icon: <Star />, title: "Career Growth", desc: "Mentorship included" }
          ].map((feature, i) => (
            <div
              key={i}
              className="group relative bg-white p-6 rounded-xl shadow-lg overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <div className="relative group-hover:text-white transition-colors duration-500">
                <div className="text-blue-600 group-hover:text-white mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
