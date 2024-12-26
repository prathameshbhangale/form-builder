import React from 'react'
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from "@dnd-kit/utilities";

interface SortableFieldProps {
    id: number;
    label: string;
    setedit: (value: number) => void;
}

const SortableField: React.FC<SortableFieldProps> = ({ id, label ,setedit}) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };
  
    return (
      <div
        onClick={()=>setedit(id)}
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="p-4 bg-white border rounded shadow hover:shadow-md cursor-grab"
      >
        {label}
      </div>
    );
  };

export default SortableField