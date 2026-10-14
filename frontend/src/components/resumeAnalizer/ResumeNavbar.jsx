import React from "react";
import { useNavigate } from "react-router-dom";
import InterviewBrand from "../InterviewBrand";

function ResumeNavbar() {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-gray-200 bg-white px-5 py-4 shadow-sm sm:px-10">
      <div
        onClick={() => navigate("/dashboard")}
        className="cursor-pointer"
      >
        <InterviewBrand />
      </div>

      <button
        type="button"
        onClick={() => navigate("/dashboard")}
        className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
      >
        Back to Dashboard
      </button>
    </nav>
  );
}

export default ResumeNavbar;
