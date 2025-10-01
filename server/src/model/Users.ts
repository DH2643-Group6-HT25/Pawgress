import { Schema, model, Types } from "mongoose";

// Raw document interface. Contains the data type as it will be stored
// in MongoDB. So you can ObjectId, Buffer, and other custom primitive data types.
// But no Mongoose document arrays or subdocuments.
export interface IUser {
  name: string;
  email: string;
  passwordHash: string;
  pet: Types.ObjectId;
  todo: Types.ObjectId[];
  dailyJournal: Types.ObjectId[];
  streak: Types.ObjectId[];
  food: number;
}

// Schema
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
  streak: [{ type: Schema.Types.ObjectId, ref: "IStreak" }],
  food: { type: Number, required: true, default: 0 },
});

const UserModel = model("User", Userschema);

const doc = new UserModel({ name: "test", email: "test" });

console.log(doc.name); // string
console.log(doc.email); // string

export default UserModel;
