
import React, { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Trophy, Target, Calendar } from 'lucide-react';
import { dataService } from '@/services/dataService';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalTeams: 0,
    activeChallenges: 0,
    totalPointsAwarded: 0,
    daysRemaining: 7
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Admin Dashboard: Fetching stats...');
      
      const statsData = await dataService.getDashboardStats();
      console.log('Admin Dashboard: Received stats:', statsData);
      
      setStats(statsData);
    } catch (error) {
      console.error('Admin Dashboard: Error fetching stats:', error);
      setError('Failed to load dashboard statistics');
    } finally {
      setLoading(false);
    }
  };

  const statsData = [
    { title: 'Total Teams', value: stats.totalTeams.toString(), icon: Users, color: 'text-blue-600' },
    { title: 'Active Challenges', value: stats.activeChallenges.toString(), icon: Target, color: 'text-green-600' },
    { title: 'Total Points Awarded', value: stats.totalPointsAwarded.toLocaleString(), icon: Trophy, color: 'text-yellow-600' },
    { title: 'Days Remaining', value: stats.daysRemaining.toString(), icon: Calendar, color: 'text-red-600' },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold gradient-text">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage CodeVerse 2025 hackathon</p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center min-h-[50vh]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center min-h-[50vh]">
              <div className="text-center">
                <p className="text-red-500 mb-4">{error}</p>
                <button 
                  onClick={fetchStats}
                  className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statsData.map((stat) => (
                  <Card key={stat.title}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                      <stat.icon className={`h-4 w-4 ${stat.color}`} />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stat.value}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <p className="text-sm">Teams are actively participating in challenges</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <p className="text-sm">Multiple teams have submitted solutions</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <p className="text-sm">Points have been awarded to top performers</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Use the sidebar to navigate to different admin sections:
                      </p>
                      <ul className="text-sm space-y-1">
                        <li>• Manage Teams - View and edit team details</li>
                        <li>• Manage Leaderboard - Assign points to teams</li>
                        <li>• Manage Challenges - Toggle challenge visibility</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
