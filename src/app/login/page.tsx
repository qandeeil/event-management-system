"use client";
import styles from "@/app/page.module.css";
import ViewContent from "@/components/registration/sharing/ViewContent";
import Link from "next/link";
import "@/styles/registration/login/login.scss";
import HeaderForm from "@/components/registration/sharing/HeaderForm";
import CustomInput from "@/components/registration/sharing/CustomInput";
import CustomButton from "@/components/registration/sharing/CustomButton";
import { useLayoutEffect, useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { loginThunk } from "@/store/registration/user";
import { ILogin } from "@/components/registration/signup/Interfaces";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

interface InfoUser {
  identity: string;
  password: string;
}

export default function Page() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [infoUser, setInfoUser] = useState<ILogin>({
    identity: "",
    password: "",
    country: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<any>();
  const [country, setCounry] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInfoUser((prevState: InfoUser) => ({
      ...prevState,
      [name]: value,
      country: country,
    }));
  };

  useLayoutEffect(() => {
    const getCodeCountry = async () => {
      const countryResponse = await axios.get("https://api.country.is");
      const country = countryResponse.data.country;
      setCounry(country);
    };
    getCodeCountry();
  }, []);

  const loginHandler = async () => {
    setIsLoading(true);
    setIsError(null);

    try {
      const loginResponse: any = await dispatch(loginThunk(infoUser));
      if (loginResponse.error) {
        setIsError(loginResponse.payload);
      } else {
        await signIn("credentials", {
          token: loginResponse.payload,
          redirect: true,
          callbackUrl: "/",
        })
          .then((response) => {
            console.log(">> response ", response);
          })
          .catch((error) => console.error(error.message));
        console.log(">> loginResponse ", loginResponse.payload);
      }
    } catch (error: any) {
      setIsError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={styles.main}>
      <div className="login-screen">
        <ViewContent />
        <div className="container-content">
          <span className="go-navigation">
            Don't have an account? <Link href={"/registration"}>Sign Up</Link>
          </span>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              loginHandler();
            }}
          >
            <HeaderForm
              title={"Account Login"}
              description={
                "If you are already a member you can login with your email address and password"
              }
            />
            <CustomInput
              lable={"Email address or phone number"}
              placeholder={"Email address or phone number"}
              type={"text"}
              onChange={handleInputChange}
              value={infoUser.identity}
              name="identity"
              isError={isError?.email === false}
              message={isError?.message}
            />
            <CustomInput
              lable={"Password"}
              placeholder={"Password"}
              type={"password"}
              onChange={handleInputChange}
              value={infoUser.password}
              name="password"
              isError={isError?.password === false}
              message={isError?.message}
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
