import React from "react";
import { motion } from "motion/react";
import {
  FiArrowLeft,
  FiAward,
  FiCheck,
  FiTarget,
  FiTrendingUp,
  FiX,
  FiMessageSquare,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function Step3report({ report, user }) {
  const navigate = useNavigate();

  const data = report || {};
  const isCompleted =
    data.status === "completed" &&
    Array.isArray(data.questions) &&
    data.questions.length > 0 &&
    data.questions.every(
      (question) =>
        typeof question.userAnswer === "string" &&
        question.userAnswer.trim().length > 0
    );
  const questions = Array.isArray(data.questions) ? data.questions : [];
  const strengths = Array.isArray(data.strengths) ? data.strengths : [];
  const weaknesses = Array.isArray(data.weaknesses) ? data.weaknesses : [];
  const recommendations = Array.isArray(data.recommendations)
    ? data.recommendations
    : [];

  const score = Math.min(
    Math.max(Number(data.overallScore) || 0, 0),
    100
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Navbar */}
      <nav className="sticky top-0 z-30 border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="text-left"
          >
            <h1 className="text-base font-bold tracking-tight">
              Interview<span className="text-[#ab2552]">AI</span>
            </h1>
            <p className="text-[9px] font-semibold uppercase tracking-wider text-gray-400">
              Interview Prep
            </p>
          </button>

          <span className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700">
            Interview Report
          </span>
        </div>
      </nav>

      <div className="px-3 py-4 sm:px-5 sm:py-5">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="mx-auto w-full max-w-5xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
        >
          {/* Header */}
          <div className="flex flex-col gap-4 border-b border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <div>
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-100"
              >
                <FiArrowLeft size={14} />
                Dashboard
              </button>

              <h2 className="mt-4 text-xl font-bold sm:text-2xl">
                Interview Report
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Your AI-generated performance analysis
              </p>

              {user?.name && (
                <p className="mt-1 text-xs text-gray-400">
                  Candidate: {user.name}
                </p>
              )}
            </div>

            <div className="flex w-fit items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-3 py-2">
              <FiAward size={18} className="text-green-700" />
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  {isCompleted ? "Completed" : "Incomplete"}
                </p>
                <p className="text-xs text-gray-600">
                  {isCompleted
                    ? "Interview report"
                    : "All questions have not been answered"}
                </p>
              </div>
            </div>
          </div>

          {/* Report Content */}
          <div className="space-y-5 p-4 sm:p-5">
            {/* Summary Cards */}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-xl border border-gray-200 p-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
                  <FiTarget size={18} />
                </div>

                <p className="mt-3 text-sm text-gray-500">Overall Score</p>

                <div className="mt-1 flex items-baseline gap-1">
                  <h3 className="text-3xl font-bold">{score}</h3>
                  <span className="text-sm text-gray-400">/100</span>
                </div>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-black transition-all"
                    style={{ width: `${score}%` }}
                  />
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 p-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
                  <FiMessageSquare size={18} />
                </div>

                <p className="mt-3 text-sm text-gray-500">Total Questions</p>
                <h3 className="mt-1 text-3xl font-bold">
                  {questions.length}
                </h3>
                <p className="mt-1 text-xs text-gray-400">
                  Questions evaluated
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 p-4 sm:col-span-2 lg:col-span-1">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50 text-green-700">
                  <FiAward size={18} />
                </div>

                <p className="mt-3 text-sm text-gray-500">Status</p>
                <h3 className="mt-1 text-2xl font-bold">Completed</h3>
                <p className="mt-1 text-xs text-gray-400">
                  Your report is ready
                </p>
              </div>
            </div>

            {/* Interview Summary */}
            <section className="rounded-xl border border-gray-200 p-4 sm:p-5">
              <h3 className="font-bold">Interview Summary</h3>
              <p className="mt-2 whitespace-pre-line text-sm leading-6 text-gray-600">
                {data.summary || "No interview summary is available."}
              </p>
            </section>

            {/* Strengths and Weaknesses */}
            <div className="grid gap-4 lg:grid-cols-2">
              <section className="rounded-xl border border-green-200 p-4 sm:p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50 text-green-700">
                    <FiTrendingUp size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold">Strengths</h3>
                    <p className="text-xs text-gray-500">
                      What you did well
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  {strengths.length > 0 ? (
                    strengths.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2 rounded-lg bg-green-50 p-3"
                      >
                        <FiCheck
                          size={16}
                          className="mt-0.5 shrink-0 text-green-700"
                        />
                        <p className="text-sm leading-5 text-gray-700">
                          {typeof item === "string"
                            ? item
                            : item?.description || item?.text || ""}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">
                      No strengths available.
                    </p>
                  )}
                </div>
              </section>

              <section className="rounded-xl border border-red-200 p-4 sm:p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600">
                    <FiX size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold">Areas to Improve</h3>
                    <p className="text-xs text-gray-500">
                      Skills to work on
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  {weaknesses.length > 0 ? (
                    weaknesses.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2 rounded-lg bg-red-50 p-3"
                      >
                        <FiX
                          size={16}
                          className="mt-0.5 shrink-0 text-red-600"
                        />
                        <p className="text-sm leading-5 text-gray-700">
                          {typeof item === "string"
                            ? item
                            : item?.description || item?.text || ""}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">
                      No improvement areas available.
                    </p>
                  )}
                </div>
              </section>
            </div>

            {/* Recommendations */}
            <section className="rounded-xl border border-gray-200 p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
                  <FiTarget size={18} />
                </div>
                <div>
                  <h3 className="font-bold">Recommendations</h3>
                  <p className="text-xs text-gray-500">
                    Steps to improve your performance
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                {recommendations.length > 0 ? (
                  recommendations.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-black text-xs font-semibold text-white">
                        {index + 1}
                      </span>
                      <p className="text-sm leading-6 text-gray-700">
                        {typeof item === "string"
                          ? item
                          : item?.description || item?.text || ""}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">
                    No recommendations available.
                  </p>
                )}
              </div>
            </section>

            {/* Question-wise Analysis */}
            <section>
              <div className="mb-4">
                <h3 className="text-lg font-bold">
                  Question-wise Analysis
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Review your answers and AI feedback.
                </p>
              </div>

              <div className="space-y-4">
                {questions.length > 0 ? (
                  questions.map((item, index) => {
                    const feedback = item?.feedback || {};

                    const scores = [
                      { label: "Score", value: feedback.score },
                      { label: "Clarity", value: feedback.clarity },
                      { label: "Relevance", value: feedback.relevance },
                      {
                        label: "Communication",
                        value: feedback.communication,
                      },
                    ];

                    return (
                      <article
                        key={index}
                        className="overflow-hidden rounded-xl border border-gray-200"
                      >
                        <div className="border-b border-gray-200 bg-gray-50 p-4">
                          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                            Question {index + 1}
                          </p>
                          <h4 className="mt-2 text-sm font-semibold leading-6">
                            {item?.question || "Question not available"}
                          </h4>
                        </div>

                        <div className="space-y-4 p-4">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                              Your Answer
                            </p>
                            <p className="mt-2 whitespace-pre-line text-sm leading-6 text-gray-600">
                              {item?.userAnswer ||
                                item?.answer ||
                                "No answer submitted."}
                            </p>
                          </div>

                          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                            {scores.map((scoreItem) => (
                              <div
                                key={scoreItem.label}
                                className="rounded-lg border border-gray-200 bg-gray-50 p-3"
                              >
                                <p className="text-xs text-gray-500">
                                  {scoreItem.label}
                                </p>
                                <p className="mt-1 text-lg font-bold">
                                  {scoreItem.value ?? "—"}
                                </p>
                              </div>
                            ))}
                          </div>

                          <div className="rounded-lg border border-green-200 bg-green-50 p-3">
                            <h5 className="text-sm font-semibold text-green-800">
                              AI Feedback
                            </h5>
                            <p className="mt-2 whitespace-pre-line text-sm leading-6 text-gray-700">
                              {typeof feedback === "string"
                                ? feedback
                                : feedback.feedback ||
                                feedback.comment ||
                                "No feedback available."}
                            </p>
                          </div>

                          {Array.isArray(feedback.improvements) &&
                            feedback.improvements.length > 0 && (
                              <div>
                                <h5 className="text-sm font-semibold">
                                  Suggested Improvements
                                </h5>
                                <ul className="mt-2 space-y-2">
                                  {feedback.improvements.map(
                                    (improvement, improvementIndex) => (
                                      <li
                                        key={improvementIndex}
                                        className="rounded-lg border border-gray-200 p-3 text-sm leading-5 text-gray-600"
                                      >
                                        {typeof improvement === "string"
                                          ? improvement
                                          : improvement?.description ||
                                          improvement?.text ||
                                          ""}
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            )}
                        </div>
                      </article>
                    );
                  })
                ) : (
                  <div className="rounded-xl border border-gray-200 p-6 text-center">
                    <FiMessageSquare
                      size={24}
                      className="mx-auto text-gray-400"
                    />
                    <p className="mt-3 text-sm font-medium text-gray-700">
                      No question analysis available.
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* Bottom Button */}
            <div className="flex justify-end border-t border-gray-200 pt-4">
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="w-full rounded-xl bg-black px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-800 sm:w-auto"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Step3report;

