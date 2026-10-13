import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllInterviews } from "../apis/interviewApi.js";

const initialState = {
  stats: {
    totalInterviews: 0,
    totalQuestions: 0,
    completed: 0,
    averageScore: 0,
  },
  technicalData: [],
  hrData: [],
  technicalCount: 0,
  hrCount: 0,
  loading: false,
  error: null,
};

export const fetchInterviews = createAsyncThunk(
  "interview/fetchInterviews",
  async (_, { rejectWithValue }) => {
    const response = await getAllInterviews();

    if (!response) {
      return rejectWithValue("Failed to fetch interviews");
    }

    return response;
  }
);

const interviewSlice = createSlice({
  name: "interview",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInterviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInterviews.fulfilled, (state, action) => {
        state.loading = false;

        const data = action.payload;

        state.stats = {
          ...initialState.stats,
          ...(data.stats || {}),
        };

        state.technicalData = data.technicalData || [];
        state.hrData = data.hrData || [];
        state.technicalCount = data.technicalCount || 0;
        state.hrCount = data.hrCount || 0;
      })
      .addCase(fetchInterviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default interviewSlice.reducer;
