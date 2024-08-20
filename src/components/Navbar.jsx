import { Link } from "react-router-dom";
import Logo from "../images/logo/logo.png";
import { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import { Dropdown } from 'react-bootstrap';


function Navbar() {
  const { authToken, user, logout } = useContext(AuthContext);
  const [nav, setNav] = useState(false);

  const openNav = () => {
    setNav(!nav);
  };

  
  return (
    <>
      <nav>
        {/* mobile */}
        <div className={`mobile-navbar ${nav ? "open-nav" : ""}`}>
          <div onClick={openNav} className="mobile-navbar__close">
            <i className="fa-solid fa-xmark"></i>
          </div>
          <ul className="mobile-navbar__links">
            <li>
              <Link onClick={openNav} to="/">
                Home
              </Link>
            </li>
            <li>
              <Link onClick={openNav} to="/about">
                About
              </Link>
            </li>
            <li>
              <Link onClick={openNav} to="/models">
                Models
              </Link>
            </li>
            {/* <li>
              <Link onClick={openNav} to="/testimonials">
                Testimonials
              </Link>
            </li> */}
            {/* <li>
              <Link onClick={openNav} to="/team">
                Our Team
              </Link>
            </li> */}
            <li>
              <Link onClick={openNav} to="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* desktop */}

        <div className="navbar">
          <div className="navbar__img">
            <Link to="/" onClick={() => window.scrollTo(0, 0)}>
              <img src={Logo} alt="logo-img" />
              
            </Link>
          </div>
          <ul className="navbar__links">
            <li>
              <Link className="home-link" to="/">
                Home
              </Link>
            </li>
            <li>
              {" "}
              <Link className="about-link" to="/about">
                About
              </Link>
            </li>
            <li>
              {" "}
              <Link className="models-link" to="/cars">
                Cars
              </Link>
            </li>
            {/* <li>
              {" "}
              <Link className="testi-link" to="/testimonials">
                Testimonials
              </Link>
            </li>
            <li>
              {" "}
              <Link className="team-link" to="/team">
                Our Team
              </Link>
            </li> */}
            <li>
              {" "}
              <Link className="contact-link" to="/cars/compare">
                Compare Cars
              </Link>
            </li>
            <li>
              {" "}
              <Link className="contact-link" to="/contact">
                Contact
              </Link>
            </li>
          </ul>
          <div className="navbar__buttons">
          {authToken ?(<>
            <Dropdown className="">
              <Dropdown.Toggle className="d-flex align-items-center" style={{backgroundColor: "#ff4d30" ,border:"none" ,color: "white",padding: "1.5rem 2.6rem", borderRadius: "3px",
              boxShadow: "0 5px 10px 0 rgba(255, 83, 48, 0.35)", transition: "all 0.3s",fontSize: "1.6rem",fontFamily: "Rubik" ,fontWeight: "500"}} >
                <i class='bx bxs-user-circle fs-1 mx-2'></i>
                <>{user.name}</>

              </Dropdown.Toggle>
              <Dropdown.Menu className=" fs-4  mx-auto " align={{ lg: 'end' }} style={{width:"10px", borderRadius:"0", }}>
                    <div >
                    <Dropdown.Item className=" text-center " style={{borderBottom:"1px solid #dfdfdf"}}>
                      <Link className="text-dark" to="/profile">
                        Profile
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item className=" text-center ">
                      <Link className="text-dark" onClick={logout} to="/login">
                        Logout
                      </Link>
                    </Dropdown.Item>
                    </div>
                  </ Dropdown.Menu>
            </Dropdown>
            </> ) : (<>
            <Link className="navbar__buttons__sign-in" to="/login">
              Sign In
            </Link>
            <Link className="navbar__buttons__register" to="/signup">
              Register
            </Link>
            </> )}
          </div>

          {/* mobile */}
          <div className="mobile-hamb" onClick={openNav}>
            <i className="fa-solid fa-bars"></i>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
