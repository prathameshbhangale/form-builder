import React, { useState } from "react";
import { updateFieldOfID, setRequired, updatePlaceholderOfID } from "../../../slices/field";
import { useDispatch } from "react-redux";

const SingleInput: React.FC = () => {
  const [label, setLabel] = useState("Text Field");
  const [placeholder, setPlaceholder] = useState("Placeholder");
  const [isRequired, setIsRequired] = useState(false);
  const dispatch = useDispatch();

  const updateField = () => {
    dispatch(setRequired(isRequired));
    dispatch(updateFieldOfID(label));
    dispatch(updatePlaceholderOfID(placeholder));
    setLabel("");
    setIsRequired(false);
    setPlaceholder("");
    console.log("Field updated successfully");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      {/* Input for Label */}
      <div className="mb-6">
        <label className="block text-sm font-bold mb-2" htmlFor="label">
          Label
        </label>
        <input
          type="text"
          id="label"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Text Field"
          className="w-full px-4 py-2 border border-gray-600 rounded bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500"
        />
        <p className="text-gray-400 text-sm mt-1">
          The label of the Text Field. It will be displayed above the input.
        </p>
      </div>

      {/* Input for Placeholder */}
      <div className="mb-6">
        <label className="block text-sm font-bold mb-2" htmlFor="placeholder">
          Placeholder
        </label>
        <input
          type="text"
          id="placeholder"
          value={placeholder}
          onChange={(e) => setPlaceholder(e.target.value)}
          placeholder="Placeholder"
          className="w-full px-4 py-2 border border-gray-600 rounded bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500"
        />
        <p className="text-gray-400 text-sm mt-1">
          The placeholder of the Text Field. It will be displayed inside the input.
        </p>
      </div>

      {/* Checkbox for Required */}
      <div className="mb-6 flex items-center">
        <input
          type="checkbox"
          id="required"
          checked={isRequired}
          onChange={(e) => setIsRequired(e.target.checked)}
          className="mr-2 h-8"
        />
        <label htmlFor="required" className="text-sm">
          Required
        </label>
        <p className="text-gray-400 text-sm mt-1 ml-4">
          Whether the Text Field is required or not.
        </p>
      </div>

      {/* Update Button */}
      <button
        onClick={updateField}
        className="px-4 py-2 bg-blue-500 rounded text-white hover:bg-blue-400 focus:ring-2 focus:ring-blue-500"
      >
        Set
      </button>
    </div>
  );
};

export default SingleInput;
