import mongoose, { Schema, Document } from "mongoose";

export interface IAccount extends Document {
  user: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const AccountSchema = new Schema<IAccount>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Account || mongoose.model<IAccount>("Account", AccountSchema);
