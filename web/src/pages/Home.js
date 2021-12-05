import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="bg-form-neutral-medium h-full flex justify-center">
      <section className="flex flex-col w-full max-w-xl p-4 gap-4">
        <h1 className="form-header">Home Page</h1>

        <section className="flex flex-col gap-2">
          <p>This page is WIP. It is quite empty in here...</p>

          <Link to="/edit-profile" className="text-form-primary-light">
            You can edit your profile from here
          </Link>

          <Link to="/reset-password" className="text-form-primary-light">
            You can reset your password from here
          </Link>

          <Link to="/logout" className="text-form-primary-light">
            You can log out from here
          </Link>
        </section>
      </section>
    </main>
  );
}

export default Home;
