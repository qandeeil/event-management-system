import AccountType from "@/screens/AccountType";
import baseURL from "@/store/baseURL";
import axios from "axios";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: { accountType: string };
  searchParams: { type: string; token: string };
};

const page = async ({ searchParams }: Props) => {
  try {
    await axios.get(`${baseURL}/user/check-validation-token-account-type`, {
      headers: {
        authorization: `Bearer ${searchParams.token}`,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    redirect(
      `/unauthorized?status=401&message=You are not authorized to access the requested page`
    );
  }
  return (
    <AccountType
      title={searchParams.type}
      description={
        "For the purpose of industry regulation, your details are required."
      }
      token={searchParams.token}
    />
  );
};

export default page;
