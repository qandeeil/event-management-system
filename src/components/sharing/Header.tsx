"use client";
import React, { useEffect, useState } from "react";
import logo from "../../../public/g30.svg";
import Image from "next/image";
import emailSVG from "../../../public/icon/email.svg";
import phoneSVG from "../../../public/icon/phone.svg";
import starSVG from "../../../public/icon/star.svg";
import "@/styles/sharing/header.scss";
import { getSession, signOut } from "next-auth/react";
import SettingsDialog from "./SettingsDialog";

type Props = {};

const Header = (props: Props) => {
  const [user, setUser] = useState<any>();
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const getActiveSession = async () => {
    const session = await getSession();
    setUser(session?.user);
  };
  useEffect(() => {
    getActiveSession();
  }, []);
  const getInitials = (name: string) => {
    if (!name) return "";

    const nameParts = name.split(" ");
    if (nameParts.length === 1) {
      return nameParts[0].substring(0, 2).toUpperCase();
    }

    const firstInitial = nameParts[0][0].toUpperCase();
    const secondInitial = nameParts[1][0].toUpperCase();

    return firstInitial + secondInitial;
  };
  const [openSettingsDialog, setOpenSettingsDialog] = React.useState(false);
  return (
    <>
      <div className="main_header">
        <div className="contact">
          <Image src={logo} alt="logo" width={147} height={33} />
          <div className="info">
            <div className="phone infoContact">
              <Image src={phoneSVG} alt="phone" />
              <span>+1 (678) 999 3323</span>
            </div>
            <div className="email infoContact">
              <Image src={emailSVG} alt="email" />
              <span>info@EventTitans.com</span>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="my_account" onClick={() => setShowMenu(!showMenu)}>
            <span className="profile_image">
              {user?.profile_image ? (
                <Image src={starSVG} alt="star" />
              ) : (
                getInitials(user?.name)
              )}
            </span>
            <span className="profile_name">{user?.name?.slice(0, 15)}</span>
            <div className={`box-menu ${showMenu ? "open" : ""}`}>
              <ul>
                <li>My Favorites</li>
                <li>My Reservations</li>
                <li onClick={() => setOpenSettingsDialog(true)}>Settings</li>
                <li onClick={() => signOut()}>Sign out</li>
              </ul>
            </div>
          </div>
          {user?.admin && (
            <div className="newEvent">
              <Image src={starSVG} alt="starSVG" />
              <span>Create Event</span>
            </div>
          )}
        </div>
      </div>
      <SettingsDialog
        openSettingsDialog={openSettingsDialog}
        setOpenSettingsDialog={(e: boolean) => setOpenSettingsDialog(e)}
        user={user}
        getInitials={getInitials}
      />
    </>
  );
};

export default Header;
