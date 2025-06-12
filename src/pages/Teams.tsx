
import React from 'react';
import Navbar from '@/components/Navbar';
import TeamCard from '@/components/TeamCard';

const Teams = () => {
  const mockTeams = [
    {
      id: 1,
      name: 'Neural Ninjas',
      description: 'A passionate team focused on AI and machine learning solutions. We specialize in neural networks and deep learning applications.',
      members: [
        { name: 'Alex Chen', role: 'ML Engineer', avatar: '👨‍💻' },
        { name: 'Sarah Kim', role: 'Data Scientist', avatar: '👩‍🔬' },
        { name: 'Mike Johnson', role: 'Backend Dev', avatar: '👨‍💼' },
        { name: 'Emily Davis', role: 'Frontend Dev', avatar: '👩‍💻' },
      ],
      points: 2850,
      challenges: ['AI Challenge', 'Web Development', 'Data Science'],
      avatar: '🧠',
      photo: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c'
    },
    {
      id: 2,
      name: 'Code Crusaders',
      description: 'Full-stack developers committed to building scalable and robust applications with modern technologies.',
      members: [
        { name: 'David Wilson', role: 'Team Lead', avatar: '👨‍💼' },
        { name: 'Lisa Zhang', role: 'Full Stack Dev', avatar: '👩‍💻' },
        { name: 'Tom Brown', role: 'DevOps', avatar: '👨‍🔧' },
        { name: 'Anna Smith', role: 'UI/UX Designer', avatar: '👩‍🎨' },
        { name: 'Jake Taylor', role: 'Backend Dev', avatar: '👨‍💻' },
      ],
      points: 2720,
      challenges: ['Web Development', 'Mobile Development'],
      avatar: '⚔️',
      photo: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158'
    },
    {
      id: 3,
      name: 'Pixel Pioneers',
      description: 'Creative minds specializing in user experience and interface design, bringing ideas to life through beautiful digital experiences.',
      members: [
        { name: 'Maya Patel', role: 'UI/UX Lead', avatar: '👩‍🎨' },
        { name: 'Chris Lee', role: 'Frontend Dev', avatar: '👨‍💻' },
        { name: 'Sophie Turner', role: 'Graphic Designer', avatar: '👩‍🎨' },
      ],
      points: 2650,
      challenges: ['UI/UX Challenge', 'Web Development', 'Game Development'],
      avatar: '🎨',
      photo: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7'
    },
    {
      id: 4,
      name: 'Quantum Queriers',
      description: 'Data enthusiasts exploring the frontiers of quantum computing and advanced analytics to solve complex problems.',
      members: [
        { name: 'Dr. Rachel Green', role: 'Research Lead', avatar: '👩‍🔬' },
        { name: 'Kevin Park', role: 'Data Engineer', avatar: '👨‍💻' },
        { name: 'Nicole Adams', role: 'Analyst', avatar: '👩‍💼' },
        { name: 'Ryan Murphy', role: 'Algorithm Dev', avatar: '👨‍🔬' },
      ],
      points: 2480,
      challenges: ['Data Science', 'AI Challenge'],
      avatar: '🔬',
      photo: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b'
    },
  ];

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
            {mockTeams.map((team) => (
              <TeamCard key={team.id} team={team} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teams;
