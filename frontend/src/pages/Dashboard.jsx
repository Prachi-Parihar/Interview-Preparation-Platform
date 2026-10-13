import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar.jsx";
import { useNavigate } from "react-router-dom";
import api from "../utils/api.js";
import { motion } from "motion/react";
import {
  FiSidebar,
  FiArrowUpRight,
  FiActivity,
  FiBriefcase,
  FiCheckCircle,
  FiMessageSquare,
  FiTrendingUp,
} from "react-icons/fi";
import { getAllInterviews } from "../apis/interviewApi.js";
import Statbox from "../components/Statbox.jsx";
import InterviewGraph from "../components/InterviewGraph.jsx";

function Dashboard({ user, setUser }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const [stats, setStats] = useState({
    totalInterviews: 0,
    totalQuestions: 0,
    completed: 0,
    averageScore: 0,
  });

  const [technicalData, setTechnicalData] = useState([]);
  const [hrData, setHrData] = useState([]);
  const [technicalCount, setTechnicalCount] = useState(0);
  const [hrCount, setHrCount] = useState(0);

  const navigate = useNavigate();
  const firstName = user?.name?.trim()?.split(/\s+/)[0] || "Developer";

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const response = await getAllInterviews();

        if (!response) return;

        setStats({
          totalInterviews: response.stats?.totalInterviews || 0,
          totalQuestions: response.stats?.totalQuestions || 0,
          completed: response.stats?.completed || 0,
          averageScore: response.stats?.averageScore || 0,
        });

        setTechnicalData(response.technicalData || []);
        setHrData(response.hrData || []);
        setTechnicalCount(response.technicalCount || 0);
        setHrCount(response.hrCount || 0);
      } catch (error) {
        console.log("Fetch interviews error:", error);
      }
    };

    fetchInterviews();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await api.get("/auth/logout");

      if (response.data.success) {
        setUser(null);
        navigate("/");
      }
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f7f8] font-sans text-gray-900">
      <Sidebar
        user={user}
        onNewInterview={() => navigate("/interview")}
        onLogout={handleLogout}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <motion.main
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`min-h-screen px-4 py-5 sm:px-6 lg:px-8 lg:py-8 ${
          sidebarOpen ? "md:ml-[260px]" : "md:ml-[72px]"
        }`}
      >
        <div className="mx-auto max-w-[1500px]">
          {/* Header */}
          <header className="mb-7 flex flex-wrap items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-label="Open sidebar"
                className="rounded-xl border border-gray-200 bg-white p-2.5 text-gray-700 transition hover:bg-gray-100 md:hidden"
              >
                <FiSidebar size={19} />
              </button>

              <div>
                <p className="mb-1 text-xs font-medium text-gray-500">
                  Your workspace / Dashboard
                </p>

                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Dashboard
                </h1>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate("/interview")}
              className="flex shrink-0 items-center gap-2 rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              New Interview
              <FiArrowUpRight size={17} />
            </button>
          </header>

          {/* Welcome Section */}
          <section className="mb-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="flex flex-col justify-between gap-6 p-5 sm:p-7 lg:flex-row lg:items-center">
              <div className="min-w-0">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600">
                  <FiActivity size={14} />
                  Your Interview Workspace
                </div>

                <h2 className="break-words text-2xl font-bold tracking-tight sm:text-3xl">
                  Welcome back, {firstName}!
                </h2>

                <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
                  Track your progress, review your performance, and
                  build confidence with every interview you complete.
                </p>

                <button
                  type="button"
                  onClick={() => navigate("/interview")}
                  className="mt-5 inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
                >
                  Start Practicing
                  <FiArrowUpRight size={16} />
                </button>
              </div>

              <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-gray-50 p-4 sm:min-w-[220px]">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-black text-lg font-bold text-white">
                  {firstName.charAt(0).toUpperCase()}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-gray-900">
                    {user?.name || "Developer"}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Interview Prep
                  </p>

                  <div className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-gray-600">
                    <span className="h-2 w-2 rounded-full bg-green-500" />
                    Ready to practice
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Performance Overview */}
          <section className="mb-8">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold sm:text-xl">
                  Performance Overview
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  A quick look at your interview activity.
                </p>
              </div>

              <span className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-500">
                All Time
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <Statbox
                label="Total Interviews"
                value={stats.totalInterviews}
                subHighlight="All Time"
                sub="Interviews Created"
                index={0}
              />

              <Statbox
                label="Questions Solved"
                value={stats.totalQuestions}
                subHighlight="Answered"
                sub="Across All Interviews"
                index={1}
              />

              <Statbox
                label="Completed"
                value={stats.completed}
                subHighlight={`${stats.totalInterviews} Total`}
                sub="Interviews Finished"
                index={2}
              />

              <Statbox
                label="Average Score"
                value={`${Math.round(stats.averageScore)}%`}
                subHighlight="Completed Only"
                sub="Average Performance"
                index={3}
              />
            </div>
          </section>

          {/* Interview Types */}
          <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div>
                <p className="text-sm text-gray-500">Technical Interviews</p>
                <p className="mt-2 text-2xl font-bold">{technicalCount}</p>
                <p className="mt-1 text-xs text-gray-400">
                  Technical practice sessions
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-gray-800">
                <FiBriefcase size={22} />
              </div>
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div>
                <p className="text-sm text-gray-500">HR Interviews</p>
                <p className="mt-2 text-2xl font-bold">{hrCount}</p>
                <p className="mt-1 text-xs text-gray-400">
                  Communication and HR practice
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-gray-800">
                <FiMessageSquare size={22} />
              </div>
            </div>
          </section>

          {/* Interview Analytics */}
          <section className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-gray-400">
                  <FiTrendingUp size={14} />
                  Performance Analytics
                </div>

                <h3 className="text-lg font-bold sm:text-xl">
                  Interview History
                </h3>

                <p className="mt-1 text-sm leading-5 text-gray-500">
                  Compare your technical and HR interview progress.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 text-xs font-medium">
                <span className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-gray-600">
                  Technical: {technicalCount}
                </span>

                <span className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-gray-600">
                  HR: {hrCount}
                </span>
              </div>
            </div>

            <div className="min-w-0">
              <InterviewGraph
                technicalData={technicalData}
                technicalCount={technicalCount}
                hrData={hrData}
                hrCount={hrCount}
              />
            </div>
          </section>

          {/* Footer */}
          <footer className="py-7 text-center text-xs text-gray-400">
            Keep practicing. Every interview is progress.
          </footer>
        </div>
      </motion.main>
    </div>
  );
}

export default Dashboard;
