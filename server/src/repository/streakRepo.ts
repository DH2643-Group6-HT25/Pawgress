import StreakModel, { type IStreak } from '../model/Streaks'

export const getStreakByUserId = async (userId: string) => {
  return StreakModel.findOne({ userId }).lean()
}

// convert it to the object to get only necessary data
export const createStreak = async (userId: string) => {
  const doc = await StreakModel.create({
    userId,
    currentStreak: 0,
    bestStreak: 0,
    streakHistory: [],
  })
  return doc.toObject()
}

export const updateStreak = async (
  userId: string,
  update: Partial<IStreak>
) => {
  return StreakModel.updateOne({ userId }, { $set: update })
}
