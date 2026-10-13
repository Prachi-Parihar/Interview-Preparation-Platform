import React, { useEffect, useState } from "react";
import Step3report from "../components/interview/Step3report.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { getInterview } from "../apis/interviewApi.js";

function InterviewReport({ user, setUser }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchReport = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getInterview(id);
        const data = response?.interview;

        if (!data) {
          throw new Error("Interview report not found.");
        }

        const questions = Array.isArray(data.questions)
          ? data.questions
          : [];

        const allAnswered =
          questions.length > 0 &&
          questions.every(
            (question) =>
              typeof question.userAnswer === "string" &&
              question.userAnswer.trim().length > 0
          );

        if (data.status !== "completed" || !allAnswered) {
          navigate("/dashboard", { replace: true });
          return;
        }

        if (isMounted) {
          setReport(data);
        }
      } catch (err) {
        console.error("Failed to load interview report:", err);

        if (isMounted) {
          setError(
            err?.response?.data?.message ||
              err.message ||
              "Unable to load interview report."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (id) {
      fetchReport();
    } else {
      setError("Interview ID is missing.");
      setLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-black" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50 px-4">
        <p className="text-center text-sm text-red-600">{error}</p>
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="rounded-xl bg-black px-5 py-2.5 text-sm font-semibold text-white"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  if (!report) return null;

  return (
    <Step3report
      user={user}
      setUser={setUser}
      report={report}
    />
  );
}

export default InterviewReport;
