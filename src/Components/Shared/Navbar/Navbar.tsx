import React, { useContext, useState } from "react";
import {
  Navbar,
  Nav,
  NavbarBrand,
  NavItem,
  Button,
  NavbarToggler,
  Collapse,
} from "reactstrap";
import classes from "./Navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faBars,
  faTv,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { auth } from "../../../firebase/firebase";
import { AuthContext } from "../../../contexts/auth.context";
import { useHistory } from "react-router-dom";
const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const toggle = () => setIsOpen(!isOpen);
  const history = useHistory();
  const handleSignOut = async () => {
    await auth.signOut();
  };
  if (!currentUser) return <div></div>;
  return (
    <>
      <Navbar color="dark" expand="md">
        <NavbarBrand className={classes.NavLink}>Netflix</NavbarBrand>
        <NavbarToggler onClick={toggle} style={{ color: "whitesmoke" }}>
          <FontAwesomeIcon icon={faBars} />
        </NavbarToggler>
        <Collapse
          isOpen={isOpen}
          navbar
          style={{ textAlign: "right", flexDirection: "row-reverse" }}>
          <Nav style={{ textAlign: "right" }}>
            <NavItem className={classes.NavLink}>
              <Button
                onClick={() => history.push({ pathname: `/homepage` })}
                style={{ backgroundColor: "transparent", border: "none" }}>
                <FontAwesomeIcon icon={faHome} />
                {"  "}Home
              </Button>
              <Button
                onClick={() =>
                  history.push({ pathname: `/watchlist/${currentUser.uid}` })
                }
                style={{ backgroundColor: "transparent", border: "none" }}>
                <FontAwesomeIcon icon={faTv} />
                {"  "}Watchlist
              </Button>
            </NavItem>
            <NavItem className={classes.NavLink}>
              <Button
                onClick={handleSignOut}
                style={{ backgroundColor: "transparent", border: "none" }}>
                <FontAwesomeIcon icon={faSignOutAlt} />
                {"  "}Sign Out
              </Button>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </>
  );
};

export default NavBar;
