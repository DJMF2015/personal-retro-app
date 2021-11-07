import mongoose from 'mongoose';

/**
 * User model used to store details.
 */
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please provide an email address'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
  },
});

mongoose.models = {};
const User = mongoose.model('Users', userSchema);

export default User;