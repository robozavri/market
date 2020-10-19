import { Schema, model } from 'mongoose';

const resetPasswordSchema = {
  token: String,
  expirationDate: Date,
  isUsed: Boolean
};

const UserSchema = new Schema({
  email: String,
  firstName: String,
  lastName: String,
  gender: String,
  dateOfBirth: Date,

  passwordHash: String,
  isActivated: Boolean,
  activationToken: String,
  role: String,
  joinedAt: Date,
  resetPassword : resetPasswordSchema,
  lang: {
    type: String,
    enum: ['en', 'ge', 'ru']
  },
});

UserSchema.index({email: 1}, {unique: true});

export default model('User', UserSchema);
