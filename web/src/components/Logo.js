import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/" className="absolute left-8 top-8 w-36 invisible lg:visible">
      <img
        src="/testproof-logo-label.png"
        alt="Website Logo"
        className="w-full h-full"
      />
    </Link>
  );
}

export default Logo;
