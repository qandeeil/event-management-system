import React from "react";
import "@/styles/registration/sharing/customInput.scss";

type Props = {
  lable: string;
  type: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  name: string;
};

const CustomInput = ({
  lable,
  type,
  placeholder,
  onChange,
  value,
  name,
}: Props) => {
  return (
    <div className="customInput">
      <label>{lable}</label>
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        name={name}
      />
    </div>
  );
};

export default CustomInput;
