import "reflect-metadata";
import dotenv from 'dotenv';
import { DataSource } from "typeorm";
dotenv.config();

import { User } from "./models/User"; 

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432", 10),
    username: process.env.DB_USERNAME || "username",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "database",
    // synchronize: true, 
    logging: false, 
    entities: [], 
});
