import TodoModel, { ITodoList } from "../model/TodoLists";
import { FilterQuery, Types, UpdateQuery } from "mongoose";

export const findByUser = (user: Types.ObjectId) =>
  TodoModel.find({ user }).sort({ order: 1, date: 1 }).lean();

export const create = (doc: Partial<ITodoList>) =>
  TodoModel.create(doc);

export const findByIdAndUpdate = (id: string, update: UpdateQuery<ITodoList>) =>
  TodoModel.findByIdAndUpdate(id, update, { new: true }).lean();

export const findByIdAndDelete = (id: string) =>
  TodoModel.findByIdAndDelete(id).lean();

export const updateMany = (filter: FilterQuery<ITodoList>, update: UpdateQuery<ITodoList>) =>
  TodoModel.updateMany(filter, update);