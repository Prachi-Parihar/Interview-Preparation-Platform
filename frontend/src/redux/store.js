import { configureStore } from "@reduxjs/toolkit";
import resumeSlice from "./resumeSlice.js";
import interviewSlice from "./interviewSlice.js";

export const store = configureStore({
  reducer: {
    resume: resumeSlice,
    interview: interviewSlice,
  },
});
