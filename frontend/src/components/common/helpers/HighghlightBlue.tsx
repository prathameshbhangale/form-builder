import React from 'react';

interface HiglightTextProps {
  text: string;
}

const HiglightTextBlue: React.FC<HiglightTextProps> = ({ text }) => {
  return (
    <span className="text-gray-900">
      {text}
    </span>
  );
};

export default HiglightTextBlue;
