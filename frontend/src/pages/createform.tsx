import React, { useState } from "react";
import { useSelector } from "react-redux";
import { createFormApi } from "../apis/forms/create";
import { RootState } from "../store";
import { useNavigate } from "react-router-dom";

const CreateFormPage: React.FC = () => {
    const token = useSelector((state: RootState) => state.user.token);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Form submission handler
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        if (!title.trim()) {
            alert("Title is required!");
            return;
        }
        let response;
        let message = description;
        try {
            response = await createFormApi({ title, message }, token);
            console.log(response)
        } catch (err: any) {
            setError(err.message || "Failed to create form, Login is required");
        } finally {
            setLoading(false);
        }
        setTitle("");
        setDescription("");
        navigate(`/setField/${response?.form.formId}`)
    };

    return (
        <>
        <div className="create-form-page min-h-screen flex items-center justify-center bg-gray-900 text-gray-100">
            <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-6 text-center">Create a New Form</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="form-group">
                        <label
                            htmlFor="title"
                            className="block text-sm font-medium text-gray-300 mb-2"
                        >
                            Form name
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter form name"
                            required
                            className="w-full px-4 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="form-group">
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-300 mb-2"
                        >
                            Description
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter form description (optional)"
                            className="w-full h-64 px-4 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full py-2 px-4 text-sm font-medium text-gray-900 bg-blue-500 rounded-md 
                            hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                loading ? "opacity-70 cursor-not-allowed" : ""
                            }`}
                        disabled={loading}
                    >
                        {loading ? "Creating..." : "Create Form"}
                    </button>
                </form>
                {error && (
                    <p className="mt-4 text-center text-red-500 text-sm">
                        Error: {error}
                    </p>
                )}
            </div>
        </div>
        </>
    );
    
};

export default CreateFormPage;
