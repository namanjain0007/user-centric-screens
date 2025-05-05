
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import UsersPage from "./pages/UsersPage";
import NotificationsPage from "./pages/NotificationsPage";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            {/* Placeholder routes - these would be implemented in a complete app */}
            <Route path="/attendance" element={<div className="text-center py-20">Attendance Page - Coming Soon</div>} />
            <Route path="/project" element={<div className="text-center py-20">Project Management - Coming Soon</div>} />
            <Route path="/timesheet" element={<div className="text-center py-20">Timesheet - Coming Soon</div>} />
            <Route path="/payments" element={<div className="text-center py-20">Payments - Coming Soon</div>} />
            <Route path="/settings" element={<div className="text-center py-20">Settings - Coming Soon</div>} />
            <Route path="/help" element={<div className="text-center py-20">Help & Support - Coming Soon</div>} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
