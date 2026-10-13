import React from "react";
import { FiRefreshCw } from "react-icons/fi";
import ScoreCard from "./ScoreCard.jsx";
import AnalysisSection from "./AnalysisSection.jsx";

function ResumeAnalysis({ resume, onReset }) {
  const analysis = resume || {};

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Resume Analysis
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Your AI-generated resume evaluation
          </p>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="flex items-center justify-center gap-2 rounded-xl bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          <FiRefreshCw size={16} />
          Analyze Another Resume
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div>
          <ScoreCard score={analysis.score ?? 0} />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2">
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
    </div>
  );
}

export default ResumeAnalysis;
