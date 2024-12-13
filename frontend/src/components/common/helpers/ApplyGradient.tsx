import React from 'react';

interface ApplyGradientProps {
  text: string;
}

const ApplyGradient: React.FC<ApplyGradientProps> = ({ text }) => {
  return (
    <span className="bg-gradient-to-tl from-purple-200 via-fuchsia-500 to-transparent bg-clip-text text-transparent">
      {text}
    </span>
  );
};

export default ApplyGradient;
