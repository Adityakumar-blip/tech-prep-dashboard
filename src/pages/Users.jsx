
import React from 'react';
import UserManagement from '../components/UserManagement';

const Users = () => {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <div className="text-sm text-muted-foreground">
          Total Users: 150
        </div>
      </div>
      
      <UserManagement />
    </>
  );
};

export default Users;
