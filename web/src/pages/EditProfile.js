import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Logo from "../components/Logo";
import ErrorInfo from "../components/ErrorInfo";
import useAuth from "../auth/useAuth";

function EditProfile() {
  const navigate = useNavigate();
  const { editProfile } = useAuth();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    first_name: [],
    last_name: [],
    username: [],
    email: [],
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
      await editProfile(formData);
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
      <form className="user-form max-w-xl" onSubmit={handleSubmit}>
        <h1 className="form-header">Edit Profile</h1>

        <section className="flex flex-col gap-2">
          <section className="flex flex-col md:flex-row gap-2">
            <label className="form-label flex flex-col flex-1">
              First Name
              <input
                onChange={handleChange}
                value={formData.first_name}
                name="first_name"
                type="text"
                placeholder="First Name"
                className="form-input"
              />
              <ErrorInfo errors={errors.first_name} />
            </label>
            <label className="form-label flex flex-col flex-1">
              Last Name
              <input
                onChange={handleChange}
                value={formData.last_name}
                name="last_name"
                type="text"
                placeholder="Last Name"
                className="form-input"
              />
              <ErrorInfo errors={errors.last_name} />
            </label>
          </section>

          <label className="form-label flex flex-col">
            Email
            <input
              onChange={handleChange}
              value={formData.email}
              name="email"
              type="email"
              placeholder="Email"
              className="form-input"
            />
            <ErrorInfo errors={errors.email} />
          </label>

          <label className="form-label flex flex-col">
            Username
            <input
              onChange={handleChange}
              value={formData.username}
              name="username"
              type="text"
              placeholder="Username"
              className="form-input"
            />
            <ErrorInfo errors={errors.username} />
          </label>

          <label className="form-label flex flex-col">
            Verify Password
            <input
              onChange={handleChange}
              value={formData.password}
              name="password"
              type="password"
              placeholder="Password"
              className="form-input"
            />
            <ErrorInfo errors={errors.password} />
          </label>

          <ErrorInfo errors={errors.non_field_errors} />
        </section>

        <input
          type="submit"
          value="SUBMIT"
          className="form-submit px-4 w-full"
        />
      </form>
    </main>
  );
}

export default EditProfile;
