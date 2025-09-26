import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../server/models/User.js'; // Adjust path as needed

dotenv.config({ path: './server/.env' }); // Adjust path as needed

const resetPassword = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');

    const userEmail = 'shaikhamaanahmed@gmail.com';
    const newPassword = 'AmaanIsCool2005';

    const user = await User.findOne({ email: userEmail });

    if (!user) {
      console.error('User not found!');
      process.exit(1);
    }

    // Manually hash the new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    // We are setting the password directly, so we need to save it.
    // The 'pre-save' hook in the model will not re-hash it if it's not "modified".
    // To be safe, we'll just save the whole user object.
    await user.save();

    console.log(`Password for ${userEmail} has been reset successfully.`);
    mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    mongoose.disconnect();
    process.exit(1);
  }
};

resetPassword();