import { Response, Request , NextFunction } from "express";
import { User } from "../database/models/User";
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { AppDataSource } from "../database/dataSource";


export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> =>{
    const { email, password } = req.body;
    
    try {
        const userRepository = AppDataSource.getRepository(User);
        
        const user = await userRepository.findOne({ where: { email } });
        
        if (!user) {
            res.status(400).json({ success: false, message: 'User not found' });
            return
        }
        
        const isPasswordValid = bcrypt.compareSync(password, user.passwordHash);
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Invalid email or password' });
            return
        }
        
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET environment variable is not defined');
        }
        
        const payload = { email: user.email, sub: user.userId };
        const access_token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        res.setHeader('Authorization', `Bearer ${access_token}`);
        res.cookie('auth_token', access_token, {
            httpOnly: true,
            maxAge: 3600 * 1000 // 1 hour
        });
    
        res.json({ success: true, message: 'Login successful', access_token });
        
    } catch (error) {
        next(error); 
    }
};