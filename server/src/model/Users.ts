import { Schema, model, Types } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  passwordHash: string;
  pet: Types.ObjectId;
  todo: Types.ObjectId[];
  dailyJournal: Types.ObjectId[];
  streak: Types.ObjectId;
  food: number;
}

const Userschema = new Schema<IUser>({
  name: { type: String, required: true, unique: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function (value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: "Invalid email address format",
    },
  },
  passwordHash: { type: String, required: true },
  pet: { type: Schema.Types.ObjectId, ref: "Pet" },
  todo: [{ type: Schema.Types.ObjectId, ref: "ITodoList" }],
  dailyJournal: [{ type: Schema.Types.ObjectId, ref: "IDailyJournal" }],
  streak: { type: Schema.Types.ObjectId, ref: "IStreak" },
  food: { type: Number, required: true, default: 0 },
});

const UserModel = model<IUser>("User", Userschema);

export default UserModel;
