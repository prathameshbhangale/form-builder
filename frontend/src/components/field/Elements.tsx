import React from 'react'

interface ElementsProps {
    addField : (label: string, inputtype: string, type:string) => void;
}

const Elements : React.FC<ElementsProps> = ({addField}) => {
  return (
    <div className="flex flex-col ">
        <div onClick={() => addField("Header", "text","title")}>header</div>
        <div onClick={() => addField("Sub Header", "text","subtitle")}>subtitle</div>
        <div onClick={() => addField("description of form", "text","description")}>description</div>
        <div onClick={() => addField("text label", "text","text")}>text </div>
        <div>number</div>
        <div>date</div>
        <div>checkbox</div>
        <div>select</div>
        <div>radio</div>
    </div>
  )
}

export default Elements