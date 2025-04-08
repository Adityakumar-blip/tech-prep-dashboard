import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  FileQuestion,
  BarChart2,
  Settings,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Calendar,
  Tag,
  CloudRainWind,
  Dices,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: Users, label: "Users", href: "/users" },
    { icon: FileQuestion, label: "Questions", href: "/questions" },
    { icon: Dices, label: "Topics", href: "/topics" },
    { icon: BookOpen, label: "Resources", href: "/resources" },
    { icon: Tag, label: "Categories", href: "/categories" },
    { icon: Calendar, label: "Sessions", href: "/sessions" },
    { icon: BarChart2, label: "Analytics", href: "/analytics" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  return (
    <aside
      className={`h-screen sticky top-0 bg-sidebar z-30 border-r border-border transition-all duration-300 ${
        collapsed ? "w-[4.5rem]" : "w-64"
      }`}
    >
      <div className="flex flex-col h-full">
        <div
          className={`flex items-center ${
            collapsed ? "justify-center" : "justify-between"
          } p-4 h-[4.5rem]`}
        >
          {!collapsed && (
            <h1 className="text-xl font-semibold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent animate-pulse">
              Dlabss_
            </h1>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-sidebar-accent transition-colors"
          >
            {collapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </button>
        </div>

        <nav className="flex-1 py-6 px-3 space-y-1.5 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`sidebar-item group ${isActive ? "active" : ""}`}
              >
                <item.icon className="h-5 w-5" />
                {!collapsed && (
                  <span className="transition-opacity duration-200">
                    {item.label}
                  </span>
                )}
                {collapsed && (
                  <div className="absolute left-full ml-3 px-3 py-1.5 rounded-lg bg-popover text-popover-foreground shadow-lg text-sm whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150">
                    {item.label}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <div
            className={`flex ${
              collapsed ? "justify-center" : "items-center gap-3"
            }`}
          >
            <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
              A
            </div>
            {!collapsed && (
              <div>
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-muted-foreground">Admin</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
