import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setResume } from "../redux/resumeSlice.js";
import api from "../utils/api.js";

import ResumeNavbar from "../components/resumeAnalizer/ResumeNavbar.jsx";
import ResumeUpload from "../components/resumeAnalizer/ResumeUpload.jsx";
import ResumeAnalyzer from "../components/resumeAnalizer/ResumeAnalysis.jsx";


const MAX_FILE_SIZE = 20 * 1024 * 1024;

function Scorer() {
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const { resume } = useSelector((state) => state.resume);

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleFileChange = (selectedFile) => {
    setError("");
    setSuccess("");

    if (!selectedFile) return;

    const isPdf =
      selectedFile.type === "application/pdf" ||
      selectedFile.name.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      setFile(null);
      setError("Please select a PDF file only.");
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setFile(null);
      setError("File size must not exceed 20 MB.");
      return;
    }

    if (selectedFile.size === 0) {
      setFile(null);
      setError("The selected file is empty.");
      return;
    }

    setFile(selectedFile);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setError("");
    setSuccess("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleUpload = async () => {
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

      const response = await api.post(
        "/resume/upload",
        formData
      );

      const data = response.data?.data ?? response.data;

      const analysis =
        data?.resume ??
        data?.analysis ??
        data;

      if (!analysis || typeof analysis !== "object") {
        throw new Error("Resume analysis was not returned by the server.");
      }

      dispatch(setResume(analysis));
      setSuccess("Resume analyzed successfully.");
      setFile(null);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    } catch (err) {
      console.error("Resume Upload Error:", err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to analyze resume. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    dispatch(setResume(null));
    setFile(null);
    setError("");
    setSuccess("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ResumeNavbar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {!resume ? (
          <div className="space-y-8">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
                AI Resume Analyzer
              </p>

              <h1 className="mt-5 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Improve Your Resume
              </h1>

              <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
                Upload your resume to check your score, identify
                missing skills, and get suggestions for improvement.
              </p>
            </div>

            <ResumeUpload
              file={file}
              loading={loading}
              error={error}
              success={success}
              inputRef={inputRef}
              onFileChange={handleFileChange}
              onUpload={handleUpload}
              onRemove={handleRemoveFile}
            />
          </div>
        ) : (
          <ResumeAnalyzer
            resume={resume}
            onReset={handleReset}
          />
        )}
      </main>
    </div>
  );
}

export default Scorer;
