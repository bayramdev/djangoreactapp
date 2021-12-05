import { Link } from "react-router-dom";
import useAuth from "../auth/useAuth";

function Home() {
  const { logout } = useAuth();

  const tryLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error({ ...err });
    }
  };

  return (
    <main className="bg-form-neutral-medium h-full flex justify-center items-center">
      <section className="flex flex-col w-full max-w-xl p-4 gap-4 text-center">
        <h1 className="form-header">Home Page</h1>

        <section className="flex flex-col gap-2">
          <p>This page is WIP. It is quite empty in here...</p>

          <Link to="/settings/edit-profile" className="text-form-primary-light">
            You can edit your profile from here
          </Link>

          <Link
            to="/settings/reset-password"
            className="text-form-primary-light"
          >
            You can reset your password from here
          </Link>

          <button className="text-form-primary-light" onClick={tryLogout}>
            You can log out from here
          </button>
        </section>
      </section>
    </main>
  );
}

export default Home;
