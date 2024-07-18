import { useState } from 'react'
import classNames from "classnames/bind";
import styles from "./MainLayout.module.scss";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { getToken } from "~/core/services/common/tokenService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { get } from '~/core/services/common';

const cx = classNames.bind(styles);


function MainLayout() {
    const token = getToken();
    const [usrLv, setUsrLv] = useState(0);
    const notify = (type, msg) => toast[type](msg);

    const handleCheckClick = async (e) => {
        e.preventDefault();
        if (usrLv === 0) {
            notify("warning", "Please choose UserLv");
            return;
        }
        try {
            const res = await get(`Auth/TestTokenUserLv${usrLv}`, {});
            notify("success", "Authorization successful");

        } catch (e) {
            notify("error", "Authorization failed");
        }
    }
    return (
        <div className={cx("wrapper", "d-flex")}>
            <Sidebar />
            <main className={cx("inner", "flex-fill")}>
                <Header />
                <div className={cx("content", "container position-relative p-3 bg-white m-2 flex-1")}>
                    <div className="card">
                        <h5 className="card-title p-2">Token & Authorization</h5>
                        <hr />
                        <div className="card-body" style={{ minHeight: "60vh" }}>
                            <div>
                                <label className="form-label">Token:</label>
                                <p>{token}</p>
                            </div>
                            <form className="d-flex gap-3">
                                <div className="form-group">
                                    <select className="form-select"
                                        value={usrLv}
                                        onChange={(e) => setUsrLv(e.target.value)}
                                    >
                                        <option value="0" hidden>Choose UserLv</option>
                                        <option value="1">Lv1</option>
                                        <option value="2">Lv2</option>
                                        <option value="3">Lv3</option>
                                    </select>

                                </div>
                                <div className="">
                                    <button
                                        type="submit"
                                        className="btn btn-outline-primary"
                                        onClick={(e) => { handleCheckClick(e) }}
                                    >
                                        Check
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <Footer />
            </main>
            <ToastContainer theme="colored" />
        </div>
    );
}

export default MainLayout;