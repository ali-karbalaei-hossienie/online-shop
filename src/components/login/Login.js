import Input from "../../common/Input";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { loginServices } from "../../services/loginServices";
import { useAuth, useAuthActions } from "../../Context/AuthProvider";
import queryString from "query-string";

const initialValues = {
  email: "",
  password: "",
};

let validationSchema = yup.object({
  email: yup
    .string()
    .email("invalid email format")
    .required("email is required"),
  password: yup.string().required("password is required"),
});

const Login = () => {
  const [error, setError] = useState(null);
  let Navigate = useNavigate();
  const setAuth = useAuthActions();
  const Auth = useAuth();
  const { search } = useLocation();
  let redirect = queryString.parse(search).redirect || "/";
  if (redirect == "checkout") redirect = "/checkout";
  console.log(redirect);

  useEffect(() => {
    if (Auth) Navigate({ pathname: `${redirect}` });
  }, [Auth, redirect]);
  const onsubmit = async (values) => {
    try {
      const { data } = await loginServices(values);
      setAuth(data);
      localStorage.setItem("authState", JSON.stringify(data));
      setError(null);
      Navigate({ pathname: `${redirect}` });
    } catch (error) {
      if (error.response.data) {
        setError(error.response.data.message);
      }
    }
  };
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: onsubmit,
    validationSchema,
    validateOnMount: true,
    enableReinitialize: true,
  });
  return (
    <div>
      <form className="form" onSubmit={formik.handleSubmit}>
        <Input name="email" formik={formik} label="email" />

        <Input
          name="password"
          formik={formik}
          label="password"
          type="password"
        />

        <div className="formControl">
          <button
            className="btn primary"
            type="submit"
            disabled={!formik.isValid}
          >
            submit
          </button>
          {error && (
            <p style={{ color: "red", marginTop: "15px" }}>error is: {error}</p>
          )}

          <Link to={`/signup?redirect=${redirect}`}>
            <p style={{ marginTop: "15px" }}>Not Signup Yet?</p>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
