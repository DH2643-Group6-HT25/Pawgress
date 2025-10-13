import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { StreakHistoryObject } from "./streakType";

interface StreakState {
  currentStreak: number;
  bestStreak: number;
  streakHistory: Array<StreakHistoryObject>;
}

// fake data to test
const initialState: StreakState = {
  currentStreak: 1,
  bestStreak: 3,
  streakHistory: [
    { date: new Date("2025-09-29"), finishedTodos: 3 },
    { date: new Date("2025-10-01"), finishedTodos: 5 },
    { date: new Date("2025-10-03"), finishedTodos: 4 },
    { date: new Date("2025-10-04"), finishedTodos: 7 },
    { date: new Date("2025-10-05"), finishedTodos: 6 },
    { date: new Date("2025-10-08"), finishedTodos: 6 },
    { date: new Date("2025-10-09"), finishedTodos: 7 },
    { date: new Date("2025-10-10"), finishedTodos: 3 },
    { date: new Date("2025-10-13"), finishedTodos: 4 },
  ],
};

export const streakSlice = createSlice({
  name: "streak",
  initialState,
  reducers: {
    setCurrentStreak: (state, action: PayloadAction<number>) => {
      state.currentStreak = action.payload;
    },
    setBestStreak: (state, action: PayloadAction<number>) => {
      state.currentStreak = action.payload;
    },
    setHistory: (state, action: PayloadAction<StreakHistoryObject[]>) => {
      state.streakHistory = action.payload;
    },
  },
});

export default streakSlice.reducer;
export const { setCurrentStreak, setBestStreak, setHistory } =
  streakSlice.actions;
