
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
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-primary opacity-5"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-codeverse-accent/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-codeverse-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center space-y-8 animate-fade-in">
          {/* Main heading */}
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
              className="bg-gradient-primary hover:opacity-90 text-white px-8 py-6 text-lg animate-pulse-glow"
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
              className="border-codeverse-accent text-codeverse-accent hover:bg-codeverse-accent hover:text-white px-8 py-6 text-lg"
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
                className="bg-card/50 backdrop-blur-sm border rounded-lg p-6 hover:shadow-lg transition-all duration-300 animate-slide-up"
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
