
import React from 'react';
import Navbar from '@/components/Navbar';
import LeaderboardTable from '@/components/LeaderboardTable';

const Leaderboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold gradient-text">Live Leaderboard</h1>
            <p className="text-xl text-muted-foreground">
              Track team progress and see who's leading the way
            </p>
          </div>
          
          <LeaderboardTable />
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
