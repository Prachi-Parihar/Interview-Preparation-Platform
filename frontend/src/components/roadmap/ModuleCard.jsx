
import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  FiBookOpen,
  FiChevronDown,
  FiChevronUp,
  FiClock,
  FiYoutube,
} from "react-icons/fi";

const difficultyColor = {
  Easy: "#34d399",
  Medium: "#a78bfa",
  Hard: "#f87171",
};

function ModuleCard({ mod, index }) {
  const [open, setOpen] = useState(false);

  const youtubeUrl =
    typeof mod.youtube === "string" && mod.youtube.trim()
      ? mod.youtube
      : `https://www.youtube.com/results?search_query=${encodeURIComponent(
          `${mod.title || "programming"} tutorial`
        )}`;

  const articleUrl =
    typeof mod.article === "string" && mod.article.trim()
      ? mod.article
      : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.25 }}
      className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:border-gray-300"
    >
      {/* Module Header */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex w-full items-center gap-3 p-4 text-left"
      >
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-sm font-bold"
          style={{
            color: difficultyColor[mod?.difficulty] || "#374151",
          }}
        >
          {index + 1}
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-gray-900">
            {mod?.title || `Module ${index + 1}`}
          </p>

          <div className="mt-1 flex items-center gap-1.5">
            <FiClock size={12} className="text-gray-400" />

            <span className="text-xs text-gray-500">
              {mod?.duration || "Duration not specified"}
            </span>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <span
            className="hidden text-xs font-medium sm:block"
            style={{
              color: difficultyColor[mod?.difficulty] || "#6b7280",
            }}
          >
            {mod?.difficulty || "General"}
          </span>

          {open ? (
            <FiChevronUp size={17} className="text-gray-400" />
          ) : (
            <FiChevronDown size={17} className="text-gray-400" />
          )}
        </div>
      </button>

      {/* Module Details */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="border-t border-gray-100 px-4 pb-4 pt-3">
              <p className="mb-4 text-sm leading-6 text-gray-600">
                {mod?.description || "Learn the fundamentals of this topic."}
              </p>

              <div className="flex flex-wrap gap-2">
                {/* Watch Tutorial */}
                <a
                  href={youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-600 transition hover:bg-red-100"
                >
                  <FiYoutube size={14} />
                  Watch Tutorial
                </a>

                {/* Read Article */}
                {articleUrl && (
                  <a
                    href={articleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-100"
                  >
                    <FiBookOpen size={14} />
                    Read Article
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default ModuleCard;
