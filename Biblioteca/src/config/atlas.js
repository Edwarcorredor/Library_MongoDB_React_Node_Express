import dotenv from 'dotenv'
import { MongoClient } from 'mongodb';
dotenv.config("../");

async function conexion() {
  try {
    // eslint-disable-next-line no-undef
    const uri = `mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASSWORD}@edwarcorredor.zavkvu2.mongodb.net/${process.env.ATLAS_DB}`;
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    const client = await MongoClient.connect(uri, options);
    return client.db();
  } catch (error) {
    return {status: 500, message: error};
  }
}

export default conexion;

