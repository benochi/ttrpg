import mongoose, { Schema, Document } from "mongoose";

export interface IItem extends Document {
  itemId: number;
  name: string;
  width: number;
  height: number;
  stackable: boolean;
  maxStack?: number;
  weight: number;
  
}

const ItemSchema = new Schema<IItem>({
  itemId: { type: Number, required: true, unique: true, index: true },
  name: { type: String, required: true },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  stackable: { type: Boolean, default: false },
  maxStack: { type: Number },
  weight: { type: Number, required: true },
});

export default mongoose.models.Item || mongoose.model<IItem>("Item", ItemSchema);
