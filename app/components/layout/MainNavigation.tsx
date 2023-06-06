"use client";

import Link from "next/link";

import classes from "./MainNavigation.module.css";
import Image from "next/image";

function MainNavigation() {
  function signOutHandler() {}
  return (
    <nav className={classes.mainNav}>
      <div className={classes.logo}>
        <Image src="/images/logo.png" alt="Logo" height={80} width={250}/>
      </div>

      <ul className={classes.menuLink}>
        <li className={classes.li}>
          <Link href="/home">Home</Link>
        </li>
        <li className={classes.li}>
          <Link href="/add-vehicle">Add Vehicle</Link>
        </li>
        <li className={classes.signOut} onClick={signOutHandler}>Sign out</li>
      </ul>
    </nav>
  );
}

export default MainNavigation;
