import { Types } from "mongoose";
import * as journalRepo from "../repository/journalRepo";

const toObjId = (id: string) => {
  if (!Types.ObjectId.isValid(id)) throw new Error("Invalid ObjectId");
  return new Types.ObjectId(id);
};

export async function getJournalsForUser(userId: string) {
  const uid = toObjId(userId);
  return journalRepo.findByUser(uid);
}

export async function upsertTodayJournal(journal: string, formatting: any, userId: string) {
  const uid = toObjId(userId);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  return journalRepo.findOneAndUpdate(
    { userId: uid, date: { $gte: today, $lt: tomorrow } },
    { journal, formatting, date: new Date(), userId: uid }
  );
}

export async function editJournal(id: string, patch: { journal?: string; formatting?: any }) {
  const _id = toObjId(id);
  const update: Record<string, unknown> = {};
  if (patch.journal !== undefined) update.journal = patch.journal;
  if (patch.formatting !== undefined) update.formatting = patch.formatting;
  if (Object.keys(update).length === 0) throw new Error("No updatable fields");
  return journalRepo.findByIdAndUpdate(_id.toString(), { $set: update });
}

export async function removeJournal(id: string) {
  const _id = toObjId(id);
  return journalRepo.findByIdAndDelete(_id.toString());
}
