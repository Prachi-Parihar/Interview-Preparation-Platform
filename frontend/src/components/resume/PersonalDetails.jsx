
import { UserRound } from "lucide-react";

const PersonalDetails = ({ personal, updatePersonal }) => {
  const fields = [
    { key: "name", label: "Full Name", placeholder: "Prachi Parihar" },
    { key: "email", label: "Email", placeholder: "you@example.com" },
    { key: "phone", label: "Phone", placeholder: "+91 9876543210" },
    { key: "location", label: "Location", placeholder: "Jaipur, Rajasthan" },
    { key: "linkedin", label: "LinkedIn URL", placeholder: "https://linkedin.com/in/..." },
    { key: "github", label: "GitHub URL", placeholder: "https://github.com/..." },
  ];

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5">
      <h2 className="mb-5 flex items-center gap-2 text-lg font-semibold text-slate-800">
        <UserRound size={20} className="text-[#ab2552]" />
        Personal Details
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((field) => (
          <label key={field.key} className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-700">
              {field.label}
            </span>
            <input
              type="text"
              value={personal[field.key] || ""}
              onChange={(e) => updatePersonal(field.key, e.target.value)}
              placeholder={field.placeholder}
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#ab2552] focus:ring-2 focus:ring-pink-100"
            />
          </label>
        ))}
      </div>
    </section>
  );
};

export default PersonalDetails;
