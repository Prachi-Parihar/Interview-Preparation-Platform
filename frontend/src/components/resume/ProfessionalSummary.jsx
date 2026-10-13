
import { AlignLeft } from "lucide-react";

const ProfessionalSummary = ({ summary, setSummary }) => {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5">
      <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-800">
        <AlignLeft size={20} className="text-[#ab2552]" />
        Professional Summary
      </h2>

      <textarea
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        rows={5}
        placeholder="Write a short summary of your skills, projects and career goals..."
        className="w-full resize-y rounded-xl border border-slate-200 px-3 py-3 text-sm leading-6 outline-none focus:border-[#ab2552] focus:ring-2 focus:ring-pink-100"
      />

      <p className="mt-2 text-xs text-slate-500">
        Tip: Mention your strongest skills and relevant project experience.
      </p>
    </section>
  );
};

export default ProfessionalSummary;
