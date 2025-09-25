import { Schema, model, Types } from 'mongoose';

// Raw document interface. Contains the data type as it will be stored
// in MongoDB. So you can ObjectId, Buffer, and other custom primitive data types.
// But no Mongoose document arrays or subdocuments.
export interface IPet {
  name: string;
  color: string;
  user: Types.ObjectId;
}

// Schema
const Petschema = new Schema<IPet>({
  name: { type: String, required: true, unique: true, trim: true},
  color: { type: String, required: true, enum : ['red','pink','green'] },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

const PetModel = model('Pet', Petschema);

export default PetModel;