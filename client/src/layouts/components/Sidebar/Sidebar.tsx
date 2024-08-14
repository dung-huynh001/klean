import React from 'react';
import { Button, Nav, NavItem } from 'reactstrap';
import { Link, useLocation } from 'react-router-dom';
import { UncontrolledCollapse, Card, CardBody } from 'reactstrap';
import Logo from '~/assets/images/logo-brand.jpg';

interface iSubItem {
    title: string;
    href?: string;
}

interface iNavigationItem {
    title: string;
    href?: string;
    icon: string;
    subItems?: iSubItem[];
}

const navigation: iNavigationItem[] = [
    {
        title: "Dashboard",
        href: "/",
        icon: "bi bi-speedometer2",
    },
    {
        title: "Manage Users",
        icon: "bi bi-people",
        subItems: [
            { title: "User List", href: "/userList" },
            { title: "Create User", href: "/createUser" },
            { title: "Update User", href: "/updateUser" },
        ]
    },
];

const Sidebar: React.FC = () => {
    const location = useLocation();

    const showMobileMenu = () => {
        const sidebarElement = document.getElementById("sidebarArea");
        if (sidebarElement) {
            sidebarElement.classList.toggle("showSidebar");
        }
    };

    return (
        <aside className="sidebarArea shadow" id="sidebarArea">
            <div className="p-3">
                <div className="d-flex align-items-center">
                    <div className="d-flex w-100">
                        <div className="d-flex align-items-center gap-2 ">
                            <img 
                                src={Logo} 
                                alt="Logo" 
                                className="rounded-pill" 
                                style={{ height: '50px', objectFit: 'cover' }} 
                            />
                            <h3 className="m-0 fw-bold">CUSC</h3>
                        </div>
                        <span className="ms-auto d-lg-none">
                            <Button
                                close
                                size="sm"
                                className="ms-auto d-lg-none"
                                onClick={showMobileMenu}
                            ></Button>
                        </span>
                    </div>
                </div>
                <div className="pt-4 mt-2">
                    <Nav vertical>
                        {navigation.map((navi, index) => (
                            <NavItem key={index} className="sidenav-bg">
                                {navi.href ? (
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
                                    </Link>
                                ) : (
                                    <div>
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
                                                    {navi.subItems.map((item, idx) => (
                                                        <Link
                                                            key={idx}
                                                            to={item.href || '#'}
                                                            className={
                                                                location.pathname === item.href
                                                                    ? "text-primary nav-link py-3"
                                                                    : "nav-link text-secondary py-3"
                                                            }
                                                        >
                                                            {item.title}
                                                        </Link>
                                                    ))}
                                                </CardBody>
                                            </Card>
                                        </UncontrolledCollapse>
                                    </div>
                                )}
                            </NavItem>
                        ))}
                    </Nav>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
