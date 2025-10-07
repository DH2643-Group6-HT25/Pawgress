import type { RootState } from "../models";
import type { StreakHistoryObject } from "../models/streak/streakType";

interface StreakState {
  currentStreak: number;
  bestStreak: number;
  streakHistory: Array<StreakHistoryObject>;
}

export function mapStateToDashboardHistoryProps(state: RootState): StreakState {
  return {
    currentStreak: state.streak.currentStreak,
    bestStreak: state.streak.bestStreak,
    streakHistory: state.streak.streakHistory,
  };
}
