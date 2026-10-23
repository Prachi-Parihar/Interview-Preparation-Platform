import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import api from "../utils/api.js";
import { motion } from "motion/react";
import {
  FiSidebar,
  FiArrowUpRight,
  FiActivity,
  FiBriefcase,
  FiMessageSquare,
  FiTrendingUp,
} from "react-icons/fi";

import { fetchInterviews } from "../redux/interviewSlice.js";
import Statbox from "../components/Statbox.jsx";
import InterviewGraph from "../components/InterviewGraph.jsx";

function Dashboard({ user, setUser }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    stats,
    technicalData,
    hrData,
    technicalCount,
    hrCount,
    loading,
    error,
  } = useSelector((state) => state.interview);

  const firstName =
    user?.name?.trim()?.split(/\s+/)[0] || "Developer";

  const initial = firstName.charAt(0).toUpperCase();

  useEffect(() => {
    dispatch(fetchInterviews());
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      await api.get("/auth/logout");
    } catch (error) {
      console.error("Logout API error:", error);
    } finally {
      setUser(null);
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f8fa] font-sans text-gray-900">
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
        className={`min-h-screen px-4 py-5 sm:px-6 lg:px-8 lg:py-7 ${
          sidebarOpen ? "md:ml-[260px]" : "md:ml-[72px]"
        }`}
      >
        <div className="mx-auto max-w-[1500px]">
          {/* Header */}
          <header className="mb-7 flex items-center justify-between gap-4">
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
                  Your Workspace / Dashboard
                </p>

                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Dashboard
                </h1>
              </div>
            </div>

            {/* Profile: icon, name, email and one Sign out dropdown */}
            <div className="relative shrink-0">
              <button
                type="button"
                onClick={() =>
                  setProfileOpen((prev) => !prev)
                }
                aria-label="Toggle profile menu"
                aria-expanded={profileOpen}
                className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-3 py-2 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#a91b56] focus:ring-offset-2"
              >
                {/* Profile icon */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#a91b56] text-sm font-bold text-white">
                  {initial}
                </div>

                {/* Name and email visible beside the icon */}
                <div className="hidden min-w-0 text-left sm:block">
                  <p className="max-w-[160px] truncate text-sm font-semibold text-gray-900">
                    {user?.name || "Developer"}
                  </p>

                  <p className="max-w-[180px] truncate text-xs text-gray-500">
                    {user?.email || "Email not available"}
                  </p>
                </div>
              </button>

              {/* Dropdown contains only Sign out */}
              {profileOpen && (
                <>
                  <button
                    type="button"
                    aria-label="Close profile menu"
                    className="fixed inset-0 z-40 cursor-default"
                    onClick={() => setProfileOpen(false)}
                  />

                  <div className="absolute right-0 top-full z-50 mt-2 w-40 rounded-xl border border-gray-200 bg-white p-2 shadow-lg">
                    <button
                      type="button"
                      onClick={() => {
                        setProfileOpen(false);
                        handleLogout();
                      }}
                      className="w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
                    >
                      Sign out
                    </button>
                  </div>
                </>
              )}
            </div>
          </header>

          {/* Welcome section */}
          <section className="mb-5 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
            <div className="relative flex flex-col justify-between gap-6 p-4 sm:p-5 lg:flex-row lg:items-center">
              <div className="pointer-events-none absolute -right-10 -top-20 h-64 w-64 rounded-full bg-gray-100/80 blur-3xl" />

              <div className="relative min-w-0">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600">
                  <FiActivity size={14} />
                  Your Interview Workspace
                </div>

                <h2 className="break-words text-2xl font-bold tracking-tight sm:text-3xl">
                  Welcome back,{" "}
                  <span className="text-[#9c2545]">
                    {firstName}!
                  </span>
                </h2>

                <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500">
                  Track your progress, improve your answers, and build
                  confidence with every interview you complete.
                </p>

                <button
                  type="button"
                  onClick={() => navigate("/interview")}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#abadb1] px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
                >
                  Start Practicing
                  <FiArrowUpRight size={17} />
                </button>
              </div>
            </div>
          </section>

          {/* Performance overview */}
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

              <span className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-500">
                All Time
              </span>
            </div>

            {error && (
              <p className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                {error}. Please refresh the page to try again.
              </p>
            )}

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

            {loading && (
              <p className="mt-3 text-sm text-gray-500">
                Updating interview statistics...
              </p>
            )}
          </section>

          {/* Interview counts */}
          <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="group flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Technical Interviews
                </p>

                <p className="mt-2 text-3xl font-bold tracking-tight">
                  {technicalCount}
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Technical practice sessions
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-gray-800 transition group-hover:bg-black group-hover:text-white">
                <FiBriefcase size={22} />
              </div>
            </div>

            <div className="group flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  HR Interviews
                </p>

                <p className="mt-2 text-3xl font-bold tracking-tight">
                  {hrCount}
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Communication and HR practice
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-gray-800 transition group-hover:bg-black group-hover:text-white">
                <FiMessageSquare size={22} />
              </div>
            </div>
          </section>

          {/* Interview analytics */}
          <section className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
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
