
import React from "react";
import { motion } from "motion/react";
import { FaArrowRight, FaCheck, FaMicrophone } from "react-icons/fa";

const HomeHero = ({ onLogin }) => {
  return (
    <section
      id="home"
      className="relative px-5 pb-20 pt-32 sm:px-8 sm:pb-28"
    >
      <div className="absolute right-0 top-24 -z-0 h-72 w-72 rounded-full" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-xs text-gray-600"
          >
            <span className="h-2 w-2 rounded-full bg-green-500" />
            Your personal interview practice space
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl"
          >
            Build Confidence
            <br />
            Before You Face
            <br />
            <span className="text-[#ab2552]">The Interview.</span>
          </motion.h1>

          <p className="mt-6 max-w-lg leading-7 text-gray-600">
            Prepare for HR, technical and coding rounds with AI-powered
            practice sessions. Review your performance, discover weak areas
            and take the next step with confidence.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={onLogin}
              className="flex items-center gap-2 rounded-xl bg-black px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#ab2552]"
            >
              Start a Practice Session <FaArrowRight size={12} />
            </button>

            <a
              href="#features"
              className="rounded-xl border border-black/10 px-6 py-3.5 text-sm font-medium hover:bg-gray-50"
            >
              Explore Features
            </a>
          </div>

          <div className="mt-7 flex flex-wrap gap-4 text-xs text-gray-500">
            {["HR Practice", "Technical Questions", "Coding Rounds"].map(
              (item) => (
                <span key={item} className="flex items-center gap-2">
                  <FaCheck className="text-green-600" />
                  {item}
                </span>
              )
            )}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-3xl border border-black/10 bg-[#F5F5F5] p-5"
        >
          <div className="flex items-center justify-between border-b border-black/10 pb-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white">
                <FaMicrophone />
              </div>
              <div>
                <h3 className="font-semibold">Practice Session</h3>
                <p className="text-xs text-gray-500">Technical Interview</p>
              </div>
            </div>
            <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
              Demo
            </span>
          </div>

          <div className="mt-6 rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Interviewer asks
            </p>
            <p className="mt-3 leading-6">
              How would you improve the performance of a slow web application?
            </p>
          </div>

          <div className="ml-5 mt-4 rounded-2xl bg-black p-5 text-sm leading-6 text-white sm:ml-12">
            I would first identify the bottleneck, check network requests,
            optimize rendering and reduce unnecessary API calls.
          </div>

          <div className="mt-4 rounded-2xl border border-pink-100 bg-white p-5">
            <p className="text-sm font-semibold text-[#ab2552]">
              Feedback Preview
            </p>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              A clear answer. Add a practical example and explain how you
              would measure the improvement.
            </p>
          </div>

          <p className="mt-5 text-center text-xs text-gray-400">
            Sample interface for demonstration
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeHero;
