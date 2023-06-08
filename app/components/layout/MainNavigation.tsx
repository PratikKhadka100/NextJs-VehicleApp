"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "../../../public/images/Logo.png";

import Image from "next/image";
import classes from "./MainNavigation.module.css";
import antdNotification from "@/utils/notification";

function MainNavigation() {
  const router = useRouter();
  function signOutHandler() {
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
          Sign out
        </li>
      </ul>
    </nav>
  );
}

export default MainNavigation;
