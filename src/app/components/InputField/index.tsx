import React from "react";
import { InputFieldProps } from "@/app/interfaces/IInputField";

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
