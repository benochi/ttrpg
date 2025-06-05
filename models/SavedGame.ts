import mongoose, { Schema, Document } from "mongoose";

export interface ISavedGame extends Document {
  game: mongoose.Types.ObjectId;
  slot: number;
  characters: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const SavedGameSchema = new Schema<ISavedGame>(
  {
    game: { type: Schema.Types.ObjectId, ref: 'Game', required: true },
    slot: { type: Number, required: true },
    characters: [{ type: Schema.Types.ObjectId, ref: 'Character' }]
  },
  { timestamps: true }
);

export default mongoose.models.SavedGame || mongoose.model<ISavedGame>("SavedGame", SavedGameSchema);
