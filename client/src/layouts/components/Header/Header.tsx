import React from "react";
import { useDispatch } from "react-redux";
import {
  Navbar,
  Collapse,
  NavbarBrand,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from "reactstrap";
import Logo from "~/assets/images/logo-brand.jpg";
import user from "~/assets/images/default-user.jpg";
import { logout } from "~/redux/actions/authActions";
import { getToken, decodeToken } from "~/core/services/common/tokenService";


const Header = () => {
  const token = getToken();
  const userInfo = decodeToken(token);

  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };

  const dispatch = useDispatch<any>();

  const handleLogout = async () => {
    await dispatch(logout());
  }

  return (
    <Navbar color="primary" dark expand="md">
      <div className="d-flex align-items-center">
        <NavbarBrand href="/" className="d-lg-none" >
          <img src={Logo} alt="Logo" className="rounded-pill" style={{
            width: '50px',
            objectFit: 'cover'
          }} />
        </NavbarBrand>
        <Button
          color="primary"
          className="d-lg-none"
          onClick={() => showMobilemenu()}
        >
          <i className="bi bi-list"></i>
        </Button>
      </div>
      <div className="hstack gap-2">
        <Button
          color="primary"
          size="sm"
          className="d-sm-block d-md-none"
          onClick={Handletoggle}
        >
          {isOpen ? (
            <i className="bi bi-x"></i>
          ) : (
            <i className="bi bi-three-dots-vertical"></i>
          )}
        </Button>
      </div>

      <Collapse navbar isOpen={isOpen}>
        <Dropdown isOpen={dropdownOpen} toggle={toggle} className="ms-auto">
          <DropdownToggle color="primary" className="d-flex justify-content-center align-items-center gap-3">
            <img
              src={user}
              alt="profile"
              className="rounded-circle"
              width="30"
            ></img>
            <span>Hello, {userInfo.name}</span>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem href={`/profile/${userInfo.nameidentifier}`}>Profile</DropdownItem>
            <DropdownItem divider></DropdownItem>
            <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Collapse>
    </Navbar>
  );
};

export default Header;
