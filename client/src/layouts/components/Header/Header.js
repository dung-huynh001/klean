import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const cx = classNames.bind(styles);

function Header() {
  return (
    <header className="position-absolute px-3 top-0 w-100 bg-white">
      <div
        className="d-flex justify-content-between align-items-center"
        style={{
          minHeight: "50px",
        }}>
        <div className={cx("search")}>
          <FontAwesomeIcon icon={faSearch} className={cx("search-icon")}/>
          <input
            className={cx("search-input")}
            type="text"
            placeholder="Search..."
          />
        </div>
        <div className="">Powered by CUSC - ITO</div>
      </div>
    </header>
  );
}

export default Header;
