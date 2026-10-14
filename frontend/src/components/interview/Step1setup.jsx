import React, { useState } from "react";
import { motion } from "motion/react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiBriefcase,
  FiCheck,
  FiFileText,
  FiUploadCloud,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import api from "../../utils/api.js";
import { setResume } from "../../redux/resumeSlice.js";
import { startInterview } from "../../apis/interviewApi.js";
import InterviewBrand from "../InterviewBrand.jsx";

function Step1setup({ user }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { resume } = useSelector((state) => state.resume);

  const [role, setRole] = useState("");
  const [type, setType] = useState("Technical");
  const [useResume, setUseResume] = useState(!!resume);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [starting, setStarting] = useState(false);

  const uploadResume = async () => {
    if (!file) {
      alert("Please select a PDF resume.");
      return;
    }

    if (file.type !== "application/pdf") {
      alert("Please select a PDF file only.");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("resume", file);

      const response = await api.post("/resume/upload", formData);
      const resumeData = response?.data?.data;

      if (!resumeData) {
        alert("Resume upload failed. Please try again.");
        return;
      }

      dispatch(setResume(resumeData));
      setFile(null);
      alert("Resume uploaded successfully!");
    } catch (error) {
      console.error("Resume Upload Error:", error);
      alert(
        error?.response?.data?.message || "Resume upload failed."
      );
    } finally {
      setUploading(false);
    }
  };

  const start = async () => {
    if (!role.trim()) {
      alert("Please enter your target role.");
      return;
    }

    if (useResume && !resume) {
      alert("Please upload your resume first.");
      return;
    }

    try {
      setStarting(true);

      const response = await startInterview({
        role: role.trim(),
        type,
        useResume,
        resume: useResume ? resume : null,
      });

      const interviewId =
        response?.interviewId ||
        response?.data?.interviewId ||
        response?.data?.data?.interviewId;

      if (!interviewId) {
        alert("Interview could not start. Please try again.");
        return;
      }

      navigate(`/interview/${interviewId}`);
    } catch (error) {
      console.error("Start Interview Error:", error);
      alert(
        error?.response?.data?.message ||
          "Error starting interview. Please try again."
      );
    } finally {
      setStarting(false);
    }
  };

  const features = [
    "Personalized AI Questions",
    "Resume Based Interview",
    "Detailed Performance Report",
    "Real Interview Experience",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="sticky top-0 z-30 border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="text-left"
          >
            <InterviewBrand />
          </button>

          <span className="rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700">
            Start Interview
          </span>
        </div>
      </nav>

      {/* Main Content */}
      <div className="px-4 py-5 sm:px-6 lg:py-4">
        <div className="mx-auto max-w-3xl">

          {/* Main Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm lg:grid-cols-[0.85fr_1.15fr]"
          >
            {/* Left Section */}
            <div className="flex flex-col border-b border-gray-200 bg-gray-50 p-3 sm:p-8 lg:border-b-0 lg:border-r">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black text-white">
                  <FiBriefcase size={22} />
                </div>

                <h1 className="mt-3 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl">
                  Welcome back,
                  <span className="mt-1 block break-words">
                    {user?.name || "Candidate"}
                  </span>
                </h1>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Practice realistic AI interviews, receive instant
                  feedback, and improve your skills before your next
                  job interview.
                </p>
              </div>

              <div className="mt-3 space-y-4">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  What you'll get
                </h2>

                {features.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="flex h-4 w-5 shrink-0 items-center justify-center rounded-full bg-black text-white">
                      <FiCheck size={14} />
                    </div>

                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-xl border border-gray-200 bg-white p-3">
                <p className="text-sm font-semibold text-gray-900">
                  Ready to practice?
                </p>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Choose your role and interview type to get started.
                </p>
              </div>
            </div>

            {/* Right Section */}
            <div className="p-4 sm:p-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Start Interview
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Configure your interview preferences.
                </p>
              </div>

              <div className="mt-5 space-y-5">
                {/* Target Role */}
                <div>
                  <label
                    htmlFor="targetRole"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Target Role
                  </label>

                  <div className="relative">
                    <FiBriefcase
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      id="targetRole"
                      type="text"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder="e.g. MERN Stack Developer"
                      className="h-12 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
                    />
                  </div>
                </div>

                {/* Interview Type */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Interview Type
                  </label>

                  <div className="grid grid-cols-2 gap-3">
                    {["Technical", "Hr"].map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setType(item)}
                        className={`flex h-8 items-center justify-center gap-2 rounded-xl border text-sm font-medium transition ${
                          type === item
                            ? "border-black bg-[#9c2545] text-white"
                            : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        {type === item && <FiCheck size={15} />}
                        {item === "Hr" ? "HR" : item}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Resume Toggle */}
                <div className="flex items-center justify-between gap-4 rounded-xl border border-gray-200 p-2">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">
                      Use Resume
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      Personalize questions using your resume.
                    </p>
                  </div>

                  <button
                    type="button"
                    role="switch"
                    aria-checked={useResume}
                    aria-label="Use resume"
                    onClick={() => setUseResume(!useResume)}
                    className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                      useResume ? "bg-[#9c2545]" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all ${
                        useResume ? "left-6" : "left-1"
                      }`}
                    />
                  </button>
                </div>

                {/* Resume Upload */}
                {useResume && (
                  <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4">
                    <label
                      htmlFor="resumeFile"
                      className="flex cursor-pointer flex-col items-center text-center"
                    >
                      <div className="flex h-10 w-12 items-center justify-center rounded-xl bg-white text-gray-800 shadow-sm">
                        <FiUploadCloud size={23} />
                      </div>

                      <h3 className="mt-3 text-sm font-semibold text-gray-900">
                        Upload Resume
                      </h3>

                      <p className="mt-1 text-xs leading-5 text-gray-500">
                        PDF format only, to personalize your interview.
                      </p>

                      <span className="mt-3 rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-700">
                        Choose PDF
                      </span>

                      <input
                        id="resumeFile"
                        type="file"
                        accept=".pdf,application/pdf"
                        className="hidden"
                        onChange={(e) => {
                          const selectedFile = e.target.files?.[0];

                          if (selectedFile) {
                            setFile(selectedFile);
                          }

                          e.target.value = "";
                        }}
                      />
                    </label>

                    {file && (
                      <div className="mt-4 rounded-lg border border-gray-200 bg-white p-3">
                        <div className="flex items-center gap-2">
                          <FiFileText
                            size={17}
                            className="shrink-0 text-gray-500"
                          />

                          <p className="min-w-0 flex-1 truncate text-xs text-gray-700">
                            {file.name}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={uploadResume}
                          disabled={uploading}
                          className="mt-3 h-10 w-full rounded-lg bg-black text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {uploading ? "Uploading..." : "Upload Resume"}
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Start Button */}
              <motion.button
                type="button"
                onClick={start}
                whileTap={{ scale: 0.99 }}
                disabled={
                  !role.trim() ||
                  starting ||
                  uploading ||
                  (useResume && !resume)
                }
                className="mt-7 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#9c2545] text-sm font-semibold text-white transition hover:bg-[#8f323a] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {starting ? (
                  "Starting Interview..."
                ) : (
                  <>
                    Start Interview
                    <FiArrowRight size={16} />
                  </>
                )}
              </motion.button>

              <p className="mt-3 text-center text-xs text-gray-400">
                Your interview setup is almost ready.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Step1setup;
