
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Calendar, ChevronDown } from 'lucide-react';

const timeRanges = ['Last 7 days', 'Last 30 days', 'Last 3 months', 'Last year'];

// Mock data for user activity
const userActivityData = [
  { name: 'Mon', active: 120, inactive: 20 },
  { name: 'Tue', active: 145, inactive: 15 },
  { name: 'Wed', active: 135, inactive: 25 },
  { name: 'Thu', active: 160, inactive: 30 },
  { name: 'Fri', active: 180, inactive: 20 },
  { name: 'Sat', active: 90, inactive: 10 },
  { name: 'Sun', active: 75, inactive: 5 }
];

// Mock data for content categories
const categoryData = [
  { name: 'Algorithms', value: 35 },
  { name: 'System Design', value: 25 },
  { name: 'Frontend', value: 20 },
  { name: 'Backend', value: 15 },
  { name: 'Databases', value: 5 }
];

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f97316', '#10b981'];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-md rounded-lg border border-border">
        <p className="font-medium">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.name}: {entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const AnalyticsPanel = () => {
  const [timeRange, setTimeRange] = useState(timeRanges[0]);
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* User Activity Chart */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">User Activity</h2>
          <div className="relative">
            <button 
              className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg bg-secondary"
              onClick={() => setShowTimeDropdown(!showTimeDropdown)}
            >
              {timeRange}
              <ChevronDown className="h-4 w-4" />
            </button>
            
            {showTimeDropdown && (
              <div className="absolute right-0 mt-1 w-40 bg-white rounded-lg shadow-lg border border-border z-10">
                {timeRanges.map((range) => (
                  <button
                    key={range}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-secondary transition-colors"
                    onClick={() => {
                      setTimeRange(range);
                      setShowTimeDropdown(false);
                    }}
                  >
                    {range}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={userActivityData}
              margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
            >
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="active" stackId="a" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="inactive" stackId="a" fill="#93c5fd" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Content Categories Chart */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Content Categories</h2>
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg bg-secondary">
            <Calendar className="h-4 w-4" />
            This Month
          </button>
        </div>
        
        <div className="h-72 flex justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip formatter={(value) => `${value}%`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPanel;
