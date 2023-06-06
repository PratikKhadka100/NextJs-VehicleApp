"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Image from "next/image";
import Link from "next/link";

import classes from "./page.module.css";
import Validation from "@/utils/validation";
import antdNotification from "@/utils/notification";
function SignIn() {
  type User = {
    email?: string;
    password?: string;
  };

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<User>({});

  function emailHandler(e: any) {
    setEmail(e.target.value);
  }

  function passwordHandler(e: any) {
    setPassword(e.target.value);
  }

  async function submitHandler(e: any) {
    e.preventDefault();

    const values = {
      email,
      password,
    };

    const validationErrors = Validation(values);

    const loginUrl = "http://localhost:8000/api/login/";

    if (Object.keys(validationErrors).length < 2) {
      const json = JSON.stringify({
        email: email,
        password: password,
      });

      const response = await fetch(loginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: json,
      });
      if (response.ok) {
        antdNotification(
          "success",
          "Sign in success",
          "You are logged in successfully"
        );
        router.push("/home");
      } else {
        antdNotification(
          "error",
          "Sign in failed",
          "Invalid email or password"
        );
      }
    } else {
      setErrors(validationErrors);
    }
  }

  const errorStyle = {
    color: "red",
    fontSize: "10px",
    maxHeight: "15px",
    maxWidth: "200px",
    textOverflow: "ellipsis",
  };

  return (
    <div className={classes.formContainer}>
      {/* {isLoading ? spinIndicator("#24a0ed") : ""} */}
      <Image
        src="/images/logo.png"
        alt="Logo"
        className={classes.logo}
        height={80}
        width={200}
      />

      <form className={classes.signForm} onSubmit={submitHandler}>
        <label htmlFor="email" className={classes.label}>
          Email
        </label>
        <input
          type="email"
          placeholder="Email"
          id="email"
          className={classes.input}
          value={email}
          onChange={emailHandler}
        />
        {errors.email && <span style={errorStyle}>{errors.email}</span>}
        <label htmlFor="password" className={classes.label}>
          Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          className={classes.input}
          value={password}
          onChange={passwordHandler}
        />
        {errors.password && <span style={errorStyle}>{errors.password}</span>}
        <button type="submit" className={classes.button}>
          Sign in
        </button>
        <div className={classes.signupSignIn}>
          <p>
            Don't have an account?{" "}
            <Link href="/signup" style={{ color: "#24a0ed" }}>
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
