import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Select, { defaultTheme } from "react-select";

import Logo from "../components/Logo";
import ErrorInfo from "../components/ErrorInfo";
import useAuth from "../auth/useAuth";

function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const [errors, setErrors] = useState({
    username: [],
    email: [],
    password: [],
    password2: [],
    non_field_errors: [],
  });

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.password2) {
      setErrors({ password2: ["The passwords doesn't match"] });
      return;
    }

    try {
      await signup(formData);
      setErrors({});
      navigate("/account/login");
    } catch (err) {
      console.error(err);
      setErrors(
        err.response
          ? err.response.data
          : {
              non_field_errors: [
                err.request
                  ? "No response was received from the server"
                  : "Couldn't made request to the server",
              ],
            }
      );
    }
  };

  return (
    <main className="form-page">
      <Logo />
      <form className="user-form max-w-lg" onSubmit={handleSubmit}>
        <h1 className="form-header">Sign Up to TestProof</h1>
        <section className="flex flex-col gap-4">
          <article className="flex flex-col">
            <input
              name="username"
              type="text"
              placeholder="Username"
              className="form-input"
              value={formData.username}
              onChange={handleChange}
            />
            <ErrorInfo errors={errors.username} />
          </article>

          <article className="flex flex-col">
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="form-input"
              value={formData.email}
              onChange={handleChange}
            />
            <ErrorInfo errors={errors.email} />
          </article>

          <Select
            value={{ value: "package", label: "Package" }}
            options={[{ value: "package", label: "Package" }]}
            theme={{
              ...defaultTheme,
              colors: {
                ...defaultTheme.colors,
                neutral80: "#9ca3be",
              },
              spacing: {
                ...defaultTheme.spacing,
                controlHeight: "2.8rem",
              },
            }}
          />

          <article className="flex flex-col">
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="form-input"
              value={formData.password}
              onChange={handleChange}
            />
            <ErrorInfo errors={errors.password} />
          </article>

          <article className="flex flex-col">
            <input
              name="password2"
              type="password"
              placeholder="Repeat Password"
              className="form-input"
              value={formData.password2}
              onChange={handleChange}
            />
            <ErrorInfo errors={errors.password2} />
          </article>

          <ErrorInfo errors={errors.non_field_errors} />
        </section>

        <section className="flex flex-col gap-2">
          <input type="submit" value="SIGN UP" className="form-submit" />
          <span className="text-sm text-gray-600 text-center">
            Already have an account?{" "}
            <Link to="/account/login" className="text-form-primary-light">
              Login to TestProof
            </Link>
          </span>
        </section>
      </form>
    </main>
  );
}

export default Signup;
