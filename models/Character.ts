import mongoose, { Schema, Document } from "mongoose";

export interface ICharacter extends Document {
  name: string;
  level: number;
  inventoryEquipped: mongoose.Types.ObjectId;
  inventoryUnequipped: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const CharacterSchema = new Schema<ICharacter>(
  {
    name: { type: String, required: true },
    level: { type: Number, default: 1 },
    inventoryEquipped: { type: Schema.Types.ObjectId, ref: 'InventoryEquipped' } // update to inventory equipped an unequipped.
    inventoryUnequipped: {type: Schema.Types.ObjectId, ref: 'InventoryUnequipped'} 
  },
  { timestamps: true }
);

export default mongoose.models.Character || mongoose.model<ICharacter>("Character", CharacterSchema);
