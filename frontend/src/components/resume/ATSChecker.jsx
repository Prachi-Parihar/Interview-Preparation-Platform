
import { useState } from "react";
import { SearchCheck, CheckCircle2, AlertCircle } from "lucide-react";
import { getATSResult } from "../../utils/resume.js";

const ATSChecker = ({ resume }) => {
  const [jobDescription, setJobDescription] = useState(
    localStorage.getItem("resume-job-description") || ""
  );
  const [result, setResult] = useState(null);

  const checkResume = () => {
    if (!jobDescription.trim()) {
      setResult(null);
      return;
    }

    setResult(getATSResult(resume, jobDescription));
  };

  const handleDescriptionChange = (value) => {
    setJobDescription(value);
    localStorage.setItem("resume-job-description", value);
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold text-slate-800">
          <SearchCheck size={21} className="text-[#ab2552]" />
          ATS Resume Checker
        </h2>

        <p className="mb-4 text-sm leading-6 text-slate-500">
          Paste the job description to find relevant keywords in your resume
          and identify skills you may need to add if you genuinely have them.
        </p>

        <textarea
          value={jobDescription}
          onChange={(e) => handleDescriptionChange(e.target.value)}
          rows={8}
          placeholder="Paste the complete MERN Stack Developer job description here..."
          className="w-full rounded-xl border border-slate-200 px-3 py-3 text-sm leading-6 outline-none focus:border-[#ab2552] focus:ring-2 focus:ring-pink-100"
        />

        <button
          onClick={checkResume}
          className="mt-4 flex items-center gap-2 rounded-xl bg-[#ab2552] px-5 py-3 text-sm font-semibold text-white hover:bg-[#8f1d43]"
        >
          <SearchCheck size={18} />
          Check Resume
        </button>

        {!jobDescription.trim() && (
          <p className="mt-3 text-xs text-slate-500">
            Enter a job description to calculate the keyword match.
          </p>
        )}
      </section>

      {result && (
        <>
          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex flex-col items-center gap-3 text-center">
              <div
                className="flex h-28 w-28 items-center justify-center rounded-full border-8 border-pink-100"
                style={{
                  background: `conic-gradient(#ab2552 ${result.score}%, #f1f5f9 ${result.score}%)`,
                }}
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white">
                  <span className="text-2xl font-bold text-slate-800">
                    {result.score}%
                  </span>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-slate-800">
                Estimated Resume Readiness
              </h3>
              <p className="max-w-md text-sm text-slate-500">
                This estimate combines keyword matching and basic resume
                completeness. It does not predict an employer's actual ATS result.
              </p>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Keyword Match</p>
                <p className="mt-1 text-2xl font-bold text-slate-800">
                  {result.keywordScore}%
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {result.matched.length} of {result.total} detected keywords
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Resume Completeness</p>
                <p className="mt-1 text-2xl font-bold text-slate-800">
                  {result.completenessScore}%
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Based on basic resume fields
                </p>
              </div>
            </div>
          </section>

          <section className="grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="mb-4 flex items-center gap-2 font-semibold text-slate-800">
                <CheckCircle2 size={19} className="text-emerald-600" />
                Matched Keywords ({result.matched.length})
              </h3>

              {result.matched.length ? (
                <div className="flex flex-wrap gap-2">
                  {result.matched.map((keyword) => (
                    <span
                      key={keyword}
                      className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500">
                  No keywords matched yet.
                </p>
              )}
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="mb-4 flex items-center gap-2 font-semibold text-slate-800">
                <AlertCircle size={19} className="text-amber-600" />
                Missing Keywords ({result.missing.length})
              </h3>

              {result.missing.length ? (
                <div className="flex flex-wrap gap-2">
                  {result.missing.map((keyword) => (
                    <span
                      key={keyword}
                      className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500">
                  All detected keywords matched.
                </p>
              )}

              <p className="mt-4 text-xs leading-5 text-slate-500">
                Add a missing skill only if you actually know it. This checker
                uses a predefined keyword list and may not recognize every
                equivalent term.
              </p>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default ATSChecker;
