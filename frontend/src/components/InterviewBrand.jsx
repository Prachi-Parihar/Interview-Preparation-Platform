
import React from "react";
import { FaMicrophone } from "react-icons/fa";

const InterviewBrand = () => {
  return (
    <div className="flex items-center gap-3 whitespace-nowrap">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black text-white">
        <FaMicrophone className="h-4 w-4" />
      </div>

      <div>
        <h1 className="font-bold tracking-tight text-gray-900">
          Interview<span className="text-[#ab2552]">AI</span>
        </h1>

        <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-gray-400">
          Interview Prep
        </p>
      </div>
    </div>
  );
};

export default InterviewBrand;
