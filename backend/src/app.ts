import express, { Application, Request, Response ,NextFunction} from 'express';
import { AppDataSource } from './database/dataSource';
import "reflect-metadata"
import authRoutes from './routes/auth';
import formRoutes from './routes/form';
import responseRoute from './routes/response';
import fieldformRoutes from './routes/field';
import cookieParser from 'cookie-parser';
import cors from "cors";

AppDataSource.initialize()
    .then(() => console.log("Database connected!"))
    .catch((err) => console.error("Error connecting to database:", err));

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
const corsOptions: cors.CorsOptions = {
  origin: ['http://localhost:5173'], // Allowed origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true, // Allow cookies and credentials
};

// Apply CORS middleware with options
app.use(cors(corsOptions));


// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});
app.use('/api/auth',authRoutes);
app.use('/api/form',formRoutes);
app.use('/api/field',fieldformRoutes);
app.use('/api/resp',responseRoute);



app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});
export default app;