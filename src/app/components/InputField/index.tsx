import React from "react";

interface InputFieldProps {
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const InputField = ({ placeholder, onChange, value }: InputFieldProps) => {
  return (
    <div>
      <input
        type="text"
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        className={""}
      />
    </div>
  );
};
export default InputField;
