import React from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import "@/styles/registration/sharing/customInputPhoneNumber.scss";

type Props = {
  onChange: (value: string | undefined) => void;
  value: string | undefined;
  lable: string;
  isError: boolean;
  message: string;
};

const CustomInputPhoneNumber = ({
  onChange,
  value,
  lable,
  isError,
  message,
}: Props) => {
  return (
    <div className="customInput">
      <label style={isError ? { color: "red" } : {}}>{lable}</label>
      <PhoneInput
        placeholder="Enter phone number"
        value={value}
        onChange={onChange}
        defaultCountry="JO"
        className="container-phone-number-input"
        style={isError ? { borderColor: "red" } : {}}
      />
      <label style={{ color: "red", marginTop: 6 }}>{isError && message}</label>
    </div>
  );
};

export default CustomInputPhoneNumber;
