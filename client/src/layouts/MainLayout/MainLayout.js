import classNames from "classnames/bind";
import styles from "./MainLayout.module.scss";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

const cx = classNames.bind(styles);


function MainLayout() {
    return (
        <div className={cx("wrapper")}>
            <Sidebar />
            <div className={cx("inner")}>
                <Header />
                <div className={cx("content")}></div>
                <Footer />
            </div>
        </div>
    );
}

export default MainLayout;