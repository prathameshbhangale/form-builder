import express, { Application, Request, Response } from 'express';
import { AppDataSource } from './database/dataSource';
import "reflect-metadata"

AppDataSource.initialize()
    .then(() => console.log("Database connected!"))
    .catch((err) => console.error("Error connecting to database:", err));

const app: Application = express();

// Middleware
app.use(express.json());



// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

export default app;