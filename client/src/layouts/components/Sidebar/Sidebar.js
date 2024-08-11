import { Button, Nav, NavItem } from "reactstrap";
import { Link, useLocation } from "react-router-dom";

import Logo from "~/assets/images/logo-brand.jpg";

const navigation = [
    {
        title: "Dashboard",
        href: "/",
        icon: "bi bi-speedometer2",
    },
    {
        title: "Alert",
        href: "/alerts",
        icon: "bi bi-bell",
    },
    {
        title: "Badges",
        href: "/badges",
        icon: "bi bi-patch-check",
    },
    {
        title: "Buttons",
        href: "/buttons",
        icon: "bi bi-hdd-stack",
    },
    {
        title: "Cards",
        href: "/cards",
        icon: "bi bi-card-text",
    },
    {
        title: "Grid",
        href: "/grid",
        icon: "bi bi-columns",
    },
    {
        title: "Table",
        href: "/table",
        icon: "bi bi-layout-split",
    },
    {
        title: "Forms",
        href: "/forms",
        icon: "bi bi-textarea-resize",
    },
    {
        title: "Breadcrumbs",
        href: "/breadcrumbs",
        icon: "bi bi-link",
    },
    {
        title: "About",
        href: "/about",
        icon: "bi bi-people",
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
                            </NavItem>
                        ))}
                        <Button
                            color="danger"
                            tag="a"
                            target="_blank"
                            className="mt-3"
                            href="https://www.wrappixel.com/templates/xtreme-react-redux-admin/?ref=33"
                        >
                            Upgrade To Pro
                        </Button>
                    </Nav>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
