import React from "react";
import "@/styles/registration/sharing/viewContent.scss";
import Image from "next/image";
import imageOne from "../../../../public/login/pexels-photo-1540406.jpeg";
import headerLogo from "../../../../public/login/headerLogo.svg";

type Props = {};

const ViewContent = (props: Props) => {
  return (
    <div className="viewContent">
      <div className="containerImage">
        <div className="header-logo">
          <Image src={headerLogo} alt="logo" width={200} height={100} />
        </div>
        <Image src={imageOne} alt="imsge" width={500} height={500} />
        <div className="background-blur"></div>
        <div className="description">
          <p>
            Welcome to Event Itans, your ultimate platform for effortless event
            planning and bookings. Whether you're organizing a grand wedding, a
            professional conference, or an engaging workshop, Event Itans
            simplifies the process and helps you create unforgettable
            experiences. Join us to explore top venues, manage guest lists, and
            access all the tools you need for successful event management.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewContent;
