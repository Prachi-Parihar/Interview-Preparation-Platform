
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "motion/react";
import {
  FiUploadCloud,
  FiFileText,
  FiCheckCircle,
  FiAlertCircle,
  FiTarget,
  FiTrendingUp,
  FiRefreshCw,
} from "react-icons/fi";
import { FaFilePdf, FaTimes } from "react-icons/fa";

import api from "../utils/api";
import { setResume } from "../redux/resumeSlice";
import InterviewBrand from "../components/InterviewBrand";

const Navbar = ({ label }) => {
  const navigate = useNavigate();

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-30 border-b border-black/10 bg-white/90 backdrop-blur-xl"
    >
      <div className="flex h-14 items-center justify-between px-4 sm:px-6">
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="text-left"
          aria-label="Go to InterviewAI dashboard"
        >
          <InterviewBrand />
        </button>

        <span className="rounded bg-black/5 px-2 py-1 text-[10px] font-medium text-black/50">
          {label}
        </span>
      </div>
    </motion.nav>
  );
};

const AnalysisSection = ({
  title,
  items,
  icon: Icon,
  emptyMessage,
  iconColor,
}) => (
  <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
    <div className="mb-4 flex items-center gap-3">
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 ${iconColor}`}
      >
        <Icon size={19} />
      </div>
      <h2 className="text-base font-bold text-gray-900">{title}</h2>
    </div>

    {items.length ? (
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li
            key={`${title}-${index}`}
            className="flex items-start gap-3 text-sm leading-6 text-gray-600"
          >
            <FiCheckCircle className="mt-1 shrink-0 text-gray-400" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-sm leading-6 text-gray-400">{emptyMessage}</p>
    )}
  </section>
);

const ScoreCard = ({ score }) => {
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
        <div className="relative flex h-32 w-32 shrink-0 items-center justify-center">
          <svg
            viewBox="0 0 120 120"
            className="-rotate-90 h-32 w-32"
            role="img"
            aria-label={`Resume score: ${score} out of 100`}
          >
            <circle
              cx="60"
              cy="60"
              r={radius}
              stroke="#E5E7EB"
              strokeWidth="9"
              fill="none"
            />
            <circle
              cx="60"
              cy="60"
              r={radius}
              stroke="#AB2552"
              strokeWidth="9"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              fill="none"
            />
          </svg>

          <div className="absolute text-center">
            <p className="text-3xl font-extrabold text-gray-900">{score}</p>
            <p className="text-xs font-medium text-gray-400">out of 100</p>
          </div>
        </div>

        <div className="text-center sm:text-left">
          <div className="mb-2 flex items-center justify-center gap-2 sm:justify-start">
            <FiTarget className="text-[#AB2552]" size={20} />
            <h2 className="text-lg font-bold text-gray-900">Resume Score</h2>
          </div>

          <p className="text-sm leading-6 text-gray-500">
            Review your resume score, strengths, weaknesses, missing skills and
            recommendations to improve your resume.
          </p>
        </div>
      </div>
    </section>
  );
};

function Scorer() {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const { resume } = useSelector((state) => state.resume);

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleFile = (selectedFile) => {
    if (!selectedFile) return;

    if (
      selectedFile.type !== "application/pdf" &&
      !selectedFile.name.toLowerCase().endsWith(".pdf")
    ) {
      setError("Please upload a PDF file only.");
      return;
    }

    if (selectedFile.size > 20 * 1024 * 1024) {
      setError("File size must be under 20 MB.");
      return;
    }

    setFile(selectedFile);
    setError("");
    setSuccess("");
  };

  const uploadResume = async () => {
    if (!file) {
      setError("Please select your resume first.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();
      formData.append("resume", file);

      const response = await api.post("/resume/upload", formData);
      const data = response.data?.data ?? response.data;
      const analysis = data?.resume ?? data?.analysis ?? data;

      if (!analysis || typeof analysis !== "object") {
        throw new Error("Resume analysis was not returned by the server.");
      }

      dispatch(setResume(analysis));
      setSuccess(response.data?.message || "Resume analyzed successfully!");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Resume upload failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const resetAnalysis = () => {
    dispatch(setResume(null));
    setFile(null);
    setError("");
    setSuccess("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const cleanList = (list) =>
    Array.isArray(list)
      ? list.filter((item) => typeof item === "string" && item.trim())
      : [];

  const score = Math.max(0, Math.min(100, Number(resume?.score) || 0));
  const strengths = cleanList(resume?.strengths);
  const weaknesses = cleanList(resume?.weaknesses);
  const missingSkills = cleanList(resume?.missingSkills);
  const recommendations = cleanList(resume?.recommendations);

  const pageContent = (children) => (
    <div className="min-h-screen bg-[#F7F7F5] text-gray-900">
      <Navbar label="Resume Scorer" />
      <main className="min-h-[calc(100vh-56px)]">{children}</main>
    </div>
  );

  if (resume) {
    return pageContent(
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              Resume Analysis
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Your resume feedback and improvement plan.
            </p>
          </div>

          <button
            type="button"
            onClick={resetAnalysis}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-[#AB2552] hover:text-[#AB2552]"
          >
            <FiRefreshCw size={16} />
            Analyze Another Resume
          </button>
        </div>

        <div className="space-y-5">
          <ScoreCard score={score} />

          <AnalysisSection
            title="Strengths"
            items={strengths}
            icon={FiTrendingUp}
            iconColor="text-green-700"
            emptyMessage="No strengths were returned by the analysis."
          />

          <AnalysisSection
            title="Weaknesses"
            items={weaknesses}
            icon={FiAlertCircle}
            iconColor="text-red-600"
            emptyMessage="No weaknesses were returned by the analysis."
          />

          <AnalysisSection
            title="Missing Skills"
            items={missingSkills}
            icon={FiTarget}
            iconColor="text-[#AB2552]"
            emptyMessage="No missing skills were returned by the analysis."
          />

          <AnalysisSection
            title="Recommendations"
            items={recommendations}
            icon={FiCheckCircle}
            iconColor="text-blue-700"
            emptyMessage="No recommendations were returned by the analysis."
          />
        </div>
      </div>
    );
  }

  return pageContent(
    <section className="flex min-h-[calc(100vh-56px)] items-center justify-center px-4 py-10 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
      >
        <div className="mb-6">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white">
            <FiFileText size={22} />
          </div>

          <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
            Upload Your Resume
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Upload your resume to get your score, strengths, weaknesses,
            missing skills and personalized recommendations.
          </p>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept=".pdf,application/pdf"
          className="hidden"
          onChange={(event) => handleFile(event.target.files?.[0])}
        />

        {!file ? (
          <div
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
              event.preventDefault();
              handleFile(event.dataTransfer.files?.[0]);
            }}
            className="flex h-48 w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-[#FAFAFA] px-4 text-center transition hover:border-[#ab2552] hover:bg-pink-50/30 sm:h-56"
          >
            <FiUploadCloud className="mb-4 text-4xl text-gray-400 sm:text-5xl" />

            <p className="text-sm font-semibold text-gray-800">
              Click or drag your PDF here
            </p>

            <p className="mt-2 text-xs text-gray-500">
              PDF only · Maximum file size 20 MB
            </p>

            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="mt-5 rounded-xl bg-black px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#ab2552]"
            >
              Choose Resume
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-[#FAFAFA] p-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-pink-50 text-xl text-[#ab2552]">
              <FaFilePdf />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-gray-900">
                {file.name}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                {(file.size / (1024 * 1024)).toFixed(2)} MB · PDF
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setFile(null);
                setError("");
                if (inputRef.current) inputRef.current.value = "";
              }}
              aria-label="Remove selected resume"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-500 transition hover:bg-red-50 hover:text-red-600"
            >
              <FaTimes />
            </button>
          </div>
        )}

        {error && (
          <p
            role="alert"
            className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600"
          >
            {error}
          </p>
        )}

        {success && (
          <p
            role="status"
            className="mt-4 rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-700"
          >
            {success}
          </p>
        )}

        <button
          type="button"
          onClick={uploadResume}
          disabled={!file || loading}
          className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-black px-4 text-sm font-semibold text-white transition hover:bg-[#ab2552] disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          <FiUploadCloud size={17} />
          {loading ? "Analyzing Resume..." : "Analyze Resume"}
        </button>

        <p className="mt-4 text-center text-xs text-gray-400">
          Supported format: PDF · Maximum size: 20 MB
        </p>
      </motion.div>
    </section>
  );
}

export default Scorer;
