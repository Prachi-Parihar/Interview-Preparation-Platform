
import { FileText, SearchCheck } from "lucide-react";

const ResumeTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "builder", label: "Resume Builder", icon: FileText },
    { id: "ats", label: "ATS Checker", icon: SearchCheck },
  ];

  return (
    <div className="mb-6 flex gap-2 border-b border-slate-200">
      {tabs.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => setActiveTab(id)}
          className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition ${
            activeTab === id
              ? "border-[#ab2552] text-[#ab2552]"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <Icon size={17} />
          {label}
        </button>
      ))}
    </div>
  );
};

export default ResumeTabs;
