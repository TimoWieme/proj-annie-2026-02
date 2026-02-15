import NavbarLink from "./NavbarLink";
import Logo from "../../../public/vite.svg";

const NavigationBar = () => {
  return (
    <nav className="py-4 w-full px-12">
        <div className="flex items-center gap-4">
            <img src={Logo} alt="Logo" className="w-10 h-10" />
            <div className="flex gap-4">
                <NavbarLink to="/" buttonText="Home" />
                <NavbarLink to="/producten" buttonText="Producten" />
            </div>
        </div>
    </nav>
  );
};

export default NavigationBar;
