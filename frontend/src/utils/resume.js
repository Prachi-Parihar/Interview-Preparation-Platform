
export const INITIAL_RESUME = {
  personal: {
    name: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
  },
  summary: "",
  skills: "",
  projects: [],
  experience: [],
  education: [],
};

export const COMMON_KEYWORDS = [
  "javascript",
  "react",
  "react.js",
  "node.js",
  "nodejs",
  "express",
  "mongodb",
  "mongoose",
  "mern",
  "rest api",
  "rest apis",
  "jwt",
  "authentication",
  "tailwind css",
  "redux",
  "redux toolkit",
  "git",
  "github",
  "html",
  "css",
  "responsive design",
  "docker",
  "redis",
];

export const loadResume = () => {
  try {
    const saved = localStorage.getItem("resume-data");
    return saved
      ? { ...INITIAL_RESUME, ...JSON.parse(saved) }
      : INITIAL_RESUME;
  } catch {
    return INITIAL_RESUME;
  }
};

export const getATSResult = (resume, jobDescription) => {
  const resumeText = [
    resume.personal.name,
    resume.personal.email,
    resume.personal.location,
    resume.summary,
    resume.skills,
    ...resume.projects.map((item) =>
      `${item.title || ""} ${item.technologies || ""} ${item.description || ""}`
    ),
    ...resume.experience.map((item) =>
      `${item.role || ""} ${item.company || ""} ${item.description || ""}`
    ),
    ...resume.education.map((item) =>
      `${item.degree || ""} ${item.college || ""} ${item.details || ""}`
    ),
  ]
    .join(" ")
    .toLowerCase();

  const jobText = jobDescription.toLowerCase();

  const keywords = COMMON_KEYWORDS.filter((keyword) =>
    jobText.includes(keyword.toLowerCase())
  );

  const matched = keywords.filter((keyword) =>
    resumeText.includes(keyword.toLowerCase())
  );

  const missing = keywords.filter(
    (keyword) => !resumeText.includes(keyword.toLowerCase())
  );

  const keywordScore = keywords.length
    ? Math.round((matched.length / keywords.length) * 100)
    : 0;

  const completeness = [
    Boolean(resume.personal.name),
    Boolean(resume.personal.email),
    Boolean(resume.personal.phone),
    Boolean(resume.summary),
    Boolean(resume.skills),
    resume.projects.length > 0,
    resume.education.length > 0,
  ];

  const completenessScore = Math.round(
    (completeness.filter(Boolean).length / completeness.length) * 100
  );

  return {
    score: Math.round(keywordScore * 0.7 + completenessScore * 0.3),
    keywordScore,
    completenessScore,
    matched,
    missing,
    total: keywords.length,
  };
};

export const createId = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
