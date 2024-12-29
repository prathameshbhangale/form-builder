import { useDispatch } from "react-redux";
import { updateFieldOfID } from "../../../slices/field";
import React, { useState } from "react";

interface HeaderProps{
    label:string;
}

const Header:React.FC<HeaderProps> = ({label}) => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState(""); // Local state for input value

  const handleOnClick = () => {
    console.log("clicking is done");
    dispatch(updateFieldOfID(inputValue));
    setInputValue("");
  };

  return (
    <div className="p-4 bg-gray-800 rounded shadow-md">
        <p className="text-lg font-semibold text-yellow-400 mb-2">
           {`${label}`}
        </p>
        {label === "description" ? (
        <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)} // Update local state
            placeholder={`Enter ${label} here...`}
            className="border h-60 border-gray-600 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-700 text-yellow-400 placeholder-gray-500"
        ></textarea>
        ) : (
        <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)} // Update local state
            placeholder={`Enter ${label} here...`}
            className="border h-11 border-gray-600 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-700 text-yellow-400 placeholder-gray-500"
        />
        )}

      <button
        onClick={handleOnClick}
        className="mt-3 bg-gray-700 text-yellow-400 px-4 py-2 rounded hover:bg-gray-600 hover:text-yellow-300 transition"
      >
        set
      </button>
    </div>
  );
}

export default Header;
