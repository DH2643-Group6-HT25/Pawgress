import { Schema, model, Types } from "mongoose";

// Raw document interface. Contains the data type as it will be stored
// in MongoDB. So you can ObjectId, Buffer, and other custom primitive data types.
// But no Mongoose document arrays or subdocuments.
export interface ITodoList {
  todo: string;
  date: Date;
  userId: Types.ObjectId;
  order: number;
}

// Schema
const Todoschema = new Schema<ITodoList>({
  todo: { type: String, required: true },
  date: { type: Date, default: Date.now },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  order: { type: Number, default: 0 },
});

const TodoModel = model("ITodoList", Todoschema);

export default TodoModel;
