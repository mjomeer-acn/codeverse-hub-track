
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';
import { useAuth } from '@/hooks/useAuth';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Leaderboard', href: '/leaderboard' },
    { name: 'Teams', href: '/teams' },
    { name: 'Challenges', href: '/challenges' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
  };

  const getBackofficeLink = () => {
    if (user?.role === 'admin') {
      return '/admin/dashboard';
    } else if (user?.role === 'team_lead') {
      return '/team/dashboard';
    }
    return '/';
  };

  return (
    <div>
      <style>{`
        #lovable-badge {
          display: none !important;
        }
      `}</style>
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <span className="text-white font-bold text-sm">CV</span>
              </div>
              <span className="font-bold text-xl gradient-text">CodeVerse 2025</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive(item.href) 
                      ? 'text-primary border-b-2 border-primary pb-1' 
                      : 'text-muted-foreground'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <DarkModeToggle />
              
              {user ? (
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    asChild
                    className="border-codeverse-accent text-codeverse-accent hover:bg-codeverse-accent hover:text-white"
                  >
                    <Link to={getBackofficeLink()}>
                      {user.role === 'admin' ? 'Admin Panel' : 'Team Dashboard'}
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleSignOut}
                    className="border-codeverse-accent text-codeverse-accent hover:bg-codeverse-accent hover:text-white"
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Button 
                  asChild 
                  variant="outline" 
                  className="border-codeverse-accent text-codeverse-accent hover:bg-codeverse-accent hover:text-white"
                >
                  <Link to="/auth">Sign In</Link>
                </Button>
              )}
            </div>

            {/* Mobile Navigation */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4 mt-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-lg font-medium transition-colors hover:text-primary ${
                        isActive(item.href) ? 'text-primary' : 'text-muted-foreground'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Dark Mode</span>
                    <DarkModeToggle />
                  </div>
                  
                  {user ? (
                    <div className="space-y-2">
                      <Button 
                        asChild
                        className="w-full bg-gradient-primary hover:opacity-90"
                      >
                        <Link to={getBackofficeLink()} onClick={() => setIsOpen(false)}>
                          {user.role === 'admin' ? 'Admin Panel' : 'Team Dashboard'}
                        </Link>
                      </Button>
                      <Button 
                        onClick={handleSignOut}
                        variant="outline"
                        className="w-full"
                      >
                        Sign Out
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      asChild 
                      className="w-full bg-gradient-primary hover:opacity-90"
                    >
                      <Link to="/auth" onClick={() => setIsOpen(false)}>Sign In</Link>
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
