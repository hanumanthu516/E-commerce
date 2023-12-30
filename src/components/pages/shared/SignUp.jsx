// SignUp.js
import { Formik } from "formik";
import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [existingUsers, setExistingUsers] = useState([]);
  const history = useNavigate();

  useEffect(() => {
    // Fetch existing users from the server
    const fetchExistingUsers = async () => {
      try {
        const response = await fetch("http://localhost:3001/users");
        const data = await response.json();
        setExistingUsers(data);
      } catch (error) {
        console.error("Error fetching existing users:", error);
      }
    };

    fetchExistingUsers();
  }, []); // Run this effect only once on component mount

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    userName: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phoneNumber: Yup.string().required("Phone Number is required"),
    password: Yup.string().required("Password is required"),
    gender: Yup.string().required("Gender is required"),
  });

  const isUserAlreadyExists = (values) => {
    // Check if the user already exists based on your criteria
    return existingUsers.some(
      (user) =>
        user.userName === values.userName ||
        user.email === values.email ||
        user.phoneNumber === values.phoneNumber
    );
  };

  const handleSignUp = async (values) => {
    try {
      // Check if the user already exists
      if (isUserAlreadyExists(values)) {
        const errorMessage = "User with the same details already exists";
        toast.error(errorMessage);
        return;
      }

      const response = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        // Successful signup
        toast.success("Signup successful");
        history("/login");
      } else {
        // Failed signup
        if (data.error) {
          toast.error(data.error);
        } else {
          const errorMessage = "Error during signup";
          toast.error(errorMessage);
        }
      }
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error("An error occurred during signup");
    }
  };

  return (
    <div className="container w-50 mt-5">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title text-center">Sign Up</h2>
        </div>
        <div>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              userName: "",
              email: "",
              phoneNumber: "",
              password: "",
              gender: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSignUp}
          >
            {(formikProps) => (
              <form autoComplete="off" onSubmit={formikProps.handleSubmit}>
                <div className="card-body">
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="firstName" className="form-label">
                        First Name:
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        className={`form-control ${
                          formikProps.touched.firstName &&
                          formikProps.errors.firstName
                            ? "is-invalid"
                            : ""
                        }`}
                        onChange={formikProps.handleChange}
                        onBlur={formikProps.handleBlur}
                        value={formikProps.values.firstName}
                      />
                      {formikProps.touched.firstName &&
                      formikProps.errors.firstName ? (
                        <div className="invalid-feedback">
                          {formikProps.errors.firstName}
                        </div>
                      ) : null}
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="lastName" className="form-label">
                        Last Name:
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        className={`form-control ${
                          formikProps.touched.lastName &&
                          formikProps.errors.lastName
                            ? "is-invalid"
                            : ""
                        }`}
                        onChange={formikProps.handleChange}
                        onBlur={formikProps.handleBlur}
                        value={formikProps.values.lastName}
                      />
                      {formikProps.touched.lastName &&
                      formikProps.errors.lastName ? (
                        <div className="invalid-feedback">
                          {formikProps.errors.lastName}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="userName" className="form-label">
                        Username:
                      </label>
                      <input
                        type="text"
                        id="userName"
                        name="userName"
                        className={`form-control ${
                          formikProps.touched.userName &&
                          formikProps.errors.userName
                            ? "is-invalid"
                            : ""
                        }`}
                        onChange={formikProps.handleChange}
                        onBlur={formikProps.handleBlur}
                        value={formikProps.values.userName}
                      />
                      {formikProps.touched.userName &&
                      formikProps.errors.userName ? (
                        <div className="invalid-feedback">
                          {formikProps.errors.userName}
                        </div>
                      ) : null}
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="email" className="form-label">
                        Email:
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className={`form-control ${
                          formikProps.touched.email && formikProps.errors.email
                            ? "is-invalid"
                            : ""
                        }`}
                        onChange={formikProps.handleChange}
                        onBlur={formikProps.handleBlur}
                        value={formikProps.values.email}
                      />
                      {formikProps.touched.email && formikProps.errors.email ? (
                        <div className="invalid-feedback">
                          {formikProps.errors.email}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="phoneNumber" className="form-label">
                        Phone Number:
                      </label>
                      <input
                        type="number"
                        id="phoneNumber"
                        name="phoneNumber"
                        className={`form-control ${
                          formikProps.touched.phoneNumber &&
                          formikProps.errors.phoneNumber
                            ? "is-invalid"
                            : ""
                        }`}
                        onChange={formikProps.handleChange}
                        onBlur={formikProps.handleBlur}
                        value={formikProps.values.phoneNumber}
                      />
                      {formikProps.touched.phoneNumber &&
                      formikProps.errors.phoneNumber ? (
                        <div className="invalid-feedback">
                          {formikProps.errors.phoneNumber}
                        </div>
                      ) : null}
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="password" className="form-label">
                        Password:
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        className={`form-control ${
                          formikProps.touched.password &&
                          formikProps.errors.password
                            ? "is-invalid"
                            : ""
                        }`}
                        onChange={formikProps.handleChange}
                        onBlur={formikProps.handleBlur}
                        value={formikProps.values.password}
                      />
                      {formikProps.touched.password &&
                      formikProps.errors.password ? (
                        <div className="invalid-feedback">
                          {formikProps.errors.password}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="mb-3 col-md-6">
                    <label htmlFor="gender" className="form-label">
                      Gender:
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      className={`form-select ${
                        formikProps.touched.gender && formikProps.errors.gender
                          ? "is-invalid"
                          : ""
                      }`}
                      onChange={formikProps.handleChange}
                      onBlur={formikProps.handleBlur}
                      value={formikProps.values.gender}
                    >
                      <option value="" disabled>
                        Select Gender
                      </option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    {formikProps.touched.gender && formikProps.errors.gender ? (
                      <div className="invalid-feedback">
                        {formikProps.errors.gender}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="card-footer text-center">
                  <div className="mb-3 ">
                    <button type="submit" className="btn btn-primary ">
                      Sign Up
                    </button>
                    <p>
                      Already have an account?{" "}
                      <Link to="/login">Login here</Link>
                    </p>
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
