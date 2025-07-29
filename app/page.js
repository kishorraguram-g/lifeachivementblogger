"use client";
import { useSession,signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import AchievementList from "@/component/AchievementList";
import NewAchievementPage from "./new/page";

export default function Home() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/login");
    }
    else {
      console.log('authenicated')
    }
  }, [status]);


  if (status === "loading") {
    return <div>Loading...</div>;
  }
  return (
    <div className="">
      <AchievementList />
    </div>
  );
}