import { Button, Nav, NavItem } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import {
    UncontrolledCollapse,
    Card,
    CardBody
} from 'reactstrap';

import Logo from "~/assets/images/logo-brand.jpg";

interface iNavigation {
    title: string;
    href?: string;
    icon: string;
    subItems?: Array<{
        title: string;
        href?: string;
    }>
}

const navigation: iNavigation[] = [
    {
        title: "Dashboard",
        href: "/",
        icon: "bi bi-speedometer2",
    },
    {
        title: "Manage Users",
        icon: "bi bi-people",
        subItems: [
            {
                title: "User List",
                href: "/userList"
            },
            {
                title: "Create User",
                href: "/createUser"
            },
            {
                title: "Update User",
                href: "/updateUser"
            },
        ]
    },

];

const Sidebar = () => {
    const showMobilemenu = () => {
        document.getElementById("sidebarArea").classList.toggle("showSidebar");
    };
    let location = useLocation();

    return (
        <aside className="sidebarArea shadow" id="sidebarArea">
            <div className="p-3">
                <div className="d-flex align-items-center">
                    <div className="d-flex w-100">
                        <div className="d-flex align-items-center gap-2 ">
                            <img src={Logo} alt="Logo" className="rounded-pill" style={{
                                height: '50px',
                                objectFit: 'cover'
                            }} />
                            <h3 className="m-0 fw-bold">CUSC</h3>
                        </div>
                        <span className="ms-auto d-lg-none">
                            <Button
                                close
                                size="sm"
                                className="ms-auto d-lg-none"
                                onClick={() => showMobilemenu()}
                            ></Button>
                        </span>
                    </div>

                </div>
                <div className="pt-4 mt-2">
                    <Nav vertical>
                        {navigation.map((navi, index) => (
                            <NavItem key={index} className="sidenav-bg">
                                {
                                    navi.href ?
                                        <Link
                                            to={navi.href}
                                            className={
                                                location.pathname === navi.href
                                                    ? "text-primary nav-link py-3"
                                                    : "nav-link text-secondary py-3"
                                            }
                                        >
                                            <i className={navi.icon}></i>
                                            <span className="ms-3 d-inline-block">{navi.title}</span>
                                        </Link> :
                                        <div className="">
                                            <Button
                                                id={`collapse${index}`}
                                                className="nav-link text-secondary py-3 w-100 text-start btn-collapse"
                                            >
                                                <i className={navi.icon}></i>
                                                <span className="ms-3 d-inline-block">{navi.title}</span>
                                            </Button>
                                            <UncontrolledCollapse toggler={`#collapse${index}`}>
                                                <Card>
                                                    <CardBody>
                                                        {
                                                            navi.subItems.map((item, index) => (
                                                                <Link
                                                                    key={index}
                                                                    to={item.href}
                                                                    className={
                                                                        location.pathname === item.href
                                                                            ? "text-primary nav-link py-3"
                                                                            : "nav-link text-secondary py-3"
                                                                    }
                                                                >
                                                                    {item.title}
                                                                </Link>
                                                            ))
                                                        }
                                                    </CardBody>
                                                </Card>
                                            </UncontrolledCollapse>
                                        </div>
                                }
                            </NavItem>
                        ))}
                        {/* <Button
                            color="danger"
                            tag="a"
                            target="_blank"
                            className="mt-3"
                            href="https://www.wrappixel.com/templates/xtreme-react-redux-admin/?ref=33"
                        >
                            Upgrade To Pro
                        </Button> */}
                    </Nav>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
