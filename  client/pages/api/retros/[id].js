import Retro from "../../../models/retros" 
import { getSession } from 'next-auth/client'; 
import { connectToDatabase } from '../../../helpers/db-util';

 async function handler(req, res) {
    const {
        query: { id },
        method,
    } = req
    const client = await connectToDatabase({
        database: process.env.EXPAND_DB,
      });
    switch (method) {
        case 'GET':
            try {
                const retro = await Retro.findById(id)
                if (retro) {
                    return res.status(400).json({ success: false })
                }
                res.status(200).json({ success: true, data: retro })
              } catch (error) {
                res.status(400).json({ success: false })
              }
              break

        case 'PUT' /* Edit a model by its ID */:
            try {
                const retro = await Retro.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true,
                })
                if (!retro) {
                    return res.status(400).json({ success: false })
                }
                res.status(200).json({ success: true, data: retro })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break


        case 'DELETE' /* Delete a model by its ID */:
            try {
                const deletedRetro = await Retro.deleteOne({ _id: id })
                if (!deletedRetro) {
                    return res.status(400).json({ success: false })
                }
                res.status(200).json({ success: true, data: {} })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break

        default:
            res.status(400).json({ success: false })
            break
    }
    client.connection.close();
}

export default handler;