import React from "react";
import '@/styles/registration/sharing/headerForm.scss'

type Props = {
  title: String;
  description: String;
};

const HeaderForm = ({ title, description }: Props) => {
  return (
    <div className="headerForm">
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
};

export default HeaderForm;
