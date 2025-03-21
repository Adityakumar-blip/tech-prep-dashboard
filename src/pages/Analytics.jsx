
import React from 'react';
import AnalyticsPanel from '../components/AnalyticsPanel';

const Analytics = () => {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Analytics</h1>
        <div className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>
      
      <AnalyticsPanel />
      
      <div className="glass-card p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">Detailed Analytics</h2>
        <p className="text-muted-foreground">Advanced analytics features will be displayed here.</p>
      </div>
    </>
  );
};

export default Analytics;
