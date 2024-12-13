import { Request, Response } from "express";
import { AppDataSource } from "../database/dataSource";
import { Response as FormResponse } from  "../database/models/Response";
import { Form } from "../database/models/Form";
import { FieldValue } from "../database/models/FieldValue";
import jwt from "jsonwebtoken";

export const submitResponse = async (req: Request, res: Response) : Promise<void> => {
    try {
        const token = req.query.token as string;
        const secretKey = process.env.JWT_SECRET as string;

        if (!token) {
            res.status(400).json({
                success: false,
                message: "JWT token is required in query parameters.",
            });
            return
        }

        // Decode the token to extract formId and userId
        const decodedToken = jwt.verify(token, secretKey) as { formId: number; userId: number };
        const { formId, userId } = decodedToken;

        if (!formId || !userId) {
            res.status(400).json({
                success: false,
                message: "Invalid token: formId and userId are required.",
            });
            return
        }

        // Fetch the Form and verify ownership
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
            return
        }

        // if (form.user.userId !== userId) {
        //     res.status(403).json({
        //         success: false,
        //         message: "You are not authorized to submit responses for this form.",
        //     });
        //     return
        // }

        // Extract fieldValues from request body
        const { fieldValues } = req.body;
        if (!fieldValues || !Array.isArray(fieldValues)) {
            res.status(400).json({
                success: false,
                message: "Invalid field values. Provide an array of field values.",
            });
            return
        }

        // Create the Response
        const responseRepository = AppDataSource.getRepository(FormResponse);
        const fieldValueRepository = AppDataSource.getRepository(FieldValue);

        const formResponse = responseRepository.create({
            form,
            submittedAt: new Date(),
        });

        await responseRepository.save(formResponse);

        // Save FieldValues
        for (const value of fieldValues) {
            const fieldValue = fieldValueRepository.create({
                response: formResponse,
                field: value.fieldId,
                value: value.value,
            });

            await fieldValueRepository.save(fieldValue);
        }

        res.status(201).json({
            success: true,
            message: "Response submitted successfully.",
            responseId: formResponse.responseId,
        });
    } catch (error) {
        console.error("Error submitting response:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while submitting the response.",
        });
    }
};
