import { Types } from "mongoose";
import * as journalRepo from "../repository/journalRepo";
import UserModel from "../model/Users";

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
  const updatedJournal = await journalRepo.findOneAndUpdate(
    { userId: uid, date: { $gte: today, $lt: tomorrow } },
    update
  );
  if (updatedJournal && updatedJournal._id) {
    await UserModel.updateOne(
      { _id: uid },
      { $addToSet: { dailyJournal: updatedJournal._id } }
    );
  }
  return updatedJournal;
}

export async function getJournalById(id: string) {
  return journalRepo.findById(id);
}

export async function removeJournal(id: string) {
  const _id = toObjId(id);
  return journalRepo.findByIdAndDelete(_id.toString());
}

export async function upsertTodayJournalImage(
  userId: string,
  imageUrl: string
) {
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
