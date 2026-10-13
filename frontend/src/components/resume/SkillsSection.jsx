
import { Code2 } from "lucide-react";

const SkillsSection = ({ skills, setSkills }) => {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5">
      <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-800">
        <Code2 size={20} className="text-[#ab2552]" />
        Technical Skills
      </h2>

      <textarea
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
        rows={4}
        placeholder="JavaScript, React.js, Tailwind CSS, Node.js, Express.js, MongoDB, Git..."
        className="w-full resize-y rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-[#ab2552] focus:ring-2 focus:ring-pink-100"
      />

      <p className="mt-2 text-xs text-slate-500">
        Separate skills using commas. Include only skills you can explain in an interview.
      </p>
    </section>
  );
};

export default SkillsSection;
