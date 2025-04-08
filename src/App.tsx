import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Questions from "./pages/Questions";
import Resources from "./pages/Resources";
import Categories from "./pages/Categories";
import Sessions from "./pages/Sessions";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Topics from "./pages/Topics";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import AuthGuard from "./components/AuthGuard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <AuthGuard>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </AuthGuard>
              }
            />
            <Route
              path="users"
              element={
                <AuthGuard>
                  <Layout>
                    <Users />
                  </Layout>
                </AuthGuard>
              }
            />
            <Route
              path="questions"
              element={
                <AuthGuard>
                  <Layout>
                    <Questions />
                  </Layout>
                </AuthGuard>
              }
            />
            <Route
              path="topics"
              element={
                <AuthGuard>
                  <Layout>
                    <Topics />
                  </Layout>
                </AuthGuard>
              }
            />
            <Route
              path="resources"
              element={
                <AuthGuard>
                  <Layout>
                    <Resources />
                  </Layout>
                </AuthGuard>
              }
            />
            <Route
              path="categories"
              element={
                <AuthGuard>
                  <Layout>
                    <Categories />
                  </Layout>
                </AuthGuard>
              }
            />
            <Route
              path="sessions"
              element={
                <AuthGuard>
                  <Layout>
                    <Sessions />
                  </Layout>
                </AuthGuard>
              }
            />
            <Route
              path="analytics"
              element={
                <AuthGuard>
                  <Layout>
                    <Analytics />
                  </Layout>
                </AuthGuard>
              }
            />
            <Route
              path="settings"
              element={
                <AuthGuard>
                  <Layout>
                    <Settings />
                  </Layout>
                </AuthGuard>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
