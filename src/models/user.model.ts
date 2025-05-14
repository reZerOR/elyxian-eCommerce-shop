import { Schema, model, models } from 'mongoose';
export interface IUser {
  email: string;
  name: string;
  image?: string;
  role: 'user' | 'admin';
  emailVerified?: Date;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  image: String,
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  emailVerified: Date,
});

const UserModel = models.User || model<IUser>('User', UserSchema);
export default UserModel;