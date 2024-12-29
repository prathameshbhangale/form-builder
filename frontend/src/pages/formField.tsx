import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SortableField from "../components/field/SortableField";
import Elements from "../components/field/Elements";
import { Field ,updateField, addingField} from "../slices/field";
import { useDispatch, useSelector } from "react-redux";
import Fieldlabelseter from "../components/field/Fieldlabelseter";


function FormField() {
    
    let fields = useSelector((state: any) => state.field.fields);
    let editId = useSelector((state: any) => state.field.editId);
    const dispatch = useDispatch()

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
    
        if (!over) return;
    
        if (active.id !== over.id) {
          const oldIndex = fields.findIndex((field: Field) => field.id === active.id);
          const newIndex = fields.findIndex((field: Field) => field.id === over.id);
    
          if (oldIndex === -1 || newIndex === -1) return; 
    
          const updatedFields = [...fields];
          const [movedField] = updatedFields.splice(oldIndex, 1);
          updatedFields.splice(newIndex, 0, movedField);
    
          dispatch(updateField(updatedFields));
        }
    };

    const addField = (label:string,inputtype:string,type:string,required=false,options=null):void =>{
        dispatch(
            addingField({
                id:fields.length + 1, 
                label,
                inputtype,
                type,
                required,
                options
            })
        );
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="w-full text-2xl text-center font-bold mb-4">Form Fields</h2>
            <div className="flex w-full min-h-screen p-6 bg-gray-100">
                {/* Left Block (2.5 ratio) */}
                <div className="flex-[2.5] p-4 bg-white shadow-md rounded-md">
                    <DndContext onDragEnd={handleDragEnd}>
                    <SortableContext items={fields.map((field:Field) => field.id)} strategy={verticalListSortingStrategy}>
                        <div className="space-y-4">
                        {fields.map((field:Field) => (
                            <SortableField key={field.id} id={field.id} label={field.label} type={field.type} />
                        ))}
                        </div>
                    </SortableContext>
                    </DndContext>
                </div>

                {/* Right Block (2 ratio) */}
                <div className="flex-[2] p-4 bg-gray-500 shadow-md rounded-md ml-4">
                    <h2 className="text-xl font-bold mb-4">Form Elements</h2>
                    {editId? <Fieldlabelseter id={editId} />:<Elements addField={addField}></Elements>}
                </div>
            </div>
        </div>
    );
}

export default FormField