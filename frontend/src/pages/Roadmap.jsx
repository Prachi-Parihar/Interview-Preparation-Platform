
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  FiCheck,
  FiChevronDown,
  FiClock,
  FiFileText,
  FiSend,
  FiX,
  FiZap,
} from "react-icons/fi";
import { BsRocketTakeoff } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../utils/api.js";
import RoadmapResult from "../components/roadmap/RoadmapResult.jsx";
import { FaMicrophone } from "react-icons/fa";
import InterviewBrand from "../components/InterviewBrand.jsx";

const PACKAGE_OPTIONS = ["10 LPA", "15 LPA", "20 LPA", "30 LPA", "40 LPA"];

function Roadmap() {
  const navigate = useNavigate();
  const { resume } = useSelector((state) => state.resume);

  const [historyOpen, setHistoryOpen] = useState(false);
  const [roadmap, setRoadmap] = useState(null);
  const [role, setRole] = useState("");
  const [targetPackage, setTargetPackage] = useState("20 LPA");
  const [packageOpen, setPackageOpen] = useState(false);
  const [useResume, setUseResume] = useState(false);
  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getAllRoadmaps();
  }, []);

  const getAllRoadmaps = async () => {
    setHistoryLoading(true);

    try {
      const response = await api.get("/roadmap/all");
      setHistory(response.data?.data || []);
    } catch (error) {
      console.error("Failed to load roadmaps:", error);
      setHistory([]);
    } finally {
      setHistoryLoading(false);
    }
  };

  const getRoadmapById = async (id) => {
    try {
      const response = await api.get(`/roadmap/${id}`);
      setRoadmap(response.data?.data || null);
      setError("");
    } catch (error) {
      console.error("Failed to load roadmap:", error);
      setError("Unable to open this roadmap. Please try again.");
    }
  };

  const handleGenerate = async () => {
    if (!role.trim() || loading) return;

    setLoading(true);
    setError("");

    try {
      const response = await api.post("/roadmap/generate", {
        role: role.trim(),
        targetPackage,
        useResume,
        resume,
      });

      setRoadmap(response.data?.data || null);
      await getAllRoadmaps();
    } catch (error) {
      console.error("Failed to generate roadmap:", error);
      setError(
        error.response?.data?.message ||
          "Unable to generate roadmap. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 text-gray-900">
      {/* Navbar */}
      <nav className="sticky top-0 z-30 border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">

<button
  type="button"
  onClick={() => navigate("/dashboard")}
  className="flex items-center gap-3 text-left"
  aria-label="Go to InterviewAI dashboard"
>
  <InterviewBrand />
</button>


          <button
            type="button"
            onClick={() => setHistoryOpen(true)}
            className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-100"
          >
            <FiClock size={15} />
            History
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 px-4 pb-40 pt-8 sm:px-6 sm:pt-10">
        <div className="mx-auto max-w-3xl">
          <AnimatePresence mode="wait">
            {!roadmap ? (
              <motion.div
                key="roadmap-form"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex min-h-[55vh] flex-col items-center justify-center text-center"
              >
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-gray-200 bg-white shadow-sm">
                  <BsRocketTakeoff size={30} className="text-gray-800" />
                </div>

                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  AI Roadmap Generator
                </h1>

                <p className="mt-3 max-w-md text-sm leading-6 text-gray-500">
                  Create a personalised learning path for your dream job.
                  Choose your role and target package to get started.
                </p>

                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  {["Frontend Developer", "Backend Developer", "ML Engineer"].map(
                    (item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setRole(item)}
                        className={`rounded-lg border px-3 py-2 text-xs font-medium transition sm:text-sm ${
                          role === item
                            ? "border-gray-900 bg-gray-900 text-white"
                            : "border-gray-200 bg-white text-gray-600 hover:border-gray-400 hover:text-gray-900"
                        }`}
                      >
                        {item}
                      </button>
                    )
                  )}
                </div>

                {error && (
                  <p className="mt-4 max-w-md text-sm text-red-600">
                    {error}
                  </p>
                )}

                <p className="mt-6 text-xs text-gray-400">
                  Enter your desired role below to generate a roadmap.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="roadmap-result"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <RoadmapResult
                  roadmap={roadmap}
                  onClear={() => {
                    setRoadmap(null);
                    setError("");
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Bottom Input Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-gray-200 bg-white/95 px-3 py-3 backdrop-blur sm:px-6 sm:py-4">
        <div className="mx-auto max-w-3xl">
          {error && roadmap && (
            <p className="mb-2 text-sm text-red-600">{error}</p>
          )}

          <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-gray-200 bg-white p-2 shadow-lg sm:flex-nowrap">
            <input
              type="text"
              placeholder="e.g. MERN Stack Developer"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !loading && role.trim()) {
                  handleGenerate();
                }
              }}
              className="h-10 min-w-0 flex-1 rounded-lg bg-transparent px-2 text-sm text-gray-900 outline-none placeholder:text-gray-400"
            />

            {/* Package Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setPackageOpen(!packageOpen)}
                className="flex h-10 items-center gap-1.5 rounded-lg border border-gray-200 px-2.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50 sm:text-sm"
              >
                {targetPackage}
                <FiChevronDown
                  size={14}
                  className={packageOpen ? "rotate-180" : ""}
                />
              </button>

              <AnimatePresence>
                {packageOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute bottom-full right-0 z-40 mb-2 w-28 overflow-hidden rounded-xl border border-gray-200 bg-white py-1 shadow-lg"
                  >
                    {PACKAGE_OPTIONS.map((pkg) => (
                      <button
                        key={pkg}
                        type="button"
                        onClick={() => {
                          setTargetPackage(pkg);
                          setPackageOpen(false);
                        }}
                        className={`w-full px-3 py-2 text-left text-sm transition ${
                          targetPackage === pkg
                            ? "bg-gray-100 font-semibold text-gray-900"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        {pkg}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Resume Option */}
            <button
              type="button"
              onClick={() => setUseResume(!useResume)}
              className={`flex h-10 items-center gap-1.5 rounded-lg border px-2.5 text-xs font-medium transition sm:text-sm ${
                useResume
                  ? "border-gray-900 bg-gray-900 text-white"
                  : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              {useResume ? <FiCheck size={14} /> : <FiFileText size={14} />}
              <span>{useResume ? "Added" : "Resume"}</span>
            </button>

            {/* Generate Button */}
            <button
              type="button"
              disabled={loading || !role.trim()}
              onClick={handleGenerate}
              className="flex h-10 items-center justify-center gap-2 rounded-lg bg-gray-900 px-3 text-xs font-semibold text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-40 sm:px-4 sm:text-sm"
            >
              {loading ? (
                <>
                  <FiZap size={14} className="animate-pulse" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <FiSend size={14} />
                  <span>Generate</span>
                </>
              )}
            </button>
          </div>

          <p className="mt-2 text-center text-[10px] text-gray-400">
            Choose a role, set your target package and generate your roadmap.
          </p>
        </div>
      </div>

      {/* Roadmap History Drawer */}
      <AnimatePresence>
        {historyOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close history"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setHistoryOpen(false)}
              className="fixed inset-0 z-40 cursor-default bg-black/30"
            />

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.2 }}
              className="fixed bottom-0 right-0 top-0 z-50 flex w-[320px] max-w-[88vw] flex-col border-l border-gray-200 bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4">
                <div>
                  <h2 className="text-sm font-bold text-gray-900">
                    Previous Roadmaps
                  </h2>
                  <p className="mt-1 text-xs text-gray-500">
                    Your generated learning paths
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setHistoryOpen(false)}
                  aria-label="Close history"
                  className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
                >
                  <FiX size={18} />
                </button>
              </div>

              <div className="flex-1 space-y-3 overflow-y-auto p-3">
                {historyLoading ? (
                  <p className="py-8 text-center text-sm text-gray-500">
                    Loading roadmaps...
                  </p>
                ) : history.length === 0 ? (
                  <div className="py-10 text-center">
                    <FiClock className="mx-auto mb-3 text-gray-300" size={26} />
                    <p className="text-sm font-medium text-gray-700">
                      No roadmaps yet
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      Your generated roadmaps will appear here.
                    </p>
                  </div>
                ) : (
                  history.map((item, index) => (
                    <button
                      key={item._id || index}
                      type="button"
                      onClick={async () => {
                        await getRoadmapById(item._id);
                        setHistoryOpen(false);
                      }}
                      className="w-full rounded-xl border border-gray-200 bg-white p-2 text-left transition hover:border-gray-400 hover:bg-gray-50"
                    >
                      <h3 className="text-sm font-semibold text-gray-900">
                        {item.title || "Learning Roadmap"}
                      </h3>

                      <div className="mt-2 flex items-center justify-between gap-2">
                        <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
                          {item.targetPackage || "Target not set"}
                        </span>
                        <span className="text-xs text-gray-500">
                          {item.duration || "Flexible duration"}
                        </span>
                      </div>

                      <p className="mt-3 text-xs text-gray-400">
                        {item.createdAt
                          ? new Date(item.createdAt).toLocaleDateString()
                          : ""}
                      </p>
                    </button>
                  ))
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Roadmap;
