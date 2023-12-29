import React from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  onChange: (selectedValue: string) => void;
  value: string;
}

const Select: React.FC<SelectProps> = ({ options, onChange, value }) => {
  return (
    <select
      className="bg-transparent border border-[#29C9E8] rounded-lg p-1"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
