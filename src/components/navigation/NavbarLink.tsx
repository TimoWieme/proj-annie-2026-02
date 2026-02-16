import { NavLink } from "react-router-dom";

interface NavbarLinkProps {
  to: string;
  className?: string;
  buttonText: string;
  activeClassName?: string;
}

const NavbarLink = ({ to, className, buttonText, activeClassName = "" }: NavbarLinkProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `text-gray-700 hover:text-gray-900 font-medium transition-colors ${className} ${isActive ? `font-bold ${activeClassName}` : ""}`.trim()
      }
    >
      {buttonText}
    </NavLink>
  );
};

export default NavbarLink;
