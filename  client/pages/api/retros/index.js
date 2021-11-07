import { connectToDatabase } from '../../../helpers/db-util';
import { getSession } from 'next-auth/client';
import Retro from '../../../models/retros';
/**
 * @function Retrospective Handler
 * @param {*} req
 * @param {*} res
 * @summary Handler to connect to the retrospective db
 */
async function handler(req, res) {
  const session = await getSession({ req });
  if (session) {
    const client = await connectToDatabase({
      database: process.env.EXPAND_DB,
    });

    const { method } = req;


    switch (method) {

        case 'GET':
            try {
                // find all retros in db for user
                const userEmail = session.user.email
                const retros = await Retro.find({
                    email: userEmail
                })
                console.log('successful')
                res.status(200).json({ success: true, data: retros })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break;

        case 'POST':
            try {
                const retros = await Retro.create(
                    req.body
                )
                res.status(201).json({ success: true, data: retros })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break;
        default:
            res.status(400).json({ success: false })
            break
    }
    
    //  Signed in
    console.log('Session', JSON.stringify(session, null, 2));
    client.connection.close();
} else {
    // Not Signed in
    res.status(401);
}
console.log(session);
res.end();

}

export default handler;
