import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserForms,Form } from "../apis/forms/getUserForms";
import { useSelector } from "react-redux";
import { RootState } from "../store";

function Forms() {
  const navigate = useNavigate();
  const [forms, setForms] = useState<Form[]>([]);
  const token = useSelector((state: RootState) => state.user.token);

  const handleCreateForm = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault(); // Prevent page reload on form submit
    navigate('/createForm');
  };

  useEffect(() => {
    const fetchForms = async () => {
      try {
        // console.log(token)
        const response = await getUserForms(token);
        console.log(response)
        if(response.success){
          setForms(response.forms)
        }else{
          console.log(response.message);
        }
      } catch (error) {
        console.error("Error fetching forms:", error);
      }
    };

    fetchForms();
  }, [token]);

  return (
    <>
      <div className="p-6 bg-gray-900 text-gray-100 min-h-screen">
        {/* Header Section */}
        <h1 className="text-3xl font-bold text-center mb-8">Forms Dashboard</h1>

        {/* Create Form Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md max-w-md mx-auto">
          <h2 className="text-xl font-semibold mb-4">Create a New Form</h2> 
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
            onClick={handleCreateForm}
          >
            Create Form
          </button>
        </div>

        {/* Your Forms Section */}
        <div className="mt-10 max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">Your Forms</h2>
          <ul className="space-y-2">
      {forms.map((form) => (
        <li
          key={form.formId}
          className="p-4 bg-gray-800 rounded-lg shadow-md"
        >
          <div className="flex justify-between items-center">
            <span>{form.title}</span>
            <button className="text-blue-400 hover:underline">Edit</button>
          </div>
          <p className="text-gray-400 text-sm">{form.description}</p>
        </li>
      ))}
    </ul>
        </div>
      </div>
    </>
  );
}

export default Forms;
