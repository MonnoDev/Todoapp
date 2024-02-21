import express, { Express, Request, Response } from 'express';
import { MongoClient } from 'mongodb';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 8080;
const URI = process.env.DB_CONNECTION_STRING || 'mongodb+srv://admin:<>@cluster0.pdxzamm.mongodb.net/?retryWrites=true&w=majority';
const dbName = process.env.DB_NAME || 'ToDoList';

const app: Express = express();
app.use(express.json());
app.use(cors());

const client = new MongoClient(URI);

interface TodoItem {
    content: string;
  }

app.post('/todos', async (req: Request, res: Response) => {
    try {
        const { content } = req.body;
        const con = await client.connect();
        const collection = con.db(dbName).collection('ToDoList');
        await collection.insertOne({ content });
        await con.close();
        return res.status(201).json({ message: 'Todo item added successfully' });
      } catch (error) {
        return res.status(500).send(error)
      }
    });

    app.get('/todos', async (_req: Request, res: Response) => {
      try {
        const con = await client.connect();
        const collection = con.db(dbName).collection('ToDoList');
        const data = await collection.find().toArray();
        await con.close();
        res.send(data);
      } catch (error) {
        res.status(500).send(error);
      }
    });


app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
});


