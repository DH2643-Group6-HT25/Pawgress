import { Schema, model, Types } from 'mongoose'

export interface IPet {
  name: string
  color: string
  health: number
  lastUpdate: Date
  userId: Types.ObjectId
}

// Schema
const Petschema = new Schema<IPet>({
  name: { type: String, required: true, trim: true },
  color: {
    type: String,
    required: true,
    enum: ['red', 'pink', 'green', 'black'],
  },
  health: { type: Number, required: true },
  lastUpdate: { type: Date },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
})

const PetModel = model('Pet', Petschema)

export default PetModel
