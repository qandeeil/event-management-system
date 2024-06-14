import "@/styles/registration/login/login.scss";
import "@/styles/screens/homeScreen.scss";
import HomeScreen from "@/screens/HomeScreen";
import { cookies } from "next/headers";

export default function Home() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");
  return <HomeScreen token={accessToken?.value} />;
}
