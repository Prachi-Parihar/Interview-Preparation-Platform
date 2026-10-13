
import { Download, ExternalLink } from "lucide-react";

const ResumePreview = ({ resume }) => {
  const { personal, summary, skills, projects, experience, education } = resume;

  const hasContact =
    personal.email ||
    personal.phone ||
    personal.location ||
    personal.linkedin ||
    personal.github;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">
            Resume Preview
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Review your details before saving as PDF.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 rounded-xl bg-[#ab2552] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#8f1d43]"
        >
          <Download size={17} />
          Download PDF
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg bg-slate-100 p-2 sm:p-5">
        <article
          id="resume-print-root"
          className="mx-auto min-h-[297mm] w-full max-w-[210mm] bg-white px-6 py-8 text-[12px] leading-[1.55] text-slate-800 shadow-sm sm:px-10 sm:py-10"
        >
          <header className="border-b-2 border-slate-800 pb-4 text-center">
            <h1 className="break-words text-2xl font-bold uppercase tracking-wide">
              {personal.name || "Your Name"}
            </h1>

            {hasContact && (
              <div className="mt-2 flex flex-wrap justify-center gap-x-3 gap-y-1 text-[11px] text-slate-600">
                {personal.email && <span>{personal.email}</span>}
                {personal.phone && <span>{personal.phone}</span>}
                {personal.location && <span>{personal.location}</span>}
                {personal.linkedin && (
                  <a href={personal.linkedin} className="break-all underline">
                    LinkedIn
                  </a>
                )}
                {personal.github && (
                  <a href={personal.github} className="break-all underline">
                    GitHub
                  </a>
                )}
              </div>
            )}
          </header>

          {summary && (
            <section className="mt-5">
              <h2 className="mb-2 border-b border-slate-400 pb-1 text-sm font-bold uppercase tracking-wide">
                Professional Summary
              </h2>
              <p className="whitespace-pre-line">{summary}</p>
            </section>
          )}

          {skills && (
            <section className="mt-5">
              <h2 className="mb-2 border-b border-slate-400 pb-1 text-sm font-bold uppercase tracking-wide">
                Technical Skills
              </h2>
              <p className="whitespace-pre-line">{skills}</p>
            </section>
          )}

          {projects.some(
            (item) =>
              item.title ||
              item.technologies ||
              item.description ||
              item.link
          ) && (
            <section className="mt-5">
              <h2 className="mb-3 border-b border-slate-400 pb-1 text-sm font-bold uppercase tracking-wide">
                Projects
              </h2>

              {projects.map((project) =>
                project.title ||
                project.technologies ||
                project.description ||
                project.link ? (
                  <div key={project.id} className="mb-4 break-inside-avoid">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                      <h3 className="font-bold">
                        {project.title || "Project"}
                      </h3>
                      {project.link && (
                        <a
                          href={project.link}
                          className="break-all text-[10px] underline"
                        >
                          Project Link
                        </a>
                      )}
                    </div>
                    {project.technologies && (
                      <p className="mt-1 italic text-slate-600">
                        {project.technologies}
                      </p>
                    )}
                    {project.description && (
                      <p className="mt-1 whitespace-pre-line">
                        {project.description}
                      </p>
                    )}
                  </div>
                ) : null
              )}
            </section>
          )}

          {experience.some(
            (item) =>
              item.role || item.company || item.duration || item.description
          ) && (
            <section className="mt-5">
              <h2 className="mb-3 border-b border-slate-400 pb-1 text-sm font-bold uppercase tracking-wide">
                Experience
              </h2>

              {experience.map((item) =>
                item.role ||
                item.company ||
                item.duration ||
                item.description ? (
                  <div key={item.id} className="mb-4 break-inside-avoid">
                    <div className="flex flex-wrap justify-between gap-x-2">
                      <h3 className="font-bold">
                        {[item.role, item.company].filter(Boolean).join(" | ")}
                      </h3>
                      {item.duration && (
                        <span className="text-slate-600">{item.duration}</span>
                      )}
                    </div>
                    {item.description && (
                      <p className="mt-1 whitespace-pre-line">
                        {item.description}
                      </p>
                    )}
                  </div>
                ) : null
              )}
            </section>
          )}

          {education.some(
            (item) =>
              item.degree || item.college || item.duration || item.details
          ) && (
            <section className="mt-5">
              <h2 className="mb-3 border-b border-slate-400 pb-1 text-sm font-bold uppercase tracking-wide">
                Education
              </h2>

              {education.map((item) =>
                item.degree ||
                item.college ||
                item.duration ||
                item.details ? (
                  <div key={item.id} className="mb-3 break-inside-avoid">
                    <div className="flex flex-wrap justify-between gap-x-2">
                      <h3 className="font-bold">
                        {[item.degree, item.college]
                          .filter(Boolean)
                          .join(" | ")}
                      </h3>
                      {item.duration && (
                        <span className="text-slate-600">{item.duration}</span>
                      )}
                    </div>
                    {item.details && <p className="mt-1">{item.details}</p>}
                  </div>
                ) : null
              )}
            </section>
          )}
        </article>
      </div>

      <style>{`
        @media print {
          @page {
            size: A4;
            margin: 12mm;
          }

          body * {
            visibility: hidden !important;
          }

          #resume-print-root,
          #resume-print-root * {
            visibility: visible !important;
          }

          #resume-print-root {
            position: absolute !important;
            inset: 0 auto auto 0 !important;
            width: 100% !important;
            max-width: none !important;
            min-height: 0 !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            font-size: 10pt !important;
          }

          #resume-print-root section,
          #resume-print-root header {
            break-inside: avoid;
          }

          a {
            color: inherit !important;
            text-decoration: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default ResumePreview;
