import { useState } from "react";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import styles from "./Sidebar.modules.scss";
import logoBrand from "~/assets/images/logo-brand.jpg";


const cx = classNames.bind(styles);
function Sidebar() {
    const [showMenu, setShowMenu] = useState(true);

    return (
        <sidebar className={cx("wrapper", {
            "show": showMenu
        })}>
            <div className={cx("inner", "position-relative")}>
                <div className={cx("brand")}>
                    <img src={logoBrand} alt="logo-brand" />
                </div>
                <div className={cx("icon", "position-absolute top-0 end-0")}>
                    <button
                        className={cx("btn text-white")}
                        onClick={() => setShowMenu(!showMenu)}>
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                </div>
            </div>
        </sidebar>
    );
}

export default Sidebar;