
import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import DashboardStats from '../components/DashboardStats';
import UserManagement from '../components/UserManagement';
import ContentManager from '../components/ContentManager';
import AnalyticsPanel from '../components/AnalyticsPanel';
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

const DashboardIndex = () => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-screen-2xl mx-auto space-y-8 pb-10">
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
              {/* User Management */}
              <div className="lg:col-span-2">
                <UserManagement />
              </div>
              
              {/* Recent Activity */}
              <div>
                <RecentActivity />
              </div>
            </div>
            
            {/* Content Management */}
            <div>
              <ContentManager />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardIndex;
