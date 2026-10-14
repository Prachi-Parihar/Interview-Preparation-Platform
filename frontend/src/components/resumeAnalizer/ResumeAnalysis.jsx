import React from "react";
import { FiRefreshCw, FiFileText, FiTarget } from "react-icons/fi";
import ScoreCard from "./ScoreCard.jsx";
import AnalysisSection from "./AnalysisSection.jsx";

function ResumeAnalysis({ resume, onReset }) {
  const analysis = resume || {};
  const score = Math.min(100, Math.max(0, Number(analysis.score) || 0));

  return (
    <div className="min-h-screen bg-gray-50 px-4 pb-8 pt-17 sm:px-6 lg:px-6">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
              <FiFileText size={16} />
              <span>Resume Agent</span>
              <span>/</span>
              <span className="text-gray-700">Analysis</span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Resume Analysis
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Your AI-powered resume evaluation and performance report.
            </p>
          </div>

          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#8d1a40] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#7a183f]"
          >
            <FiRefreshCw size={16} />
            Analyze Another Resume
          </button>
        </div>

        {/* Main Analysis */}
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">

          {/* Score Card */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">
                Overall Score
              </h2>
              <FiTarget className="text-gray-400" size={20} />
            </div>

            <ScoreCard score={score} />

            <div className="mt-6 border-t border-gray-100 pt-5">
              <div className="mb-2 flex items-center justify-between gap-2 text-sm">
                <span className="text-gray-500">Resume Score</span>
                <span className="font-semibold text-gray-900">
                  {score}/100
                </span>
              </div>

              <div
                className="h-2.5 overflow-hidden rounded-full bg-gray-100"
                role="progressbar"
                aria-label="Resume score"
                aria-valuenow={score}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className="h-full rounded-full bg-[#8d1a40] transition-all duration-500"
                  style={{ width: `${score}%` }}
                />
              </div>

              <p className="mt-4 text-sm leading-6 text-gray-500">
                Review the feedback and recommendations to improve your
                resume and highlight relevant skills.
              </p>
            </div>
          </div>

          {/* Analysis Sections */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-2">
            <AnalysisSection
              title="Strengths"
              items={analysis.strengths}
              type="strengths"
            />

            <AnalysisSection
              title="Weaknesses"
              items={analysis.weaknesses}
              type="weaknesses"
            />

            <AnalysisSection
              title="Missing Skills"
              items={analysis.missingSkills}
              type="missingSkills"
            />

            <AnalysisSection
              title="Recommendations"
              items={analysis.recommendations}
              type="recommendations"
            />
          </div>
        </div>

        {/* Next Steps */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <h3 className="text-lg font-bold text-gray-900">
            What to do next?
          </h3>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-500">
            Improve your resume by addressing missing skills, adding
            relevant projects, and presenting your achievements clearly.
            Use the recommendations above to make your resume stronger.
          </p>

          <button
            type="button"
            onClick={onReset}
            className="mt-5 inline-flex items-center gap-2 rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-800 transition hover:bg-gray-100"
          >
            <FiRefreshCw size={15} />
            Analyze Again
          </button>
        </div>

      </div>
    </div>
  );
}

export default ResumeAnalysis;