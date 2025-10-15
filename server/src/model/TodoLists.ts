import { Schema, model, Types } from "mongoose";

export interface ITodoList {
  todo: string;
  date: Date;
  userId: Types.ObjectId;
  order: number;
  done: boolean;
}

const TodoSchema = new Schema<ITodoList>({
  todo:  { type: String, required: true },
  date:  { type: Date, default: Date.now },
  userId:{ type: Schema.Types.ObjectId, ref: "User", required: true },
  order: { type: Number, default: 1 },
  done:  { type: Boolean, default: false },
});

TodoSchema.index({ userId: 1, order: 1 });

export default model<ITodoList>("TodoList", TodoSchema);
