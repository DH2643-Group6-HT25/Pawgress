import { Schema, model, Types } from "mongoose";

// Raw document interface. Contains the data type as it will be stored
// in MongoDB. So you can ObjectId, Buffer, and other custom primitive data types.
// But no Mongoose document arrays or subdocuments.

export interface IFormatting {
  start: number;
  end: number;
  type: "bold" | "italic" | "underline";
}

export interface IDailyJournal {
  journal: string;
  formatting?: IFormatting[];
  imageUrl?: string; // store the img to the cloud?
  date: Date;
  userId: Types.ObjectId;
}

// Schema
const Journalschema = new Schema<IDailyJournal>({
  journal: { type: String, required: true },
  imageUrl: { type: String },
  date: { type: Date, default: Date.now },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const JournalModel = model("IDailyJournal", Journalschema);

export default JournalModel;
