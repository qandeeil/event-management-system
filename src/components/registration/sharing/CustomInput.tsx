import React from "react";
import "@/styles/registration/sharing/customInput.scss";

type Props = {
  lable: string;
  type: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  name: string;
  isError: boolean;
  message: string;
};

const CustomInput = ({
  lable,
  type,
  placeholder,
  onChange,
  value,
  name,
  isError,
  message,
}: Props) => {
  return (
    <div className="customInput">
      <label style={isError ? {color: 'red'} : {}}>{lable}</label>
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        name={name}
        style={isError ? { borderColor: "red" } : {}}
      />
      <label style={{ color: "red", marginTop: 6 }}>{isError && message}</label>
    </div>
  );
};

export default CustomInput;
