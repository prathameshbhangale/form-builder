import { Response } from "express";
import { CustomRequest } from "../types/CustomRequest";
import * as jwt from 'jsonwebtoken';
import { AppDataSource } from "../database/dataSource"; // Data source
import { Form } from "../database/models/Form";

export const generateTokenWithFormId = async (req: CustomRequest, res: Response) : Promise<void> => {
    const { formId } = req.body;
    console.log(formId)
    try {
        const userId = Number(req.tokenPayload?.sub);

        if (!formId || !userId) {
            res.status(400).json({
                success: false,
                message: "formId and userId are required.",
            });
            return;
        }

        const formRepository = AppDataSource.getRepository(Form);

        const form = await formRepository.findOne({
            where: { formId },
            relations: ["user"], 
        });

        if (!form) {
            res.status(404).json({
                success: false,
                message: "Form not found.",
            });
            return;
        }
        console.log(userId)
        console.log(form.user.userId)

        if (form.user.userId !== userId) {
            res.status(403).json({
                success: false,
                message: "You do not have permission to access this form.",
            });
            return;
        }

        // Create the token payload
        const tokenPayload = {
            formId: form.formId,
            userId: userId,
        };

        const secretKey = process.env.JWT_SECRET as string;
        if (!secretKey) {
            throw new Error("JWT_SECRET is not defined in environment variables.");
        }

        const token = jwt.sign(tokenPayload, secretKey);

        // Return the token
        res.status(200).json({
            success: true,
            message: "Token generated successfully.",
            token,
        });
    } catch (error) {
        console.error("Error generating token:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};