import { connectDatabase, insertDocument } from '../../helpers/db-util';

async function handler(req, res) {
  if (req.method === 'POST') {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid email address.' });
      return;
    }

    // const client = await MongoClient.connect(
    //   'mongodb+srv://altos721:bd4C401hXxVq8vrH@cluster0.056ghip.mongodb.net/events?retryWrites=true&w=majority'
    // );

    // const db = client.db();

    // await db.collection('emails').insertOne({ email: userEmail });
    // client.close();

    let client;

    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: 'Connecting to the database failed!' });
      return;
    }

    try {
      await insertDocument(client, 'emails', { email: userEmail });
      client.close();
    } catch (error) {
      res.status(500).json({ message: 'Inserting data failed!' });
      return;
    }

    res.status(201).json({ message: 'Signed up!' });
  }
}

export default handler;
