import React from "react";
import {
  FiCheckCircle,
  FiAlertCircle,
  FiTarget,
  FiTrendingUp,
} from "react-icons/fi";

const sectionIcons = {
  strengths: FiCheckCircle,
  weaknesses: FiAlertCircle,
  missingSkills: FiTarget,
  recommendations: FiTrendingUp,
};

function AnalysisSection({ title, items = [], type = "strengths" }) {
  const Icon = sectionIcons[type] || FiCheckCircle;

  const list = Array.isArray(items)
    ? items
    : typeof items === "string"
      ? [items]
      : [];

  const cleanedItems = list
    .map((item) => {
      if (typeof item === "string") return item;
      if (item && typeof item === "object") {
        return item.text || item.message || item.name || "";
      }
      return "";
    })
    .filter(Boolean);

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
          <Icon size={20} className="text-gray-800" />
        </div>

        <h3 className="text-lg font-semibold text-gray-900">
          {title}
        </h3>
      </div>

      {cleanedItems.length > 0 ? (
        <ul className="space-y-3">
          {cleanedItems.map((item, index) => (
            <li
              key={`${type}-${index}`}
              className="flex items-start gap-3 text-sm leading-6 text-gray-600"
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-800" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">
          No information available.
        </p>
      )}
    </section>
  );
}

export default AnalysisSection;
