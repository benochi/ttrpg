import mongoose, { Schema, Document } from "mongoose";

export interface ICharacter extends Document {
  name: string;
  level: number;
  inventoryEquipped: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const CharacterSchema = new Schema<ICharacter>(
  {
    name: { type: String, required: true },
    level: { type: Number, default: 1 },
    inventoryEquipped: { type: Schema.Types.ObjectId, ref: 'InventoryEquipped' } // update to inventory equipped an unequipped. 
  },
  { timestamps: true }
);

export default mongoose.models.Character || mongoose.model<ICharacter>("Character", CharacterSchema);
