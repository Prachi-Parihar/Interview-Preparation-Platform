
import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { GiArtificialHive } from "react-icons/gi";

const HomeFooter = () => {
  return (
    <footer className="border-t border-black/10 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 sm:flex-row sm:px-8">
        <a href="#home" className="flex items-center gap-2 font-bold">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-white">
            <GiArtificialHive size={17} />
          </span>
          Interview<span className="text-[#ab2552]">AI</span>
        </a>

        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} InterviewAI. Keep learning, keep improving.
        </p>

        <div className="flex gap-4 text-gray-500">
          <a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-black">
            <FaGithub size={18} />
          </a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-black">
            <FaLinkedin size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default HomeFooter;
