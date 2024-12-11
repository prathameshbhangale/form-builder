import { Response, Request , NextFunction } from "express";
import { User } from "../database/models/User";
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { AppDataSource } from "../database/dataSource";


type RequestBody = {
    name: string;
    email: string;
    password: string;
  };
  
export const registerUser = async (
    req: Request<{}, {}, RequestBody>, 
    res: Response, 
    next: NextFunction
): Promise<void> => {
    const { name, email, password } = req.body;
    if(!name || !email || !password){
        res.status(400).json({ success: false, message: 'missing arguments' });
        return;
    }
  
    try {
        const salty: number = parseInt(process.env.SALT_NUM || '10', 10);
        const salt = await bcrypt.genSalt(salty);
        const hashedPassword = await bcrypt.hash(password, salt);
    
        // Insert in DB
        const userRepository = AppDataSource.getRepository(User);
    
        const existingUser = await userRepository.findOne({ where: { email } });
        if (existingUser) {
            res.status(400).json({ success: false, message: 'Email already in use' });
            return;
        }
    
        const user = new User();
        user.name = name;
        user.email = email;
        user.passwordHash = hashedPassword;
        await userRepository.save(user);
    
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
        });
    } catch (error) {
      next(error); 
    }
};

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
