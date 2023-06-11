"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Link from "next/link";

import classes from "../../app/page.module.css";
import Validation from "@/utils/validation";
import antdNotification from "@/utils/notification";

function SignUp() {
  type User = {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  };

  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState<User>({});

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

  function firstNameHandler(e: any) {
    setFirstName(e.target.value);
  }

  function LastNameHandler(e: any) {
    setLastName(e.target.value);
  }

  function emailHandler(e: any) {
    setEmail(e.target.value);
  }

  function passwordHandler(e: any) {
    setPassword(e.target.value);
  }

  function confirmPasswordHandler(e: any) {
    setConfirmPassword(e.target.value);
  }

  async function submitHandler(e: any) {
    e.preventDefault();
    const values = {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    };

    const validationErrors = Validation(values);

    const registerUrl = "http://localhost:8000/api/user/";

    if (Object.keys(validationErrors).length === 0) {
      const json = JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
      });

      const response = await fetch(registerUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: json,
      });

      if (response.ok) {
        antdNotification(
          "success",
          "Sign up success",
          "Thanks for signing up."
        );
        router.push("/");
      } else {
        antdNotification(
          "error",
          "Sign up failed",
          "Email you provided is already taken"
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
    <>
      {isValidating ? (
        <p>Validating user please wait...</p>
      ) : (
        <div className={classes.formContainer}>
          <h1 style={{ fontWeight: "bold", marginBottom: "15px" }}>Sign up</h1>
          <form className={classes.signForm} onSubmit={submitHandler}>
            <label htmlFor="first-name" className={classes.label}>
              First Name
            </label>
            <input
              type="text"
              placeholder="First Name"
              id="first-name"
              className={classes.input}
              value={firstName}
              onChange={firstNameHandler}
            />
            {errors.firstName && (
              <span style={errorStyle}>{errors.firstName}</span>
            )}
            <label htmlFor="last-name" className={classes.label}>
              Last Name
            </label>
            <input
              type="text"
              placeholder="Last Name"
              id="last-name"
              className={classes.input}
              value={lastName}
              onChange={LastNameHandler}
            />
            {errors.lastName && (
              <span style={errorStyle}>{errors.lastName}</span>
            )}
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
            <label htmlFor="confirm-password" className={classes.label}>
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              placeholder="Confirm Password"
              className={classes.input}
              value={confirmPassword}
              onChange={confirmPasswordHandler}
            />
            {errors.confirmPassword && (
              <span style={errorStyle}>{errors.confirmPassword}</span>
            )}

            <button type="submit" className={classes.button}>
              Sign up
            </button>

            <div className={classes.signupSignIn}>
              <p>
                Already have an account?{" "}
                <Link href="/" style={{ color: "#24a0ed" }}>
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default SignUp;
