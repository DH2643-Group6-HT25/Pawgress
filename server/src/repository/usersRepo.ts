import UserModel, { IUser } from "../model/Users";

export const findUserByEmail = (email: string) => UserModel.findOne({ email });
export const createUser = (user: Partial<IUser>) => UserModel.create(user);
export const findUserById = (id: string) => UserModel.findById(id);
export const updateUser = (id: string, update: Partial<IUser>) =>
  UserModel.findByIdAndUpdate(id, update, { new: true });
export const deleteUser = (id: string) => UserModel.findByIdAndDelete(id);
