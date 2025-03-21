
import React, { useState } from 'react';
import { Edit, MoreHorizontal, Search, UserPlus, X } from 'lucide-react';

const UserManagement = () => {
  const [searchValue, setSearchValue] = useState('');
  
  // Mock data for users
  const users = [
    { id: 1, name: 'Alex Johnson', email: 'alex@example.com', role: 'Developer', status: 'Active', joinDate: '2023-06-12' },
    { id: 2, name: 'Sarah Williams', email: 'sarah@example.com', role: 'Designer', status: 'Active', joinDate: '2023-07-24' },
    { id: 3, name: 'Michael Chen', email: 'michael@example.com', role: 'Product Manager', status: 'Inactive', joinDate: '2023-04-08' },
    { id: 4, name: 'Emma Davis', email: 'emma@example.com', role: 'Developer', status: 'Active', joinDate: '2023-08-10' },
    { id: 5, name: 'James Wilson', email: 'james@example.com', role: 'Data Scientist', status: 'Active', joinDate: '2023-05-29' }
  ];

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchValue.toLowerCase()) ||
    user.email.toLowerCase().includes(searchValue.toLowerCase()) ||
    user.role.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="glass-card p-6 overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-xl font-semibold">User Management</h2>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              placeholder="Search users..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            {searchValue && (
              <button 
                onClick={() => setSearchValue('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
              </button>
            )}
          </div>
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors">
            <UserPlus className="h-4 w-4" />
            <span>Add User</span>
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Name</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Email</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Role</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Join Date</th>
              <th className="text-right py-3 px-4 font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                <td className="py-3 px-4">{user.name}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">{user.role}</td>
                <td className="py-3 px-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="py-3 px-4">{new Date(user.joinDate).toLocaleDateString()}</td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1 rounded-md hover:bg-secondary transition-colors">
                      <Edit className="h-4 w-4 text-muted-foreground" />
                    </button>
                    <button className="p-1 rounded-md hover:bg-secondary transition-colors">
                      <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Showing {filteredUsers.length} of {users.length} users</p>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 rounded bg-secondary hover:bg-secondary/80 text-sm transition-colors">Previous</button>
          <button className="px-3 py-1 rounded bg-primary text-primary-foreground hover:bg-primary/90 text-sm transition-colors">Next</button>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
