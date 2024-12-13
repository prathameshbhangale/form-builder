import React from 'react';

interface HiglightTextProps {
  text: string;
}

const HiglightText: React.FC<HiglightTextProps> = ({ text }) => {
  return (
    <span className="bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
      {text}
    </span>
  );
};

export default HiglightText;
