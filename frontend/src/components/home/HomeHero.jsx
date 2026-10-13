
import React from "react";
import { motion } from "motion/react";
import { FaArrowRight, FaCheck, FaMicrophone } from "react-icons/fa";
import interviewImg from "../../assets/interview.jpg";

const HomeHero = ({ onLogin }) => {
  return (
    <section
      id="home"
      className="relative px-5 pb-20 pt-25 sm:px-8 sm:pb-28"
    >
      <div className="absolute right-0 top-24 -z-0 h-10 w-72 rounded-full" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
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
            className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl"
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
          className="overflow-hidden rounded-3xl border border-black/10 bg-[#F5F5F5] p-4 sm:p-5"
        >
          <div className="flex items-center justify-between border-b border-black/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white">
                <FaMicrophone />
              </div>

              <div>
                <h3 className="font-semibold">Practice Session</h3>
                <p className="text-xs text-gray-500">
                  Technical Interview
                </p>
              </div>
            </div>

            <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
              Demo
            </span>
          </div>

          <div className="mt-5 overflow-hidden rounded-2xl bg-white">
            <img
              src={interviewImg}
              alt="AI Interview Practice Session"
              className="h-64 w-full object-cover sm:h-80"
            />
          </div>

          <div className="mt-4 rounded-2xl border border-pink-100 bg-white p-4 sm:p-5">
            <p className="text-sm font-semibold text-[#ab2552]">
              AI-Powered Interview
            </p>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Practice real interview questions, improve your answers
              and build confidence for your next opportunity.
            </p>
          </div>

          <p className="mt-4 text-center text-xs text-gray-400">
            Your personal AI interview practice space
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeHero;
