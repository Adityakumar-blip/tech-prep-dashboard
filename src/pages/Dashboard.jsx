
import React from 'react';
import DashboardStats from '../components/DashboardStats';
import AnalyticsPanel from '../components/AnalyticsPanel';
import ContentManager from '../components/ContentManager';
import { Calendar, Clock, FileText, Users } from 'lucide-react';

const RecentActivity = () => {
  const activities = [
    { icon: Users, message: 'New user registered', user: 'Sarah Kim', time: '5 minutes ago' },
    { icon: FileText, message: 'New question added', user: 'David Chen', time: '1 hour ago' },
    { icon: Calendar, message: 'Mock interview scheduled', user: 'Alex Johnson', time: '3 hours ago' },
    { icon: Clock, message: 'User completed practice session', user: 'Emily Wang', time: '6 hours ago' }
  ];

  return (
    <div className="glass-card p-6">
      <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
            <div className="bg-secondary rounded-full p-2 mt-0.5">
              <activity.icon className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">{activity.message}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-primary">{activity.user}</span>
                <span className="h-1 w-1 rounded-full bg-muted-foreground"></span>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Dashboard = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>
      
      {/* Stats Cards */}
      <DashboardStats />
      
      {/* Analytics Panel */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Analytics Overview</h2>
        <AnalyticsPanel />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-1">
          <RecentActivity />
        </div>
        
        {/* Content Management */}
        <div className="lg:col-span-2">
          <ContentManager />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
