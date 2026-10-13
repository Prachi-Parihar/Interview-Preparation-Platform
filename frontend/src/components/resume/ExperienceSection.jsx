
import { BriefcaseBusiness, Plus, Trash2 } from "lucide-react";
import { createId } from "../../utils/resume.js";

const ExperienceSection = ({ experience, setExperience }) => {
  const addExperience = () => {
    setExperience([
      ...experience,
      {
        id: createId(),
        role: "",
        company: "",
        duration: "",
        description: "",
      },
    ]);
  };

  const updateItem = (id, key, value) => {
    setExperience(
      experience.map((item) =>
        item.id === id ? { ...item, [key]: value } : item
      )
    );
  };

  const removeItem = (id) => {
    setExperience(experience.filter((item) => item.id !== id));
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-800">
          <BriefcaseBusiness size={20} className="text-[#ab2552]" />
          Experience
        </h2>
        <button
          onClick={addExperience}
          className="flex items-center gap-1.5 rounded-lg bg-[#ab2552] px-3 py-2 text-sm font-medium text-white hover:bg-[#8f1d43]"
        >
          <Plus size={16} /> Add Experience
        </button>
      </div>

      {experience.length === 0 && (
        <p className="text-sm text-slate-500">
          No experience added. If you are a fresher, you can leave this section empty.
        </p>
      )}

      <div className="space-y-5">
        {experience.map((item, index) => (
          <div key={item.id} className="rounded-xl border border-slate-200 p-4">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-medium text-slate-700">
                Experience {index + 1}
              </h3>
              <button
                onClick={() => removeItem(item.id)}
                aria-label="Remove experience"
                className="rounded-lg p-2 text-red-500 hover:bg-red-50"
              >
                <Trash2 size={17} />
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <input
                value={item.role}
                onChange={(e) => updateItem(item.id, "role", e.target.value)}
                placeholder="Role / Job title"
                className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#ab2552]"
              />
              <input
                value={item.company}
                onChange={(e) => updateItem(item.id, "company", e.target.value)}
                placeholder="Company name"
                className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#ab2552]"
              />
              <input
                value={item.duration}
                onChange={(e) => updateItem(item.id, "duration", e.target.value)}
                placeholder="Duration: Jun 2026 – Aug 2026"
                className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#ab2552] sm:col-span-2"
              />
              <textarea
                value={item.description}
                onChange={(e) =>
                  updateItem(item.id, "description", e.target.value)
                }
                placeholder="Responsibilities and achievements"
                rows={3}
                className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#ab2552] sm:col-span-2"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;
