import { Formik } from "formik";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { setIsUserLoggedIn } from "../../../redux/reducers/AuthSlice";

const Login = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleLogin = async (values) => {
    try {
      const response = await fetch(
        `http://localhost:3001/users?userName=${values.username}&password=${values.password}`
      );
      const userData = await response.json();

      if (response.ok) {
        if (userData.length > 0) {
          toast.success("Login successful");
          dispatch(setIsUserLoggedIn(true));
          localStorage.setItem("username", values.username);
          localStorage.setItem("password", values.password);
          history("/");
        } else {
          toast.error("Invalid username or password");
        }
      } else {
        toast.error("An error occurred during login");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("An error occurred during login");
    }
  };

  return (
    <div className="container w-50 mt-5">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title text-center">Login</h2>
        </div>
        <div>
          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {(formikProps) => (
              <form autoComplete="off" onSubmit={formikProps.handleSubmit}>
                <div className="card-body">
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Username:
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      className={`form-control ${
                        formikProps.touched.username &&
                        formikProps.errors.username
                          ? "is-invalid"
                          : ""
                      }`}
                      onChange={formikProps.handleChange}
                      onBlur={formikProps.handleBlur}
                      value={formikProps.values.username}
                    />
                    {formikProps.touched.username &&
                    formikProps.errors.username ? (
                      <div className="invalid-feedback">
                        {formikProps.errors.username}
                      </div>
                    ) : null}
                  </div>
                  <div className="mb-3">
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
                <div className=" card-footer text-center">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={
                      formikProps.errors.username ||
                      formikProps.errors.password ||
                      formikProps.values.password === "" ||
                      formikProps.values.username === ""
                    }
                  >
                    Login
                  </button>
                  <p>
                    Not a member? <Link to="/sign-up">Register now</Link>
                  </p>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
