
import React, { useState } from 'react';
import { Bell, Search, Settings, User } from 'lucide-react';

const Header = () => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <header className="w-full bg-white bg-opacity-80 backdrop-blur-md border-b border-border sticky top-0 z-50 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 w-full max-w-md">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
            <input
              type="text"
              className="pl-10 pr-4 py-2 w-full bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="relative p-2 rounded-full hover:bg-secondary transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2.5 w-2.5 bg-destructive rounded-full"></span>
          </button>
          
          <button className="p-2 rounded-full hover:bg-secondary transition-colors">
            <Settings className="h-5 w-5" />
          </button>
          
          <div className="flex items-center gap-3 ml-4">
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-muted-foreground">admin@techprep.com</p>
            </div>
            <button className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
              <User className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
