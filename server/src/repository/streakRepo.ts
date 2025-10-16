import StreakModel from '../model/Streaks'

export const getStreakByUserId = async (userId: string) => {
  return StreakModel.findOne({ userId })
}

export const createStreak = async (userId: string) => {
  return StreakModel.create({
    userId,
    currentStreak: 0,
    bestStreak: 0,
    streakHistory: [],
  })
}
