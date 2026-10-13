
import React from "react";
import { motion } from "motion/react";
import { FaArrowRight } from "react-icons/fa";
import { GiArtificialHive } from "react-icons/gi";
import { navLinks } from "../../data/homeData";

const HomeNavbar = ({ onLogin }) => {
  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed left-0 right-0 top-0 z-50 border-b border-black/5 bg-white/90 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#home" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white">
            <GiArtificialHive size={21} />
          </div>
          <div>
            <h1 className="font-bold text-gray-900">
              Interview<span className="text-[#ab2552]">AI</span>
            </h1>
            <p className="text-[10px] uppercase tracking-widest text-gray-400">
              Practice. Improve. Succeed.
            </p>
          </div>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm text-gray-600 transition hover:text-[#ab2552]"
            >
              {item.label}
            </a>
          ))}
        </div>

        <button
          onClick={onLogin}
          className="flex items-center gap-2 rounded-xl bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#ab2552]"
        >
          Login <FaArrowRight size={12} />
        </button>
      </div>
    </motion.nav>
  );
};

export default HomeNavbar;
