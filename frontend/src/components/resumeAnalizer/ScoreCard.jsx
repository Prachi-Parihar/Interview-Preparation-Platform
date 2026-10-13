import React from "react";

function ScoreCard({ score = 0 }) {
  const numericScore = Number(score);
  const safeScore = Number.isFinite(numericScore)
    ? Math.min(100, Math.max(0, numericScore))
    : 0;

  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (safeScore / 100) * circumference;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900">
        Resume Score
      </h3>

      <p className="mt-1 text-sm text-gray-500">
        Your overall resume performance
      </p>

      <div className="flex flex-col items-center py-6">
        <div className="relative h-36 w-36">
          <svg
            viewBox="0 0 120 120"
            className="h-full w-full -rotate-90"
          >
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="10"
            />

            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke="#111827"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-gray-900">
              {safeScore}
            </span>

            <span className="text-sm text-gray-500">out of 100</span>
          </div>
        </div>

        <p className="mt-4 text-sm font-medium text-gray-700">
          {safeScore >= 80
            ? "Excellent Resume"
            : safeScore >= 60
              ? "Good Resume"
              : safeScore >= 40
                ? "Needs Improvement"
                : "Keep Improving"}
        </p>
      </div>
    </div>
  );
}

export default ScoreCard;
