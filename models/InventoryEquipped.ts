import mongoose, { Schema, Document } from "mongoose";

export interface IInventoryEquipped extends Document {
  character: mongoose.Types.ObjectId;
  slots: {
    head?: number;
    chest?: number;
    legs?: number;
    feet?: number;
    arms?: number;
    hands?: number;
    shoulders?: number;
    waist?: number;
    back?: number;
    primary?: number;
    secondary?: number;
    ranged?: number;
    ammo?: number;
    finger1?: number;
    finger2?: number;
    belt1?: number;
    belt2?: number;
    belt3?: number;
    belt4?: number;
  };
}

const InventoryEquippedSchema = new Schema<IInventoryEquipped>({
  character: { type: Schema.Types.ObjectId, ref: "Character", required: true },
  slots: {
    head: Number,
    chest: Number,
    legs: Number,
    feet: Number,
    arms: Number,
    hands: Number,
    shoulders: Number,
    waist: Number,
    back: Number,
    primary: Number,
    secondary: Number,
    ranged: Number,
    ammo: Number,
    finger1: Number,
    finger2: Number,
    belt1: Number,
    belt2: Number,
    belt3: Number,
    belt4: Number,
  },
}, { versionKey: false });

export default mongoose.models.InventoryEquipped ||
  mongoose.model<IInventoryEquipped>("InventoryEquipped", InventoryEquippedSchema);
