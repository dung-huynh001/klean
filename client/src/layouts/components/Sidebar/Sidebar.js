import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faThumbTack } from "@fortawesome/free-solid-svg-icons";

import styles from "./Sidebar.modules.scss";
import logoBrand from "~/assets/images/logo-brand.jpg";

const cx = classNames.bind(styles);
function Sidebar() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(true);
  const [iconPin, setIconPin] = useState(faThumbTack);

  const handleIconClick = () => {
    setShowMenu(!showMenu);
    setIconPin(() => {
      return iconPin === faBars ? faThumbTack : faBars;
    });
  };

  return (
    <aside
      className={cx("wrapper", {
        show: showMenu,
      })}>
      <div className={cx("inner", "position-relative")}>
        <div
          className={cx("brand")}
          onClick={() => {
            navigate("/");
          }}>
          <img src={logoBrand} alt="logo-brand" />
          <h3 className="fw-bold">
            CUSC
          </h3>
        </div>
        <div className={cx("icon", "position-absolute top-0 end-0")}>
          <button
            className={cx("btn text-white")}
            onClick={() => handleIconClick()}>
            <FontAwesomeIcon icon={iconPin} />
          </button>
        </div>
        <ul className="d-flex flex-column gap-2">
          <li><Link>Manage Users</Link></li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
