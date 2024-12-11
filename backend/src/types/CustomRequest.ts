import { Request } from "express";
import { JwtPayload } from "jwt-decode";

export interface CustomRequest extends Request {
    tokenPayload?: JwtPayload; // Adjust based on your token structure
}
