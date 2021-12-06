import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Logo from "../components/Logo";
import ErrorInfo from "../components/ErrorInfo";
import useAuth from "../auth/useAuth";

function ResetPassword() {
  const navigate = useNavigate();
  const { resetPassword } = useAuth();

  const [formData, setFormData] = useState({
    old_password: "",
    new_password: "",
    new_password2: "",
  });
  const [errors, setErrors] = useState({
    old_password: [],
    new_password: [],
    new_password2: [],
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

    if (formData.new_password !== formData.new_password2) {
      setErrors({ password2: ["The passwords doesn't match"] });
      return;
    }

    try {
      await resetPassword(formData);
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
        <h1 className="form-header">Reset Password</h1>
        <section className="flex flex-col gap-2">
          <input
            name="old_password"
            type="password"
            placeholder="Old Password"
            className="form-input"
            onChange={handleChange}
            value={formData.old_password}
          />
          <ErrorInfo errors={errors.old_password} />

          <input
            name="new_password"
            type="password"
            placeholder="New Password"
            className="form-input"
            onChange={handleChange}
            value={formData.new_password}
          />
          <ErrorInfo errors={errors.new_password} />

          <input
            name="new_password2"
            type="password"
            placeholder="Repeat New Password"
            className="form-input"
            onChange={handleChange}
            value={formData.new_password2}
          />
          <ErrorInfo errors={errors.new_password2} />

          <ErrorInfo errors={errors.non_field_errors} />
        </section>
        <input
          name="submit"
          type="submit"
          value="SUBMIT"
          className="form-submit"
        />
      </form>
    </main>
  );
}

export default ResetPassword;
