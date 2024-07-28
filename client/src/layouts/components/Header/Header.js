import { useState } from "react";
import { useDispatch } from "react-redux";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';

import { getToken, decodeToken } from "~/core/services/common/tokenService";
import styles from "./Header.module.scss";
import { logout } from "~/redux/actions/authActions";

const cx = classNames.bind(styles);

function Header() {
  const token = getToken();
  const userDetail = decodeToken(token);

  const dispatch = useDispatch();

  const handleLogOut = async () => {
    dispatch(logout());
  }

  return (
    <header className="position-relative px-3 top-0 w-100 bg-white">
      <div
        className="d-flex justify-content-between align-items-center"
        style={{
          minHeight: "60px",
        }}>
        <div className={cx("search")}>
          <FontAwesomeIcon icon={faSearch} className={cx("search-icon")} />
          <input
            className={cx("search-input")}
            type="text"
            placeholder="Search..."
          />
        </div>
        <Tippy
          interactive={true}
          render={attrs =>
          (
            <ul
              className={cx("user-dropdown", "d-flex flex-column gap-2 p-2 rounded")}
              tabIndex="-1" {...attrs}>
              <li className={cx("user-item", "p-2 rounded")} onClick={() => handleLogOut()}>Sign out</li>
            </ul>
          )}>
          <div className={cx("d-flex align-items-center gap-2")}>
            <FontAwesomeIcon icon={faUser} className={cx("user-icon")} />
            <p className={cx("m-0")}>Hello, {userDetail.name}</p>
          </div>
        </Tippy>
      </div>
    </header>
  );
}

export default Header;
