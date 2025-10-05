import { Schema, model, Types } from "mongoose";

// Raw document interface. Contains the data type as it will be stored
// in MongoDB. So you can ObjectId, Buffer, and other custom primitive data types.
// But no Mongoose document arrays or subdocuments.
export interface IStreakHistory {
  date: Date;
  finishedTodos: number;
}

export interface IStreak {
  currentStreak: number;
  bestStreak: number;
  history: IStreakHistory[];
  userId: Types.ObjectId;
}

// Schema
const StreakHistoryschema = new Schema<IStreakHistory>({
  date: { type: Date, required: true },
  finishedTodos: { type: Number, default: 0 },
});

const Streakschema = new Schema<IStreak>({
  currentStreak: { type: Number, default: 0 },
  bestStreak: { type: Number, default: 0 },
  history: [StreakHistoryschema],
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const StreakModel = model("IStreak", Streakschema);

export default StreakModel;
