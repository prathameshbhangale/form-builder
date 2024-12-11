import { Request, Response, NextFunction } from "express"
import { jwtDecode , JwtPayload } from "jwt-decode";
import { CustomRequest } from "../types/CustomRequest";


export const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) : void => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        res.status(401).json({ successs:false, message: 'Access denied. Login rewquired.' });
        return 
    }
    try {
        const secretKey = process.env.JWT_SECRET as string;
        const decoded = jwtDecode<JwtPayload>(token)
        req.tokenPayload = decoded;
        next()
    } catch (error) {
        res.status(403).json({ successs:false, message: 'Invalid token.' });

    }
}