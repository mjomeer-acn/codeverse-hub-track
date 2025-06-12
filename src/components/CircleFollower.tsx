
import React, { useEffect, useState } from 'react';

const CircleFollower = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className="fixed pointer-events-none z-50 w-6 h-6 bg-gradient-primary rounded-full opacity-30 transition-all duration-150 ease-out"
      style={{
        left: position.x - 12,
        top: position.y - 12,
        transform: 'scale(1)',
      }}
    />
  );
};

export default CircleFollower;
