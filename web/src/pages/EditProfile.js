import Logo from "../components/Logo";

function EditProfile() {
  return (
    <main className="form-page">
      <Logo />
      <form className="user-form max-w-xl">
        <h1 className="form-header">Edit Profile</h1>

        <section className="flex flex-col gap-2">
          <section className="flex flex-col md:flex-row gap-2">
            <label className="form-label flex flex-col flex-1">
              First Name
              <input
                name="first-name"
                type="text"
                placeholder="First Name"
                className="form-input"
              />
            </label>
            <label className="form-label flex flex-col flex-1">
              Last Name
              <input
                name="last-name"
                type="text"
                placeholder="Last Name"
                className="form-input"
              />
            </label>
          </section>

          <label className="form-label flex flex-col">
            Email
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="form-input"
            />
          </label>

          <label className="form-label flex flex-col">
            Username
            <input
              name="username"
              type="text"
              placeholder="Username"
              className="form-input"
            />
          </label>

          <label className="form-label flex flex-col">
            Verify Password
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="form-input"
            />
          </label>
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
