import React from 'react'

interface FieldmetaDataProps {
    id: number;
    label: string;
    setedit: (value: number) => void;
}

const FieldmetaData: React.FC = () => {
  return (
    <div>FieldmetaData</div>
  )
}

export default FieldmetaData