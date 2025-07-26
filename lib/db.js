import mongoose from 'mongoose';

export let connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL).then(() => {
      console.log('DB Connected');
    });
  } catch (err) {
    console.log('ERROR: ', err.message);
  }
};
