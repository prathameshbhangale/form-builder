import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Field, seteditId } from "../../slices/field";
import Header from "./elements/header";
import Singleinput from "./elements/Singleinput";

interface FieldLabelSetterProps {
  id: number;
}

const FieldLabelSetter: React.FC<FieldLabelSetterProps> = ({ id }) => {
  const field = useSelector((state: any) =>
    state.field.fields.find((field: Field) => field.id === id)
  );

  const dispatch = useDispatch();

  if (!field) {
    return null; // Return null if the field is not found
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4 text-yellow-900 bg-gray-400 ">
        <div>Element Field</div>
        <div
          className="cursor-pointer text-red-500"
          onClick={() => dispatch(seteditId(0))} // Wrap in an arrow function
        >
          X
        </div>
      </div>
      {/* <Header/> */}

      {(() => {
        switch (field.type) {
            case "title":
                return <Header label="Subtitle"/>;
                break;
            case "subtitle":
                return <Header label="Subtitle"/>;
                break;
            case "description":
                return <Header label="description"/>
                break;
            case "text":
              return <Singleinput></Singleinput>
                break;
            default:
                return null;
        }
      })()}
    </div>
  );
};

export default FieldLabelSetter;
