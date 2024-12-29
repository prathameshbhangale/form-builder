import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useDispatch } from "react-redux";
import { seteditId } from "../../slices/field";
import ValueTemplate from "./formParts/valueTemplate";

interface SortableFieldProps {
  id: number;
  label: string;
  type:string;
}

const SortableField: React.FC<SortableFieldProps> = ({ id, label,type }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const dispatch = useDispatch();

  // Switch logic for rendering content based on the label
  let content;
  switch (type) {
    case "title" :
      content = <h1 className="text-2xl font-bold">{label}</h1>;
      break;
    case "subtitle":
      content = <h2 className="text-lg font-bold">{label}</h2>;
      break;
    case "description":
      content = <p className="text-gray-600 h-32">{label}</p>;
      break;
    case "text":
      content = <ValueTemplate label="label for text" placeholder=" abcd "/>
      break;
    default:
      content = <p className="text-gray-600">{label}</p>;
  }

  return (
    <div
      onClick={() => dispatch(seteditId(id))}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-4 bg-white border rounded shadow hover:shadow-md cursor-grab"
    >
      {content}
    </div>
  );
};

export default SortableField;
