
import JournalModel, { IDailyJournal } from "../model/DailyJournals";
import { FilterQuery, Types, UpdateQuery } from "mongoose";

export const findById = (id: string) =>
  JournalModel.findById(id).lean();

export const findByUser = (userId: Types.ObjectId) =>
  JournalModel.find({ userId }).sort({ date: -1 }).lean();

export const findToday = (userId: Types.ObjectId, today: Date, tomorrow: Date) =>
  JournalModel.findOne({ userId, date: { $gte: today, $lt: tomorrow } }).lean();

export const create = (doc: Partial<IDailyJournal>) =>
  JournalModel.create(doc);

export const findOneAndUpdate = (filter: FilterQuery<IDailyJournal>, update: UpdateQuery<IDailyJournal>) =>
  JournalModel.findOneAndUpdate(filter, update, { new: true, upsert: true }).lean();

export const findByIdAndDelete = (id: string) =>
  JournalModel.findByIdAndDelete(id).lean();
