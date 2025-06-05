import mongoose, { Schema, Document } from "mongoose";

export interface IAccount extends Document {
  user: mongoose.Types.ObjectId;
  games: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const AccountSchema = new Schema<IAccount>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    games: [{ type: Schema.Types.ObjectId, ref: 'Game' }],
  },
  { timestamps: true }
);

export default mongoose.models.Account || mongoose.model<IAccount>("Account", AccountSchema);
