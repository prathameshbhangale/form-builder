import express, { Application, Request, Response ,NextFunction} from 'express';
import { AppDataSource } from './database/dataSource';
import "reflect-metadata"
import authRoutes from './routes/auth';
import formRoutes from './routes/form';
import fieldformRoutes from './routes/field';
import cookieParser from 'cookie-parser';

AppDataSource.initialize()
    .then(() => console.log("Database connected!"))
    .catch((err) => console.error("Error connecting to database:", err));

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());


// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});
app.use('/api/auth',authRoutes);
app.use('/api/form',formRoutes);
app.use('/api/field',fieldformRoutes);



app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});
export default app;