
import React from 'react';
import { Users, FileText, Clock, Award, TrendingUp, UserCheck } from 'lucide-react';

const StatCard = ({ icon: Icon, title, value, trend, color }) => {
  return (
    <div className="stats-card">
      <div className="flex items-center justify-between mb-4">
        <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div className="flex items-center">
          <TrendingUp className={`h-4 w-4 ${trend >= 0 ? 'text-green-500' : 'text-red-500'} mr-1`} />
          <span className={`text-sm ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {trend}%
          </span>
        </div>
      </div>
      <h3 className="text-lg font-medium mb-1">{value}</h3>
      <p className="text-sm text-muted-foreground">{title}</p>
    </div>
  );
};

const DashboardStats = () => {
  const stats = [
    { 
      icon: Users, 
      title: 'Total Users', 
      value: '12,548', 
      trend: 12.5,
      color: 'bg-blue-500' 
    },
    { 
      icon: FileText, 
      title: 'Questions', 
      value: '1,429', 
      trend: 8.2,
      color: 'bg-indigo-500' 
    },
    { 
      icon: UserCheck, 
      title: 'Mock Interviews', 
      value: '8,392', 
      trend: 23.1,
      color: 'bg-purple-500' 
    },
    { 
      icon: Clock, 
      title: 'Avg. Time', 
      value: '42 min', 
      trend: -2.4,
      color: 'bg-pink-500' 
    },
    { 
      icon: Award, 
      title: 'Success Rate', 
      value: '68.7%', 
      trend: 5.3,
      color: 'bg-emerald-500' 
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default DashboardStats;
