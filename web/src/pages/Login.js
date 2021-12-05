import { Link } from "react-router-dom";
import Logo from "../components/Logo";

function Login() {
  return (
    <main className="form-page">
      <Logo />
      <form className="user-form max-w-lg">
        <h1 className="form-header">Welcome to TestProof</h1>
        <section className="flex flex-col gap-2">
          <input
            name="username"
            type="text"
            placeholder="Username or Email"
            className="form-input"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="form-input"
          />
        </section>

        <section className="flex flex-col gap-2">
          <input type="submit" value="SIGN UP" className="form-submit" />
          <span className="text-sm text-gray-600 text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-form-primary-light">
              Sign Up to TestProof
            </Link>
          </span>
        </section>
      </form>
    </main>
  );
}

export default Login;
