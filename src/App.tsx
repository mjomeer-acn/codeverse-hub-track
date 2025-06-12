
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import CircleFollower from "./components/CircleFollower";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import Leaderboard from "./pages/Leaderboard";
import Teams from "./pages/Teams";
import TeamDetail from "./pages/TeamDetail";
import Challenges from "./pages/Challenges";
import ChallengeDetail from "./pages/ChallengeDetail";
import Auth from "./pages/Auth";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminTeams from "./pages/admin/Teams";
import AdminLeaderboard from "./pages/admin/Leaderboard";
import AdminChallenges from "./pages/admin/Challenges";
import TeamDashboard from "./pages/team/Dashboard";
import TeamProfile from "./pages/team/Profile";
import TeamManagement from "./pages/team/Management";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <CircleFollower />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/teams/:id" element={<TeamDetail />} />
            <Route path="/challenges" element={<Challenges />} />
            <Route path="/challenges/:id" element={<ChallengeDetail />} />
            <Route path="/auth" element={<Auth />} />
            
            {/* Admin Protected Routes */}
            <Route path="/admin/dashboard" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/teams" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminTeams />
              </ProtectedRoute>
            } />
            <Route path="/admin/leaderboard" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminLeaderboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/challenges" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminChallenges />
              </ProtectedRoute>
            } />
            
            {/* Team Lead Protected Routes */}
            <Route path="/team/dashboard" element={
              <ProtectedRoute allowedRoles={['team_lead']}>
                <TeamDashboard />
              </ProtectedRoute>
            } />
            <Route path="/team/:teamId/profile" element={
              <ProtectedRoute allowedRoles={['team_lead']}>
                <TeamProfile />
              </ProtectedRoute>
            } />
            <Route path="/team/:teamId/management" element={
              <ProtectedRoute allowedRoles={['team_lead']}>
                <TeamManagement />
              </ProtectedRoute>
            } />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
