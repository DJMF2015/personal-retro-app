import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { verifyPassword } from '../../../helpers/auth.util.js';
import { connectToDatabase } from '../../../helpers/db-util';
import Users from '../../../models/users';
import {loginFormMC} from '../../../mc/'

export default NextAuth({
  session: { jwt: true },
  callbacks: {
    session: async (session, user) => {
      console.log(session.user.id )
      session.user.id = user.id; 
      return Promise.resolve(session);
    },
    jwt: async (token, user) => {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return Promise.resolve(token);
    },
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const client = await connectToDatabase({
          database: process.env.AUTH_DB,
        });

        const user = await Users.findOne({
          email: credentials.email,
        });

        if (!user) {
          client.connection.close();
          throw new Error(
            loginFormMC.invalidLoginValidationMessage
          );
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.connection.close();
          throw new Error(
            loginFormMC.invalidLoginValidationMessage
          );
        }

        client.connection.close();

        return {
          email: user.email,
          id: user._id,
          name: user.name,
        };
      },
    }),
  ],
});
