import { Response } from "express";
import { AppDataSource } from "../database/dataSource"; 
import { Field } from "../database/models/Field"; 
import { Form } from "../database/models/Form";  
import { CustomRequest } from "../types/CustomRequest";  

export const insertField = async (req: CustomRequest, res: Response) : Promise<void> => {
    try {
        const { label, type, isRequired, order, options, formId, placeholder } = req.body;
        if (!label || !type || isRequired === undefined || order === undefined || !formId) {
            res.status(400).json({
                success: false,
                message: "All fields are required."
            });
            return
        }

        const formRepository = AppDataSource.getRepository(Form);
        const form = await formRepository.findOne({ where: { formId }, relations: ["fields"] });

        if (!form) {
            res.status(404).json({
                success: false,
                message: "Form not found."
            });
            return
        }

        const fieldRepository = AppDataSource.getRepository(Field);
        const newField = fieldRepository.create({
            label,
            type,
            isRequired,
            order,
            options,
            form: form, 
            placeholder 
        });

        await fieldRepository.save(newField);

        res.status(201).json({
            success: true,
            message: "Field inserted successfully.",
            data: newField
        });
    } catch (error) {
        console.error("Error inserting field:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
};

export const deleteField = async (req: CustomRequest, res: Response) : Promise<void> => {
    try {
        const { fieldId } = req.params;

        if (!fieldId || isNaN(Number(fieldId))) {
            res.status(400).json({
                success: false,
                message: "Invalid field ID."
            });
            return
        }

        const fieldRepository = AppDataSource.getRepository(Field);
        const field = await fieldRepository.findOne({ where: { fieldId: Number(fieldId) } });

        // If field is not found, return an error
        if (!field) {
            res.status(404).json({
                success: false,
                message: "Field not found."
            });
            return
        }
        // Delete the field
        await fieldRepository.remove(field);
        // Respond with success message
        res.status(200).json({
            success: true,
            message: "Field deleted successfully."

        });
    } catch (error) {
        console.error("Error deleting field:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
};

export const updateField = async (req: CustomRequest, res: Response) : Promise<void> => {
    try {
        const { fieldId } = req.params;
        if (!fieldId || isNaN(Number(fieldId))) {
            res.status(400).json({
                success: false,
                message: "Invalid field ID."
            });
            return;
        }

        const { label, type, isRequired, order, options, placeholder } = req.body;

        // Validate that at least one required field is passed
        if (!label || !type || isRequired === undefined || order === undefined) {
            res.status(400).json({
                success: false,
                message: "All required fields must be provided (label, type, isRequired, order)."
            });
        }

        // Find the field by ID
        const fieldRepository = AppDataSource.getRepository(Field);
        const field = await fieldRepository.findOne({ where: { fieldId: Number(fieldId) } });

        // If field is not found, return an error
        if (!field) {
            res.status(404).json({
                success: false,
                message: "Field not found."
            });
            return;
        }

        // Update the field's properties
        field.label = label;
        field.type = type;
        field.isRequired = isRequired;
        field.order = order;
        field.options = options || field.options;  
        field.placeholder = placeholder || field.placeholder; 

        await fieldRepository.save(field);

        res.status(200).json({
            success: true,
            message: "Field updated successfully.",
            data: field
        });
    } catch (error) {
        console.error("Error updating field:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
};


export const getAllFields = async (req: CustomRequest, res: Response) : Promise<void> => {
    try {
        const { formId } = req.query;

        const fieldRepository = AppDataSource.getRepository(Field);

        let fields;
        if (formId) {
            fields = await fieldRepository.find({
                where: { form: { formId: Number(formId) } },
                order: { order: "ASC" },
            });
        } else {
            // Fetch all fields
            fields = await fieldRepository.find({
                order: { createdAt: "ASC" },
            });
        }

        res.status(200).json({
            success: true,
            message: "Fields retrieved successfully.",
            data: fields,
        });
    } catch (error) {
        console.error("Error fetching fields:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};