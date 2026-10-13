
import { FolderGit2, Plus, Trash2 } from "lucide-react";
import { createId } from "../../utils/resume.js";

const ProjectsSection = ({ projects, setProjects }) => {
  const addProject = () => {
    setProjects([
      ...projects,
      {
        id: createId(),
        title: "",
        technologies: "",
        description: "",
        link: "",
      },
    ]);
  };

  const updateProject = (id, key, value) => {
    setProjects(
      projects.map((item) =>
        item.id === id ? { ...item, [key]: value } : item
      )
    );
  };

  const removeProject = (id) => {
    setProjects(projects.filter((item) => item.id !== id));
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-800">
          <FolderGit2 size={20} className="text-[#ab2552]" />
          Projects
        </h2>
        <button
          onClick={addProject}
          className="flex items-center gap-1.5 rounded-lg bg-[#ab2552] px-3 py-2 text-sm font-medium text-white hover:bg-[#8f1d43]"
        >
          <Plus size={16} /> Add Project
        </button>
      </div>

      {projects.length === 0 && (
        <p className="text-sm text-slate-500">
          Add your best projects and describe the features you actually implemented.
        </p>
      )}

      <div className="space-y-5">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="rounded-xl border border-slate-200 p-4"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-medium text-slate-700">
                Project {index + 1}
              </h3>
              <button
                onClick={() => removeProject(project.id)}
                aria-label="Remove project"
                className="rounded-lg p-2 text-red-500 hover:bg-red-50"
              >
                <Trash2 size={17} />
              </button>
            </div>

            <div className="space-y-3">
              <input
                value={project.title}
                onChange={(e) =>
                  updateProject(project.id, "title", e.target.value)
                }
                placeholder="Project name"
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#ab2552]"
              />

              <input
                value={project.technologies}
                onChange={(e) =>
                  updateProject(project.id, "technologies", e.target.value)
                }
                placeholder="Technologies: React, Node.js, MongoDB..."
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#ab2552]"
              />

              <textarea
                value={project.description}
                onChange={(e) =>
                  updateProject(project.id, "description", e.target.value)
                }
                placeholder="What does the project do? What did you build?"
                rows={3}
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#ab2552]"
              />

              <input
                value={project.link}
                onChange={(e) =>
                  updateProject(project.id, "link", e.target.value)
                }
                placeholder="GitHub or live project URL"
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#ab2552]"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
