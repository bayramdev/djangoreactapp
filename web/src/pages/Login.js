import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Logo from "../components/Logo";
import ErrorInfo from "../components/ErrorInfo";
import useAuth from "../auth/useAuth";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: [],
    password: [],
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
    try {
      await login(formData);
      setErrors({});
      navigate("/");
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
        <h1 className="form-header">Welcome to TestProof</h1>
        <section className="flex flex-col gap-2">
          <article className="flex flex-col">
            <input
              name="usernameOrEmail"
              type="text"
              placeholder="Username or Email"
              className="form-input"
              onChange={handleChange}
            />
            <ErrorInfo errors={errors.username} />
          </article>

          <section className="flex flex-col gap-2">
            <article className="flex flex-col">
              <input
                name="password"
                type="password"
                placeholder="Password"
                className="form-input"
                onChange={handleChange}
              />
              <ErrorInfo errors={errors.password} />
            </article>
            <span className="text-sm text-gray-600 text-center">
              Forgot Password?{" "}
              <Link to="/forgot-password" className="text-form-primary-light">
                Click here
              </Link>
            </span>
          </section>

          <ErrorInfo errors={errors.non_field_errors} />
        </section>

        <section className="flex flex-col gap-2">
          <input type="submit" value="LOGIN" className="form-submit" />
          <span className="text-sm text-gray-600 text-center">
            Don't have an account?{" "}
            <Link to="/account/signup" className="text-form-primary-light">
              Sign Up to TestProof
            </Link>
          </span>
        </section>
      </form>
    </main>
  );
}

export default Login;
