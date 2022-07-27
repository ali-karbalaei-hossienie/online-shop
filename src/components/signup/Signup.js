import Input from "../../common/Input";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { signupServices } from "../../services/signupServices";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth, useAuthActions } from "../../Context/AuthProvider";
import queryString from "query-string";

const initialValues = {
  name: "",
  email: "",
  phoneNumber: "",
  password: "",
  passwordConfirm: "",
};

let validationSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name length is not valid"),
  email: yup
    .string()
    .email("invalid email format")
    .required("email is required"),
  phoneNumber: yup
    .string()
    .required("phoneNumber is required")
    .matches(/^[0-9]{11}$/, "invalid phone number"),
  password: yup.string().required("password is required"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("passwordConfirm is required"),
});

const Signup = () => {
  const [error, setError] = useState(null);
  let Navigate = useNavigate();
  const setAuth = useAuthActions();
  const Auth = useAuth();
  const { search } = useLocation();
  let redirect = queryString.parse(search).redirect || "/";
  if (redirect == "checkout") redirect = "/checkout";
  console.log(redirect);

  useEffect(() => {
    if (Auth) Navigate({ pathname: `/${redirect}` });
  }, [Auth, redirect]);

  const onsubmit = async (values, { resetForm }) => {
    const { name, email, phoneNumber, password } = values;
    const datauser = {
      name,
      email,
      phoneNumber,
      password,
    };
    try {
      const { data } = await signupServices(datauser);
      setAuth(data);
      localStorage.setItem("authState", JSON.stringify(data));
      resetForm({ values: "" });
      toast.success("Registration was successful");
      setError(null);
      Navigate({ pathname: `${redirect}` });
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
        toast.error("Registration failed");
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
        <Input name="name" formik={formik} label="Name" />
        <Input name="email" formik={formik} label="email" />
        <Input
          name="phoneNumber"
          formik={formik}
          label="phoneNumber"
          type="tel"
        />
        <Input
          name="password"
          formik={formik}
          label="password"
          type="password"
        />
        <Input
          name="passwordConfirm"
          formik={formik}
          label="passwordConfirm"
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
          {error && <p style={{ color: "red" }}>error is: {error}</p>}
          <Link to={`/login?redirect=${redirect}`}>
            <p style={{ marginTop: "15px" }}>Already Login?</p>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
