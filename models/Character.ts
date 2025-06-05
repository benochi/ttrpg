import mongoose, { Schema, Document } from "mongoose";

export interface ICharacter extends Document {
  savedGame: mongoose.Types.ObjectId;
  name: string;
  level: number;
  inventory: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const CharacterSchema = new Schema<ICharacter>(
  {
    savedGame: { type: Schema.Types.ObjectId, ref: 'SavedGame', required: true },
    name: { type: String, required: true },
    level: { type: Number, default: 1 },
    inventory: { type: Schema.Types.ObjectId, ref: 'Inventory' }
  },
  { timestamps: true }
);

export default mongoose.models.Character || mongoose.model<ICharacter>("Character", CharacterSchema);
