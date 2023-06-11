"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "../../../public/images/Logo.png";

import Image from "next/image";
import classes from "./MainNavigation.module.css";
import AntdSpin from "@/utils/AntdSpin";
import antdNotification from "@/utils/notification";

function MainNavigation() {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  function signOutHandler() {
    setIsLoading(true);
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("name");

    antdNotification(
      "success",
      "Sign out success",
      "You are signed out successfully"
    );
    router.replace("/");
  }
  return (
    <nav className={classes.mainNav}>
      <div className={classes.logo}>
        <Image src={Logo} alt="Logo" height={80} width={200} />
      </div>

      <ul className={classes.menuLink}>
        <li className={classes.li}>
          <Link href="/home">Home</Link>
        </li>
        <li className={classes.li}>
          <Link href="/add-vehicle">Add Vehicle</Link>
        </li>
        <li className={classes.signOut} onClick={signOutHandler}>
          Sign out {isLoading ? AntdSpin("white") : ""}
        </li>
      </ul>
    </nav>
  );
}

export default MainNavigation;
