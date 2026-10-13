
import { useEffect, useState } from "react";
import { Check, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";

import InterviewBrand from "../components/InterviewBrand";
import ResumeTabs from "../components/resume/ResumeTabs.jsx";
import PersonalDetails from "../components/resume/PersonalDetails.jsx";
import ProfessionalSummary from "../components/resume/ProfessionalSummary.jsx";
import SkillsSection from "../components/resume/SkillsSection.jsx";
import ProjectsSection from "../components/resume/ProjectsSection.jsx";
import ExperienceSection from "../components/resume/ExperienceSection.jsx";
import EducationSection from "../components/resume/Education.jsx";
import ATSChecker from "../components/resume/ATSChecker.jsx";
import ResumePreview from "../components/resume/ResumePreview.jsx";

import { INITIAL_RESUME, loadResume } from "../utils/resume.js";

const ResumeBuilder = () => {
  const navigate = useNavigate();
  const [resume, setResume] = useState(loadResume);
  const [activeTab, setActiveTab] = useState("builder");
  const [saved, setSaved] = useState(true);

  useEffect(() => {
    try {
      localStorage.setItem("resume-data", JSON.stringify(resume));
      setSaved(true);
    } catch (error) {
      console.error("Unable to save resume:", error);
      setSaved(false);
    }
  }, [resume]);

  const updatePersonal = (key, value) => {
    setResume((previous) => ({
      ...previous,
      personal: {
        ...previous.personal,
        [key]: value,
      },
    }));
  };

  const resetResume = () => {
    const confirmed = window.confirm(
      "Are you sure you want to clear all your resume details?"
    );

    if (!confirmed) return;

    setResume({
      ...INITIAL_RESUME,
      personal: { ...INITIAL_RESUME.personal },
      projects: [],
      experience: [],
      education: [],
    });

    localStorage.removeItem("resume-data");
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="text-left"
        >
          <InterviewBrand />
        </button>

        <span className="text-sm font-semibold text-slate-700 sm:text-base">
          Resume Builder
        </span>
      </nav>

      <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
        <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="mb-2 text-2xl font-bold text-slate-900 sm:text-3xl">
              Resume Builder
            </h1>

            <p className="max-w-2xl text-sm leading-6 text-slate-500">
              Create your professional resume, check relevant job keywords,
              and prepare a clean resume for PDF export.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-xs text-slate-500">
              <Check
                size={15}
                className={saved ? "text-emerald-600" : "text-red-500"}
              />
              {saved ? "Saved locally" : "Save failed"}
            </span>

            <button
              type="button"
              onClick={resetResume}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:border-red-200 hover:text-red-600"
            >
              <RotateCcw size={15} />
              Reset
            </button>
          </div>
        </div>

        <ResumeTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === "builder" ? (
          <div className="grid items-start gap-6 xl:grid-cols-[1fr_0.9fr]">
            <div className="space-y-5">
              <PersonalDetails
                personal={resume.personal}
                updatePersonal={updatePersonal}
              />

              <ProfessionalSummary
                summary={resume.summary}
                setSummary={(summary) =>
                  setResume((previous) => ({ ...previous, summary }))
                }
              />

              <SkillsSection
                skills={resume.skills}
                setSkills={(skills) =>
                  setResume((previous) => ({ ...previous, skills }))
                }
              />

              <ProjectsSection
                projects={resume.projects}
                setProjects={(projects) =>
                  setResume((previous) => ({ ...previous, projects }))
                }
              />

              <ExperienceSection
                experience={resume.experience}
                setExperience={(experience) =>
                  setResume((previous) => ({ ...previous, experience }))
                }
              />

              <EducationSection
                education={resume.education}
                setEducation={(education) =>
                  setResume((previous) => ({ ...previous, education }))
                }
              />
            </div>

            <div className="xl:sticky xl:top-24">
              <ResumePreview resume={resume} />
            </div>
          </div>
        ) : (
          <ATSChecker resume={resume} />
        )}
      </div>
    </main>
  );
};

export default ResumeBuilder;
