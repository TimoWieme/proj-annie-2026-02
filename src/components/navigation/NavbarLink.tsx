import { Link } from "react-router-dom";

interface NavbarLinkProps {
  to: string;
  className?: string;
  buttonText: string;
}

const NavbarLink = ({ to, className, buttonText }: NavbarLinkProps) => {
  return (
    <Link to={to} className={`text-gray-700 hover:text-gray-900 font-medium transition-colors ${className}`}>
      {buttonText}
    </Link>
  );
};

export default NavbarLink;
