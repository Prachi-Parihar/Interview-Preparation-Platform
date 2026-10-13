
import React from "react";
import { motion } from "motion/react";
import {
  FiCheckCircle,
  FiClock,
  FiMap,
  FiTarget,
  FiX,
} from "react-icons/fi";
import ModuleCard from "./ModuleCard";

function RoadmapResult({ roadmap, onClear }) {
  const modules = roadmap?.modules || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="w-full"
    >
      {/* Roadmap Header */}
      <div className="mb-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="mb-5 flex items-start justify-between gap-3">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-gray-400">
              Your Roadmap
            </p>

            <h2 className="text-xl font-bold text-gray-900">
              {roadmap?.title || "Learning Roadmap"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Follow these modules to improve your skills.
            </p>
          </div>

          <button
            type="button"
            onClick={onClear}
            aria-label="Close roadmap"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:bg-gray-100 hover:text-black"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Roadmap Details */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
            <div className="mb-2 flex items-center gap-2 text-gray-500">
              <FiTarget size={16} />
              <span className="text-xs font-medium">Difficulty</span>
            </div>

            <p className="text-sm font-semibold text-gray-900">
              {roadmap?.level || "Not specified"}
            </p>
          </div>

          <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
            <div className="mb-2 flex items-center gap-2 text-gray-500">
              <FiClock size={16} />
              <span className="text-xs font-medium">Duration</span>
            </div>

            <p className="text-sm font-semibold text-gray-900">
              {roadmap?.duration || "Not specified"}
            </p>
          </div>

          <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
            <div className="mb-2 flex items-center gap-2 text-gray-500">
              <FiCheckCircle size={16} />
              <span className="text-xs font-medium">Modules</span>
            </div>

            <p className="text-sm font-semibold text-gray-900">
              {modules.length} topics
            </p>
          </div>
        </div>
      </div>

      {/* Learning Modules */}
      <div>
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-700">
            <FiMap size={16} />
          </div>

          <div>
            <h3 className="text-sm font-bold text-gray-900">
              Learning Modules
            </h3>
            <p className="text-xs text-gray-500">
              Follow each topic step by step
            </p>
          </div>
        </div>

        {modules.length > 0 ? (
          <div className="flex flex-col gap-3">
            {modules.map((module, index) => (
              <ModuleCard
                key={module.title || index}
                mod={module}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-gray-200 bg-white p-6 text-center">
            <p className="text-sm text-gray-500">
              No learning modules available.
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default RoadmapResult;
