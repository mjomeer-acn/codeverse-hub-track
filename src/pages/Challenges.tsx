
import React from 'react';
import Navbar from '@/components/Navbar';
import ChallengeCard from '@/components/ChallengeCard';

const Challenges = () => {
  const mockChallenges = [
    {
      id: 1,
      title: 'AI Innovation Challenge',
      description: 'Build an AI-powered solution that addresses a real-world problem. Use machine learning, NLP, or computer vision to create something innovative.',
      difficulty: 'Hard' as const,
      category: 'Artificial Intelligence',
      timeRemaining: '3 days',
      participatingTeams: 12,
      maxPoints: 1000,
      isVisible: true,
      icon: '🤖'
    },
    {
      id: 2,
      title: 'Full-Stack Web Application',
      description: 'Create a complete web application with frontend, backend, and database integration. Focus on user experience and scalability.',
      difficulty: 'Medium' as const,
      category: 'Web Development',
      timeRemaining: '5 days',
      participatingTeams: 18,
      maxPoints: 800,
      isVisible: true,
      icon: '🌐'
    },
    {
      id: 3,
      title: 'Mobile App Development',
      description: 'Design and develop a mobile application for iOS or Android. Emphasis on intuitive UI/UX and performance optimization.',
      difficulty: 'Medium' as const,
      category: 'Mobile Development',
      timeRemaining: '4 days',
      participatingTeams: 8,
      maxPoints: 750,
      isVisible: true,
      icon: '📱'
    },
    {
      id: 4,
      title: 'Data Visualization Dashboard',
      description: 'Create an interactive dashboard that visualizes complex data sets. Make data insights accessible and actionable.',
      difficulty: 'Easy' as const,
      category: 'Data Science',
      timeRemaining: '6 days',
      participatingTeams: 15,
      maxPoints: 600,
      isVisible: true,
      icon: '📊'
    },
    {
      id: 5,
      title: 'Cybersecurity Solution',
      description: 'Develop a tool or system that enhances cybersecurity. Focus on threat detection, prevention, or security automation.',
      difficulty: 'Hard' as const,
      category: 'Security',
      timeRemaining: '2 days',
      participatingTeams: 6,
      maxPoints: 950,
      isVisible: true,
      icon: '🔒'
    },
    {
      id: 6,
      title: 'Cloud Infrastructure Optimization',
      description: 'Build solutions for cloud infrastructure management, monitoring, or cost optimization using modern cloud platforms.',
      difficulty: 'Medium' as const,
      category: 'DevOps',
      timeRemaining: '7 days',
      participatingTeams: 10,
      maxPoints: 700,
      isVisible: true,
      icon: '☁️'
    }
  ];

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
            {mockChallenges.map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Challenges;
