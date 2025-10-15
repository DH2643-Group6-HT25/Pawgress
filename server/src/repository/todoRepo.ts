import TodoModel, { type ITodoList } from "../model/TodoLists";
import type { FilterQuery, Types, UpdateQuery } from "mongoose";
import type { AnyBulkWriteOperation } from "mongodb";

export const findByUser = (userId: Types.ObjectId) =>
  TodoModel.find({ userId }).sort({ order: 1, date: 1 }).lean();

export const create = (doc: Partial<ITodoList>) => {
  console.log("todoRepo.create inserting:", doc); 
  return TodoModel.create(doc);
};

export const findByIdAndUpdate = (id: string, update: UpdateQuery<ITodoList>) =>
  TodoModel.findByIdAndUpdate(id, update, { new: true }).lean();

export const findByIdAndDelete = (id: string) => TodoModel.findByIdAndDelete(id).lean();

export const updateMany = (filter: FilterQuery<ITodoList>, update: UpdateQuery<ITodoList>) =>
  TodoModel.updateMany(filter, update);

export const bulkWrite = (ops: AnyBulkWriteOperation<ITodoList>[]) =>
  (TodoModel as any).bulkWrite(ops, { ordered: false });
