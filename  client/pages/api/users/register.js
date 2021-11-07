import Users from '../../../models/users';
import { connectToDatabase } from '../../../helpers/db-util';
import { hashPassword } from '../../../helpers/auth.util';
import { signUpFormMC } from '../../../mc';
/**
 * Handler function which connects to db and persists a user to it
 * @name Register User
 * @returns Response status with corresponding body if successful user is created,
 * if not it provides an error message
 */
const handler = async (req, res) => {
  // connect to the EXPAND DB
  let client;
  try {
    client = await connectToDatabase({ database: process.env.AUTH_DB });
  } catch (err) {
    return res.status(500).json({ message: 'Issue connecting to database' });
  }

  // POST method
  if (req.method === 'POST') {
    const { name, email, password } = req.body;
    if (name && email && password) {
      try {
        // Hashes the given password
        let passwordHash = await hashPassword(password);

        // Creates a new Users object
        let user = new Users({
          name,
          email,
          password: passwordHash,
        });

        let userCreated = await user.save();

        // Returns successful response with new user object
        return res.status(200).send(userCreated);
      } catch (error) {
        if (error.code === 11000) {
          return res
            .status(500)
            .json({ message: signUpFormMC.duplicateEmailMessage });
        } 
        else {
          return res.status(500).json({message: error.message});
        }
      }
    } else {
      res.status(422).send('missing data');
    }
  } else {
    res.status(422).send('request method not supported');
  }
};

export default handler;
