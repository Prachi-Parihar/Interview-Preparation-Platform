
import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FaCheck } from "react-icons/fa";
import { interviewTabs } from "../../data/homeData";

const InterviewTypes = () => {
  const [tab, setTab] = useState(0);

  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ab2552]">
            Choose your practice
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-5xl">
            Train for the round that matters to you.
          </h2>
          <p className="mt-4 leading-7 text-gray-600">
            Explore different interview formats and understand which skills
            each round evaluates.
          </p>

          <div className="mt-7 flex flex-col gap-3">
            {interviewTabs.map((item, index) => (
              <button
                key={item.label}
                onClick={() => setTab(index)}
                className={`rounded-xl border px-5 py-4 text-left text-sm font-semibold transition ${
                  tab === index
                    ? "border-black bg-black text-white"
                    : "border-black/10 hover:bg-gray-50"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="min-h-[320px] rounded-3xl bg-[#F5F5F5] p-6 sm:p-9">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Sample question
              </p>
              <h3 className="mt-4 text-2xl font-semibold leading-snug">
                {interviewTabs[tab]?.question}
              </h3>

              <p className="mt-8 text-sm font-semibold">Skills assessed</p>
              <ul className="mt-4 space-y-3">
                {(interviewTabs[tab]?.checks || []).map((check) => (
                  <li key={check} className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#ab2552] text-white">
                      <FaCheck size={10} />
                    </span>
                    {check}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default InterviewTypes;
