"use client";
import styles from "./page.module.css";
import ViewContent from "@/components/registration/sharing/ViewContent";
import Link from "next/link";
import "@/styles/registration/login/login.scss";
import HeaderForm from "@/components/registration/sharing/HeaderForm";
import CustomInput from "@/components/registration/sharing/CustomInput";
import CustomButton from "@/components/registration/sharing/CustomButton";
import { useState } from "react";

interface InfoUser {
  email: string;
  password: string;
}

export default function Home() {
  const [infoUser, setInfoUser] = useState<InfoUser>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInfoUser((prevState: InfoUser) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const loginHandler = (event: any) => {
    event.preventDefault();
    setIsLoading(!isLoading)
  };

  return (
    <main className={styles.main}>
      <div className="login-screen">
        <ViewContent />
        <div className="container-content">
          <span className="go-navigation">
            Don't have an account? <Link href={"/registration"}>Sign Up</Link>
          </span>
          <form onSubmit={(e) => loginHandler(e)}>
            <HeaderForm
              title={"Account Login"}
              description={
                "If you are already a member you can login with your email address and password"
              }
            />
            <CustomInput
              lable={"Email address or phone number or username"}
              placeholder={"Email address or phone number or username"}
              type={"email"}
              onChange={handleInputChange}
              value={infoUser.email}
              name="email"
            />
            <CustomInput
              lable={"Password"}
              placeholder={"Password"}
              type={"password"}
              onChange={handleInputChange}
              value={infoUser.password}
              name="password"
            />
            <CustomButton
              onClick={loginHandler}
              isLoading={isLoading}
              title={"Login"}
            />
          </form>
        </div>
      </div>
    </main>
  );
}
