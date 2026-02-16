import NavbarLink from "./NavbarLink";
import Logo from "../../../public/logo.svg";

const NavigationBar = () => {
  return (
    <nav className="py-4 w-full px-4 md:px-8">
      <div className="flex items-center gap-4">
          <img src={Logo} alt="Logo" className="w-12 h-12" />
        <div className="flex gap-4">
          <NavbarLink
            to="/"
            buttonText="Home"
            activeClassName="text-primary font-bold"
          />
          <NavbarLink
            to="/producten"
            buttonText="Producten"
            activeClassName="text-primary font-bold"
          />
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
