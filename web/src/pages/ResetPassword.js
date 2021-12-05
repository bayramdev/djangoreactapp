import Logo from "../components/Logo";

function ResetPassword() {
  return (
    <main className="form-page">
      <Logo />
      <form className="user-form max-w-lg">
        <h1 className="form-header">Reset Password</h1>
        <section className="flex flex-col gap-2">
          <input
            name="old-password"
            type="password"
            placeholder="Old Password"
            className="form-input"
          />
          <input
            name="new-password"
            type="password"
            placeholder="New Password"
            className="form-input"
          />
          <input
            name="new-password2"
            type="password"
            placeholder="Repeat New Password"
            className="form-input"
          />
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
