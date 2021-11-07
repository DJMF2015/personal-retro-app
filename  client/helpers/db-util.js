import mongoose from 'mongoose';

/**
 * Sets up connection to db so components can use it
 * @function connectToDatabase
 * @param { String } database Name of database
 * @returns { Promise } Database client
 */
 
 
export const connectToDatabase = async ({ database }) => {

  const DB_URL = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.CLUSTER}.k2e9j.mongodb.net/${database}?retryWrites=true&w=majority`;

  try {
    const db = mongoose.connection;


    db.on('error', () => console.error('failed to connect to database'));
    db.once('open', () =>
      console.log('Connected to the database successfully')
    );

    const client = await mongoose.connect(DB_URL, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
      bufferCommands: false,
      bufferMaxEntries: 0
    });

    return client;
  } catch (err) {
    console.error(err.message);
  }
};

