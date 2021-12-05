import { Link } from "react-router-dom";
import Select, { defaultTheme } from "react-select";
import Logo from "../components/Logo";

function Register() {
  return (
    <main className="form-page">
      <Logo />
      <form className="user-form max-w-lg">
        <h1 className="form-header">Sign Up to TestProof</h1>
        <section className="flex flex-col gap-2">
          <input
            name="username"
            type="text"
            placeholder="Username"
            className="form-input"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="form-input"
          />
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
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="form-input"
          />
          <input
            name="password2"
            type="password"
            placeholder="Repeat Password"
            className="form-input"
          />
        </section>

        <section className="flex flex-col gap-2">
          <input type="submit" value="SIGN UP" className="form-submit" />
          <span className="text-sm text-gray-600 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-form-primary-light">
              Login to TestProof
            </Link>
          </span>
        </section>
      </form>
    </main>
  );
}

export default Register;
