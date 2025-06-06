import mongoose, { Schema, Document } from "mongoose";

export interface IGameTitle extends Document {
  name: string;
  description: string;
  developer: string;
  genre: string;
  tags: string[];
  features: string[];
  releaseDate: Date;
  thumbnailUrl?: string;
  coverImageUrl?: string;
  isFree: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const GameTitleSchema = new Schema<IGameTitle>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    developer: { type: String, required: true },
    genre: { type: String, required: true },
    tags: [{ type: String }],
    features: [{ type: String }],
    releaseDate: { type: Date, required: true },
    thumbnailUrl: { type: String },
    coverImageUrl: { type: String },
    isFree: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.models.GameTitle || mongoose.model<IGameTitle>("GameTitle", GameTitleSchema);
