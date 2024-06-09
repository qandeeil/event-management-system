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
import { useAppDispatch } from "@/store/hooks";
import { accountTypeThunk } from "@/store/registration/user";
import Loading from "@/components/sharing/Loading";

type Props = {};

const page = (props: Props) => {
  const router = useRouter();
  const code = "2914";
  const [dialogPasswordBusiness, setDialogPasswordBusiness] =
    useState<Boolean>(false);
  const [codeBusiness, setCodeBusiness] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const goNavigation = async (info: InfoAccountTypeCard) => {
    setIsLoading(true);
    try {
      if (info.type === "individual") {
        await dispatch(accountTypeThunk(info.type)).then((response) => {
          router.push(
            `/registration/accountType?type=individual&token=${response.payload}`
          );
        });
      } else {
        setDialogPasswordBusiness(true);
      }
    } catch (error: unknown) {
      if (error instanceof Error) console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const checkAccessHandler = async () => {
    setIsLoading(true);
    try {
      if (codeBusiness === code) {
        await dispatch(accountTypeThunk("business")).then((response) => {
          router.push(
            `/registration/accountType?type=business&token=${response.payload}`
          );
        });
      }
    } catch (error: unknown) {
      if (error instanceof Error) console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="registration-screen">
      <Loading isLoading={isLoading} />
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
            type="individual"
            title="Individual"
            description="Personal account to manage all you activities."
            onClick={goNavigation}
          />
          <AccountTypeCard
            type="business"
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
