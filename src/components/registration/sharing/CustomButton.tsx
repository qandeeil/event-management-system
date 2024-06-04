import React from "react";
import "@/styles/registration/sharing/customButton.scss";

type Props = {
  onClick: (event: any) => void;
  isLoading: boolean;
  title: string;
};

const CustomButton = ({ onClick, isLoading, title }: Props) => {
  return (
    <button
      className={`customButton ${isLoading && "isLoadingButton"}`}
      onClick={(e) => onClick(e)}
      disabled={isLoading}
    >
      {isLoading ? <div className="loader"></div> : title}
    </button>
  );
};

export default CustomButton;
