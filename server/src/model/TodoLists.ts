import { Schema, model, Types } from "mongoose";

export interface ITodoList {
  todo: string;
  date: Date;
  user: Types.ObjectId;        
  order: number;
  done: boolean;
}

const Todoschema = new Schema<ITodoList>({
  todo:  { type: String, required: true },
  date:  { type: Date, default: Date.now },
  user:  { type: Schema.Types.ObjectId, ref: "User", required: true }, // ⬅️ user
  order: { type: Number, default: 0 },
  done:  { type: Boolean, default: false },
});

Todoschema.index({ user: 1, order: 1 }); // snabb sortering per user
export default model<ITodoList>("ITodoList", Todoschema);
