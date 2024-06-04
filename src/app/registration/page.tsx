"use client";
import ViewContent from "@/components/registration/sharing/ViewContent";
import React, { useState } from "react";
import "@/styles/registration/signup/signup.scss";
import Link from "next/link";
import HeaderForm from "@/components/registration/sharing/HeaderForm";
import AccountTypeCard from "@/components/registration/signup/AccountTypeCard";
import { useRouter } from "next/navigation";
import DialogPasswordBusiness from "@/components/registration/signup/DialogPasswordBusiness";
import { InfoAccountTypeCard } from "@/components/registration/signup/Interfaces";

type Props = {};

const page = (props: Props) => {
  const router = useRouter();
  const code = "2914";
  const [dialogPasswordBusiness, setDialogPasswordBusiness] =
    useState<Boolean>(false);
  const [codeBusiness, setCodeBusiness] = useState<string>("");
  const goNavigation = (info: InfoAccountTypeCard) => {
    if (info.type === "1") {
      router.push("/registration/individual");
    } else {
      setDialogPasswordBusiness(true);
    }
  };
  const checkAccessHandler = (e: any) => {
    e.preventDefault();
    if (codeBusiness === code) {
      router.push("/registration/business");
    } else {
    }
  };
  return (
    <div className="registration-screen">
      <ViewContent />
      <div className="container-content">
        <span className="go-navigation">
          Already have an account? <Link href={"/"}>Login</Link>
        </span>
        <form>
          <HeaderForm
            title={"Join Us!"}
            description={
              "To begin this journey, tell us what type of account you’d be opening."
            }
          />
          <AccountTypeCard
            type="1"
            title="Individual"
            description="Personal account to manage all you activities."
            onClick={goNavigation}
          />
          <AccountTypeCard
            type="2"
            title="Business"
            description="Own or belong to a company, this is for you."
            onClick={goNavigation}
          />
        </form>
      </div>
      {dialogPasswordBusiness && (
        <DialogPasswordBusiness
          onChange={setCodeBusiness}
          value={codeBusiness}
          onClick={checkAccessHandler}
          setDialogPasswordBusiness={setDialogPasswordBusiness}
        />
      )}
    </div>
  );
};

export default page;
