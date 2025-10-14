
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

export async function upsertTodayJournal(
  journal: string,
  formatting: any,
  userId: string,
  imageUrl?: string
) {
  const uid = toObjId(userId);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const update: any = { journal, formatting, date: new Date(), userId: uid };
  if (imageUrl) update.imageUrl = imageUrl;
  return journalRepo.findOneAndUpdate(
    { userId: uid, date: { $gte: today, $lt: tomorrow } },
    update
  );
}

export async function getJournalById(id: string) {
  return journalRepo.findById(id);
}

// editJournal removed: all updates must go through upsertTodayJournal (POST)

export async function removeJournal(id: string) {
  const _id = toObjId(id);
  return journalRepo.findByIdAndDelete(_id.toString());
}

export async function upsertTodayJournalImage(userId: string, imageUrl: string) {
  const uid = toObjId(userId);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  return journalRepo.findOneAndUpdate(
    { userId: uid, date: { $gte: today, $lt: tomorrow } },
    { imageUrl, date: new Date(), userId: uid }
  );
}
