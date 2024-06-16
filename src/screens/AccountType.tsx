"use client";
import ViewContent from "@/components/registration/sharing/ViewContent";
import React, { useLayoutEffect, useState } from "react";
import "@/styles/registration/signup/account-type.scss";
import Link from "next/link";
import HeaderForm from "@/components/registration/sharing/HeaderForm";
import CustomInput from "@/components/registration/sharing/CustomInput";
import CustomButton from "@/components/registration/sharing/CustomButton";
import { ISignup } from "@/components/registration/signup/Interfaces";
import CustomInputPhoneNumber from "@/components/registration/sharing/CustomInputPhoneNumber";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  createAccountThunk,
  setIsErrorSignup,
} from "@/store/user/user";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

type Props = {
  title: string;
  description: string;
  token: string;
};

const AccountType = ({ title, description, token }: Props) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userSlice);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<ISignup>({
    token: token,
    name: "",
    email: "",
    password: "",
    phone_number: "",
  });
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const createAccountHandler = async () => {
    setIsLoading(true);
    dispatch(setIsErrorSignup(null));
    await dispatch(createAccountThunk(userData)).then(async (response: any) => {
      if (!response.error) {
        await signIn("credentials", {
          token: response.payload,
          redirect: true,
          callbackUrl: "/",
        })
          .then((response) => {})
          .catch((error) => console.error(error.message));
      } else {
        if (response.payload.authorization)
          toast.error(response.payload.authorization);
      }
    });
    setIsLoading(false);
  };

  return (
    <div className="individual-screen">
      <ViewContent />
      <div className="container-content">
        <span className="go-navigation">
          Already have an account? <Link href={"/"}>Login</Link>
        </span>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createAccountHandler();
          }}
        >
          <HeaderForm
            title={`Register ${title} Account!`}
            description={description}
          />
          <CustomInput
            lable={"Full name"}
            placeholder={"Full name"}
            type={"text"}
            onChange={handleInputChange}
            value={userData.name}
            name="name"
            isError={user.isError?.name === false}
            message={user.isError?.message}
          />
          <CustomInput
            lable={"Email Address"}
            placeholder={"Email Address"}
            type={"email"}
            onChange={handleInputChange}
            value={userData.email}
            name="email"
            isError={user.isError?.email === false}
            message={user.isError?.message}
          />
          <CustomInputPhoneNumber
            lable="Phone Number"
            onChange={(e: string | undefined) =>
              setUserData((prevData) => ({
                ...prevData,
                phone_number: e,
              }))
            }
            value={userData.phone_number}
            isError={user.isError?.phone_number === false}
            message={user.isError?.message}
          />
          <CustomInput
            lable={"Password"}
            placeholder={"Password"}
            type={"password"}
            onChange={handleInputChange}
            value={userData.password}
            name="password"
            isError={user.isError?.password === false}
            message={user.isError?.message}
          />
          <CustomButton
            onClick={createAccountHandler}
            isLoading={isLoading}
            title={"Sign up"}
          />
        </form>
      </div>
    </div>
  );
};

export default AccountType;
