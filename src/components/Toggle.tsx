import React from "react";

interface ToggleProps {
  onToggle: (value: boolean) => void;
  value: boolean;
}

const Toggle: React.FC<ToggleProps> = ({ onToggle, value }) => {
  return (
    <div
      className={`w-12 h-6 flex items-center cursor-pointer ${
        value ? "bg-blue-600" : "bg-gray-500"
      } rounded-full p-1`}
      onClick={() => onToggle(!value)}
    >
      <div
        className={`w-4 h-4 bg-white rounded-full transition-transform ${
          value ? "transform translate-x-6" : ""
        }`}
      ></div>
    </div>
  );
};

export default Toggle;
