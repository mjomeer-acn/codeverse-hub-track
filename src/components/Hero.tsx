
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Users, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const stats = [
    { icon: Users, label: 'Teams Registered', value: '42' },
    { icon: Calendar, label: 'Days Remaining', value: '7' },
    { icon: Trophy, label: 'Total Prizes', value: '$50K' },
  ];

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Enhanced background gradient */}
      <div className="absolute inset-0 bg-gradient-primary opacity-5"></div>
      
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-codeverse-accent/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-codeverse-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        {/* More floating geometric shapes */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-codeverse-accent/20 rotate-45 animate-bounce delay-300"></div>
        <div className="absolute top-1/3 right-1/3 w-6 h-6 bg-codeverse-primary/20 rounded-full animate-ping delay-700"></div>
        <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-codeverse-secondary/30 rotate-12 animate-pulse delay-1500"></div>
        <div className="absolute top-2/3 right-1/4 w-5 h-5 bg-gradient-primary opacity-20 rounded-sm animate-bounce delay-2000"></div>
        
        {/* Additional shapes for more visual interest */}
        <div className="absolute top-10 right-20 w-8 h-8 bg-codeverse-accent/15 transform rotate-45 animate-spin-slow"></div>
        <div className="absolute bottom-10 left-20 w-6 h-6 bg-codeverse-primary/15 rounded-full animate-float delay-500"></div>
        <div className="absolute top-1/2 right-10 w-10 h-1 bg-codeverse-secondary/20 animate-pulse delay-800"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1 h-10 bg-codeverse-accent/20 animate-pulse delay-1200"></div>
        <div className="absolute top-3/4 left-10 w-12 h-12 bg-codeverse-primary/10 transform rotate-12 animate-bounce delay-1800"></div>
        <div className="absolute top-16 left-1/2 w-2 h-16 bg-gradient-primary opacity-15 transform rotate-45 animate-float delay-2200"></div>
        
        {/* Animated gradient orbs */}
        <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-gradient-to-r from-codeverse-primary/10 to-codeverse-accent/10 rounded-full blur-2xl animate-spin-slow"></div>
        <div className="absolute bottom-1/4 right-1/2 w-24 h-24 bg-gradient-to-r from-codeverse-secondary/10 to-codeverse-primary/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-1/6 right-1/6 w-40 h-40 bg-gradient-to-r from-codeverse-accent/8 to-codeverse-secondary/8 rounded-full blur-3xl animate-pulse delay-3000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center space-y-8 animate-fade-in">
          {/* Main heading - removed boxed animation */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              <span className="gradient-text">CodeVerse</span>
              <br />
              <span className="text-4xl md:text-6xl text-foreground">2025</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Where innovation meets collaboration. Join the ultimate internal hackathon 
              and push the boundaries of what's possible.
            </p>
          </div>

          {/* Call to action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:opacity-90 text-white px-8 py-6 text-lg hover:scale-105 transition-transform"
              asChild
            >
              <Link to="/leaderboard">
                View Leaderboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-codeverse-accent text-codeverse-accent hover:bg-codeverse-accent hover:text-white px-8 py-6 text-lg hover:scale-105 transition-transform"
              asChild
            >
              <Link to="/teams">Explore Teams</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-16">
            {stats.map((stat, index) => (
              <div 
                key={stat.label} 
                className="bg-card/50 backdrop-blur-sm border rounded-lg p-6 hover:shadow-lg transition-all duration-300 animate-slide-up hover:scale-105"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex items-center justify-center space-x-3">
                  <div className="p-2 rounded-lg bg-gradient-primary">
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
