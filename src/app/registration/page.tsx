import ViewContent from "@/components/registration/sharing/ViewContent";
import React from "react";
import "@/styles/registration/signup/signup.scss";
import Link from "next/link";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="registration-screen">
      <ViewContent />
      <span className="go-navigation">
        Already have an account? <Link href={"/"}>Login</Link>
      </span>
    </div>
  );
};

export default page;
