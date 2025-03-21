
import React, { useState } from 'react';
import { FileText, Filter, Plus, Search, Tag } from 'lucide-react';

const ContentManager = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchValue, setSearchValue] = useState('');
  
  // Mock data for content
  const content = [
    { id: 1, title: 'System Design Interview Guide', type: 'article', category: 'System Design', status: 'published', views: 2564 },
    { id: 2, title: 'Data Structures Fundamentals', type: 'course', category: 'Algorithms', status: 'published', views: 3871 },
    { id: 3, title: 'Behavioral Interview Questions', type: 'quiz', category: 'Soft Skills', status: 'draft', views: 0 },
    { id: 4, title: 'Frontend Development Interview', type: 'article', category: 'Frontend', status: 'published', views: 1298 },
    { id: 5, title: 'Database Design Questions', type: 'quiz', category: 'Databases', status: 'published', views: 967 }
  ];

  const filters = [
    { id: 'all', label: 'All Content' },
    { id: 'article', label: 'Articles' },
    { id: 'course', label: 'Courses' },
    { id: 'quiz', label: 'Quizzes' }
  ];

  const filteredContent = content.filter(item => 
    (activeFilter === 'all' || item.type === activeFilter) &&
    (item.title.toLowerCase().includes(searchValue.toLowerCase()) ||
     item.category.toLowerCase().includes(searchValue.toLowerCase()))
  );

  // Function to generate background color based on type
  const getTypeColor = (type) => {
    switch (type) {
      case 'article': return 'bg-blue-100 text-blue-800';
      case 'course': return 'bg-purple-100 text-purple-800';
      case 'quiz': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="glass-card p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-xl font-semibold">Content Management</h2>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4" />
          <span>Add Content</span>
        </button>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <div className="flex overflow-x-auto pb-2 sm:pb-0 gap-2">
          {filters.map(filter => (
            <button
              key={filter.id}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap ${
                activeFilter === filter.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-foreground hover:bg-secondary/80'
              } transition-colors`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>
        
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            placeholder="Search content..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4 animate-fade-in">
        {filteredContent.map(item => (
          <div 
            key={item.id} 
            className="border border-border rounded-lg p-4 hover:shadow-md transition-all duration-200 bg-white"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="bg-secondary p-2 rounded-lg">
                  <FileText className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <h3 className="font-medium">{item.title}</h3>
                  <div className="flex items-center mt-2 space-x-2">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
                      {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                    </span>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Tag className="h-3 w-3 mr-1" />
                      {item.category}
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                  item.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </span>
                {item.status === 'published' && (
                  <p className="text-xs text-muted-foreground mt-1">{item.views.toLocaleString()} views</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredContent.length === 0 && (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No content found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default ContentManager;
