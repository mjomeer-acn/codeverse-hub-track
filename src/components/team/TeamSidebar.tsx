
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  LogOut,
  Home
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const TeamSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/team/dashboard' },
    { icon: Users, label: 'Manage Team', path: '/team/1/management' },
  ];

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="w-64 bg-card border-r border-border flex flex-col">
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-bold gradient-text">Team Dashboard</h2>
      </div>
      
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item.path}
              variant={location.pathname === item.path ? "default" : "ghost"}
              className={`w-full justify-start ${
                location.pathname === item.path 
                  ? "bg-gradient-primary text-white" 
                  : "hover:bg-muted"
              }`}
              asChild
            >
              <Link to={item.path}>
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Link>
            </Button>
          ))}
        </div>
      </nav>

      <div className="p-4 border-t border-border space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start"
          asChild
        >
          <Link to="/">
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default TeamSidebar;
