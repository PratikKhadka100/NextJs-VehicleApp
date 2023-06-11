"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import Image from "next/image";
import Link from "next/link";

import antdNotification from "@/utils/notification";
import Validation from "@/utils/validation";
import classes from "./page.module.css";
import AntdSpin from "@/utils/AntdSpin";
function SignIn() {
  type User = {
    email?: string;
    password?: string;
  };

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<User>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isValidating, setIsValidating] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("name");
    if (!(user === null || user === undefined)) {
      router.replace("/home");
    } else {
      setIsValidating(false);
    }
    setTimeout(() => {
      setIsValidating(false);
    }, 5000);
  }, []);

  function emailHandler(e: any) {
    setEmail(e.target.value);
  }

  function passwordHandler(e: any) {
    setPassword(e.target.value);
  }

  function submitHandler(e: any) {
    setIsLoading(true);
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

      const response = fetch(loginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: json,
      })
        .then((response) => {
          if (response.ok) {
            antdNotification(
              "success",
              "Sign in success",
              "You are logged in successfully"
            );
            router.replace("/home");
          } else {
            setIsLoading(false);
            antdNotification(
              "error",
              "Sign in failed",
              "Invalid email or password"
            );
          }
          return response.json();
        })
        .then((data) => {
          localStorage.setItem("access", data.access);
          localStorage.setItem("refresh", data.refresh);
          localStorage.setItem("name", data.first_name);
        });
    } else {
      setIsLoading(false);
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
    <>
      {isValidating ? (
        <p>Validating user please wait...</p>
      ) : (
        <div className={classes.formContainer}>
          {isLoading ? AntdSpin("#24a0ed") : ""}
          <Image
            src="/images/Logo.png"
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
            {errors.password && (
              <span style={errorStyle}>{errors.password}</span>
            )}
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
      )}
    </>
  );
}

export default SignIn;
