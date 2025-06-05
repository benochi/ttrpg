import mongoose, { Schema, Document } from "mongoose";

export interface IInventory extends Document {
  character: mongoose.Types.ObjectId;
  slots: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const InventorySchema = new Schema<IInventory>(
  {
    character: { type: Schema.Types.ObjectId, ref: 'Character', required: true },
    slots: [{ type: Schema.Types.ObjectId, ref: 'ItemSlot' }]
  },
  { timestamps: true }
);

export default mongoose.models.Inventory || mongoose.model<IInventory>("Inventory", InventorySchema);
