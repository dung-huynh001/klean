import classNames from "classnames/bind";
import styles from "./MainLayout.module.scss";
import Header from "../components/Header";
import Sidebar2 from "../components/Sidebar/Sidebar2";
import Footer from "../components/Footer";

const cx = classNames.bind(styles);


function MainLayout({ children }) {
    return (
        <div className={cx("wrapper", "d-flex")}>
            <Sidebar2 />
            <main className={cx("inner", "flex-fill")}>
                <Header />
                <div className={cx("content", "container position-relative")}> {children} </div>
                <Footer />
            </main>
        </div>
    );
}

export default MainLayout;