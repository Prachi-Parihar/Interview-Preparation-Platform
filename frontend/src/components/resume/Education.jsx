
import { GraduationCap, Plus, Trash2 } from "lucide-react";
import { createId } from "../../utils/resume.js";

const Education = ({ education, setEducation }) => {
  const addEducation = () => {
    setEducation([
      ...education,
      {
        id: createId(),
        degree: "",
        college: "",
        duration: "",
        details: "",
      },
    ]);
  };

  const updateItem = (id, key, value) => {
    setEducation(
      education.map((item) =>
        item.id === id ? { ...item, [key]: value } : item
      )
    );
  };

  const removeItem = (id) => {
    setEducation(education.filter((item) => item.id !== id));
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-800">
          <GraduationCap size={20} className="text-[#ab2552]" />
          Education
        </h2>
        <button
          onClick={addEducation}
          className="flex items-center gap-1.5 rounded-lg bg-[#ab2552] px-3 py-2 text-sm font-medium text-white hover:bg-[#8f1d43]"
        >
          <Plus size={16} /> Add Education
        </button>
      </div>

      <div className="space-y-5">
        {education.length === 0 && (
          <p className="text-sm text-slate-500">
            Add your degree, college, CGPA and study duration.
          </p>
        )}

        {education.map((item, index) => (
          <div key={item.id} className="rounded-xl border border-slate-200 p-4">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-medium text-slate-700">
                Education {index + 1}
              </h3>
              <button
                onClick={() => removeItem(item.id)}
                aria-label="Remove education"
                className="rounded-lg p-2 text-red-500 hover:bg-red-50"
              >
                <Trash2 size={17} />
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <input
                value={item.degree}
                onChange={(e) => updateItem(item.id, "degree", e.target.value)}
                placeholder="B.Tech in Computer Science"
                className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#ab2552]"
              />
              <input
                value={item.college}
                onChange={(e) => updateItem(item.id, "college", e.target.value)}
                placeholder="College / University"
                className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#ab2552]"
              />
              <input
                value={item.duration}
                onChange={(e) => updateItem(item.id, "duration", e.target.value)}
                placeholder="2024 – 2028"
                className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#ab2552]"
              />
              <input
                value={item.details}
                onChange={(e) => updateItem(item.id, "details", e.target.value)}
                placeholder="CGPA: 8.64 / 10"
                className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#ab2552]"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;
