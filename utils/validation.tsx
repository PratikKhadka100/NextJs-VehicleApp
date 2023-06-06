function Validation(values: any) {
  type User = {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  };

  const errors: User = {};

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/;
  const passwordPattern = /^(?=.*\w).{8,}$/;

  if (values.firstName === "") {
    errors.firstName = "Required";
  }

  if (values.lastName === "") {
    errors.lastName = "Required";
  }

  if (values.email === "") {
    errors.email = "Required";
  } else if (!emailPattern.test(values.email)) {
    errors.email = "Invalid Email";
  }
  if (values.password === "") {
    errors.password = "Required";
  } else if (!passwordPattern.test(values.password)) {
    errors.password = "Password must be of atleast 8 characters";
  }
  if (values.confirmPassword === "") {
    errors.confirmPassword = "Required";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Password and Confirm password doesn't match";
  }

  return errors;
}

export default Validation;
