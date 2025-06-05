import mongoose, { Schema, Document } from "mongoose";

export interface IGame extends Document {
  account: mongoose.Types.ObjectId;
  title: string;
  saves: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const GameSchema = new Schema<IGame>(
  {
    account: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    title: { type: String, required: true },
    saves: [{ type: Schema.Types.ObjectId, ref: 'SavedGame' }]
  },
  { timestamps: true }
);

export default mongoose.models.Game || mongoose.model<IGame>("Game", GameSchema);
