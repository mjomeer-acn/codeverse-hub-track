
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ChallengeCard from '@/components/ChallengeCard';
import { dataService, Challenge } from '@/services/dataService';

const Challenges = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchChallenges();
  }, []);

  const fetchChallenges = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Challenges page: Starting to fetch challenges...');
      
      const challengesData = await dataService.getChallenges();
      console.log('Challenges page: Received challenges data:', challengesData);
      
      setChallenges(challengesData || []);
    } catch (error) {
      console.error('Challenges page: Error fetching challenges:', error);
      setError('Failed to load challenges. Please try again.');
      setChallenges([]);
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
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading challenges...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="text-center">
              <p className="text-red-500 mb-4">{error}</p>
              <button 
                onClick={fetchChallenges}
                className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
              >
                Try Again
              </button>
            </div>
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
            <h1 className="text-4xl font-bold gradient-text">Challenges</h1>
            <p className="text-xl text-muted-foreground">
              Explore the exciting challenges and showcase your skills
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges && challenges.length > 0 ? (
              challenges.map((challenge) => (
                <ChallengeCard key={challenge.id} challenge={challenge} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No challenges found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Challenges;
