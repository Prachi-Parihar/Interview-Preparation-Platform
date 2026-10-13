
import React from "react";
import { motion } from "motion/react";
import { steps } from "../../data/homeData";

const HowItWorks = () => {
  return (
    <section id="about" className="scroll-mt-20 border-y border-black/5 bg-[#FAFAFA] py-20 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ab2552]">
            Your preparation plan
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-5xl">
            Small steps. Stronger interviews.
          </h2>
          <p className="mt-4 max-w-md leading-7 text-gray-600">
            Follow a simple process to practise, review your performance
            and prepare for your next opportunity.
          </p>
        </div>

        <div>
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="flex gap-4 border-b border-black/10 py-6 first:pt-0 last:border-0"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-sm font-bold text-white">
                {index + 1}
              </div>
              <div>
                <h3 className="font-bold">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
