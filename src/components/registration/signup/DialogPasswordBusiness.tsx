import React from "react";
import "@/styles/registration/signup/dialogPasswordBusiness.scss";
import CustomButton from "../sharing/CustomButton";

type Props = {
  onChange: (value: string) => void;
  value: string;
  onClick: (e: any) => void;
  setDialogPasswordBusiness: (value: boolean) => void;
};

const DialogPasswordBusiness = ({
  onChange,
  value,
  onClick,
  setDialogPasswordBusiness,
}: Props) => {
  return (
    <div className="dialogPasswordBusiness">
      <div
        className="background"
        onClick={() => setDialogPasswordBusiness(false)}
      ></div>
      <form className="container">
        <h1>Add the key to continue</h1>
        <div className="customInput">
          <input
            type={"text"}
            placeholder={"Enter the key"}
            onChange={(e) => onChange(e.target.value)}
            value={value}
            name={"code"}
          />
        </div>
        <CustomButton onClick={onClick} isLoading={false} title={"Verifier"} />
      </form>
    </div>
  );
};

export default DialogPasswordBusiness;
