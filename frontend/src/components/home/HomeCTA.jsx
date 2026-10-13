
import React from "react";
import { motion } from "motion/react";
import { FaArrowRight } from "react-icons/fa";

const HomeCTA = ({ onLogin }) => {
  return (
    <section className="px-5 py-20 sm:px-8 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto max-w-6xl rounded-3xl bg-black px-6 py-14 text-center text-white sm:px-12 sm:py-16"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pink-300">
          Take the next step
        </p>
        <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-bold sm:text-5xl">
          Make your next interview a better one.
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-gray-300">
          Start practising, learn from your answers and keep improving
          one interview at a time.
        </p>

        <button
          onClick={onLogin}
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-pink-100"
        >
          Start Practising <FaArrowRight size={12} />
        </button>
      </motion.div>
    </section>
  );
};

export default HomeCTA;
