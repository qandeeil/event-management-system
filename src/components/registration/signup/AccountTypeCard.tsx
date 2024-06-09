import React from "react";
import "@/styles/registration/signup/accountTypeCard.scss";
import polygonSVG from "@/components/registration/signup/icons/Polygon1.svg";
import userSVG from "@/components/registration/signup/icons/user.svg";
import polygon2SVG from "@/components/registration/signup/icons/Polygon2.svg";
import briefcaseSVG from "@/components/registration/signup/icons/briefcase.svg";
import Image from "next/image";
import { InfoAccountTypeCard } from "./Interfaces";

type Props = {
  type: string;
  title: string;
  description: string;
  onClick: (info: InfoAccountTypeCard) => void;
};

const AccountTypeCard = ({ type, title, description, onClick }: Props) => {
  return (
    <div
      className="accountTypeCard"
      onClick={() =>
        onClick({
          type,
          title,
          description,
        })
      }
    >
      <div className="icon">
        <Image
          src={type === "individual" ? polygonSVG : polygon2SVG}
          alt="polygonSVG"
        />
        <Image
          src={type === "individual" ? userSVG : briefcaseSVG}
          alt="userSVG"
        />
      </div>
      <div className="info">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default AccountTypeCard;
