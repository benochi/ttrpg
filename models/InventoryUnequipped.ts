import mongoose, { Schema, Document } from "mongoose";

export interface IInventoryUnequipped extends Document {
  character: mongoose.Types.ObjectId;
  width: number;
  height: number;
  grid: number[][]; // 0 = empty, other = itemId
}

const InventoryUnequippedSchema = new Schema<IInventoryUnequipped>({
  character: { type: Schema.Types.ObjectId, ref: "Character", required: true },
  width: { type: Number, default: 10 },
  height: { type: Number, default: 6 },
  grid: { type: [[Number]], default: [] }, // 2D array of itemId numbers
}, { versionKey: false });

export default mongoose.models.InventoryUnequipped ||
  mongoose.model<IInventoryUnequipped>("InventoryUnequipped", InventoryUnequippedSchema);
