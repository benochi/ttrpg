import mongoose, { Schema, Document } from "mongoose";

export interface ISavedGame extends Document {
  slot: number;
  characters: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const SavedGameSchema = new Schema<ISavedGame>(
  {
    slot: { type: Number, required: true },
    characters: [{ type: Schema.Types.ObjectId, ref: 'Character' }]
  },
  { timestamps: true }
);

export default mongoose.models.SavedGame || mongoose.model<ISavedGame>("SavedGame", SavedGameSchema);
