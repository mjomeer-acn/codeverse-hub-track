
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import TeamCard from '@/components/TeamCard';
import { teamsService } from '@/services/supabaseService';

const Teams = () => {
  const [teams, setTeams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      console.log('Fetching teams...');
      const teamsData = await teamsService.getTeams();
      console.log('Fetched teams:', teamsData);
      setTeams(teamsData || []);
    } catch (error) {
      console.error('Error fetching teams:', error);
      setTeams([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold gradient-text">Teams</h1>
            <p className="text-xl text-muted-foreground">
              Meet the talented teams competing in CodeVerse 2025
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams && teams.length > 0 ? (
              teams.map((team) => (
                <TeamCard key={team.id} team={team} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No teams found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teams;
