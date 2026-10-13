
import React from "react";
import { motion } from "motion/react";
import {
  FaMicrophone,
  FaFileAlt,
  FaChartBar,
  FaMap,
} from "react-icons/fa";
import { roadmapTopics } from "../../data/homeData";

const features = [
  {
    icon: FaMicrophone,
    title: "Mock Interviews",
    desc: "Practise HR, technical and coding questions in a structured interview experience.",
  },
  {
    icon: FaFileAlt,
    title: "Resume Review",
    desc: "Review your resume, identify missing skills and find areas to improve.",
  },
  {
    icon: FaChartBar,
    title: "Performance Insights",
    desc: "Understand answer quality, strengths and improvement areas after a session.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="bg-[#F5F5F5] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ab2552]">
          Everything in one place
        </p>
        <h2 className="mt-3 max-w-2xl text-3xl font-bold sm:text-5xl">
          Prepare for every step of your career journey.
        </h2>
        <p className="mt-4 max-w-xl leading-7 text-gray-600">
          Practise your answers, improve your resume and use feedback to
          focus your preparation.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-black/10 bg-white p-7"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-black text-white">
                  <Icon size={19} />
                </div>
                <h3 className="mt-5 text-xl font-bold">{feature.title}</h3>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  {feature.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-5 rounded-2xl bg-black p-7 text-white sm:flex sm:items-center sm:justify-between sm:gap-8">
          <div className="max-w-xl">
            <FaMap className="text-pink-300" size={20} />
            <h3 className="mt-4 text-2xl font-bold">Personalised Learning Roadmap</h3>
            <p className="mt-2 text-sm leading-6 text-gray-300">
              Turn skill gaps into focused learning goals and build a plan
              for your next interview.
            </p>
          </div>

          <div className="mt-5 flex flex-wrap gap-2 sm:mt-0 sm:justify-end">
            {roadmapTopics.map((topic) => (
              <span
                key={topic}
                className="rounded-full border border-white/20 px-3 py-2 text-xs text-gray-200"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
