
import { NavbarData } from "../data/Navbar";
import { NavLink } from "react-router-dom";
import Logo from  "../assets/StudySyn.svg";
import "./Navbar.css";


const Navbar = () => {
  return (
    <div className="w-full h-[70px] flex justify-center items-center p-4 bg-slate-800  gap-x-5 pr-[45%]">
      <div className="w-[80%] flex justify-start items-start Navbar">
        <img src={Logo} alt="" width={"40px"} height={"40px"}/>
        </div>
     <div className="Navbar-link">
     {NavbarData.map((link) => (
        <NavLink
          key={link.idx}
          to={link.path}
          className={({ isActive }) =>
            isActive
              ? "text-blue-500 font-semibold text-xl font-weight-bold border-b-2 border-blue-500"
              : "text-white font-medium text-xl"
          }
        >
          {link.title}
        </NavLink>
      ))}
     </div>
      
    </div>
  );
};

export default Navbar;
