import React from 'react'

interface ValueTemplateProps {
  label:string;
  placeholder: string;
}

const ValueTemplate:React.FC<ValueTemplateProps> = ({label,placeholder}) => {
  return (
    <div>
      <div>{`${label}`}</div>
      <div>{`${placeholder}`}</div>
    </div>
  )
}

export default ValueTemplate