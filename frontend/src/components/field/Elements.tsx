import React from 'react'

interface ElementsProps {
    addField : (label: string, inputtype: string) => void;
}

const Elements : React.FC<ElementsProps> = ({addField}) => {
  return (
    <div className="flex flex-col">
        <div onClick={() => addField("nothing", "text")}>title</div>
        <div>subtitle</div>
        <div>description</div>
        <div>text</div>
        <div>number</div>
        <div>date</div>
        <div>checkbox</div>
        <div>select</div>
        <div>radio</div>
    </div>
  )
}

export default Elements