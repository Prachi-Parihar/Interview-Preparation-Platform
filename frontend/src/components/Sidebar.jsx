
import React from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  FaMicrophone,
  FaPlus,
  FaTimes,
  FaSignOutAlt,
} from "react-icons/fa";
import {
  FiFileText,
  FiHome,
  FiMap,
  FiMic,
  FiSidebar,
  FiStar,
} from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
function Sidebar({
  user,
  onNewInterview,
  onLogout,
  sidebarOpen,
  setSidebarOpen,
  mobileOpen,
  setMobileOpen
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: "Overview", icon: <FiHome size={17} />, path: "/dashboard" },
    { label: "Interviews", icon: <FiMic size={17} />, path: "/interview" },
    {
      label: "Resume Builder",
      icon: <FiFileText size={17} />,
      path: "/resume",
    },
    {
      label: "Roadmap Builder",
      icon: <FiMap size={17} />,
      path: "/roadmap",
    },
    {
      label: "Resume Scorer",
      icon: <FiStar size={17} />,
      path: "/scorer",
    },
  ];

  const inner = (expanded, isMobile = false) => (
    <div className="flex h-full min-h-0 flex-col">
     
{/* Sidebar Header */}
<div
  className={`flex h-[52px] shrink-0 items-center border-b border-black/10 ${
    expanded
      ? "justify-between px-3"
      : "justify-center px-0"
  }`}
>
  <button
    type="button"
    onClick={() => navigate("/dashboard")}
    className={`flex shrink-0 items-center overflow-hidden text-left ${
      expanded ? "gap-3" : "justify-center"
    }`}
    aria-label="Go to InterviewAI dashboard"
  >
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black text-white">
      <FaMicrophone className="h-4 w-4 shrink-0" />
    </div>

    {expanded && (
      <div className="whitespace-nowrap">
        <h1 className="font-bold tracking-tight text-gray-900">
          Interview<span className="text-[#ab2552]">AI</span>
        </h1>

        <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-gray-400">
          Interview Prep
        </p>
      </div>
    )}
  </button>

  {!isMobile && (
    <motion.button
      type="button"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setSidebarOpen((prev) => !prev)}
      title={expanded ? "Collapse sidebar" : "Expand sidebar"}
      aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
      className="hidden shrink-0 rounded-lg p-1 text-black/50 transition-colors hover:bg-gray-100 hover:text-black md:flex"
    >
      <FiSidebar size={18} />
    </motion.button>
  )}

  {isMobile && (
    <button
      type="button"
      onClick={() => setMobileOpen(false)}
      aria-label="Close sidebar"
      className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-600"
    >
      <FaTimes size={18} />
    </button>
  )}
</div>

      {/* Create Interview */}
      <div className="shrink-0 px-3 pt-6">
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            if (onNewInterview) {
              onNewInterview();
            } else {
              navigate("/interview");
            }

            if (isMobile) setMobileOpen(false);
          }}
          title={!expanded ? "Create Interview" : undefined}
          aria-label="Create Interview"
          className={`flex w-full items-center gap-2 rounded-xl bg-[#1b2029] py-3 text-sm font-semibold text-white transition hover:bg-[#ab2552] ${
            expanded ? "justify-center px-2.5" : "justify-center px-0"
          }`}
        >
          <FaPlus className="h-3 w-3 shrink-0" />

          {expanded && (
            <span className="whitespace-nowrap text-xs">
              Create Interview
            </span>
          )}
        </motion.button>
      </div>

      {/* Navigation */}
      <nav className="mt-6 flex flex-col gap-2 px-3">
        {navItems.map((item) => {
          const active = location.pathname === item.path;

          return (
            <motion.button
              key={item.path}
              type="button"
              whileTap={{ scale: 0.98 }}
              title={!expanded ? item.label : undefined}
              aria-label={item.label}
              aria-current={active ? "page" : undefined}
              onClick={() => {
                navigate(item.path);
                if (isMobile) setMobileOpen(false);
              }}
              className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm transition-all ${
                active
                  ? "bg-black text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100 hover:text-black"
              } ${expanded ? "" : "justify-center"}`}
            >
              <span
                className={`flex w-4 shrink-0 justify-center ${
                  active ? "text-white" : "group-hover:text-[#ab2552]"
                }`}
              >
                {item.icon}
              </span>

              {expanded && (
                <span className="whitespace-nowrap">{item.label}</span>
              )}
            </motion.button>
          );
        })}
      </nav>


      {/* User Profile */}
      <div className="mt-auto shrink-0 border-t border-black/5 p-3">
        <div
          className={`mb-3 flex items-center gap-3 rounded-xl bg-[#F5F5F3] p-2 ${
            expanded ? "" : "justify-center"
          }`}
          title={!expanded ? user?.name || "Developer" : undefined}
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#d14d75] text-sm font-bold text-white">
            {(user?.name?.trim()?.charAt(0) || "D").toUpperCase()}
          </div>

          {expanded && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-gray-900">
                {user?.name || "Developer"}
              </p>
              <p className="truncate text-[11px] text-gray-500">
                {user?.email || "Email not available"}
              </p>
            </div>
          )}
        </div>

        {/* Logout */}
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={onLogout}
          title={!expanded ? "Logout" : undefined}
          aria-label="Logout"
          className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-500 transition hover:bg-red-50 hover:text-red-600 ${
            expanded ? "" : "justify-center"
          }`}
        >
          <FaSignOutAlt size={15} className="shrink-0" />

          {expanded && <span className="font-medium">Logout</span>}
        </motion.button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 260 : 72 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="fixed left-0 top-0 z-40 hidden h-screen flex-col overflow-x-hidden overflow-y-auto border-r border-black/10 bg-white md:flex"
      >
        {inner(sidebarOpen)}
      </motion.aside>

      {/* Mobile Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: mobileOpen ? 0 : "-100%" }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="fixed left-0 top-0 z-50 flex h-screen w-[260px] flex-col overflow-y-auto border-r border-black/10 bg-white shadow-xl md:hidden"
      >
        {inner(true, true)}
      </motion.aside>
    </>
  );
}

export default Sidebar;
