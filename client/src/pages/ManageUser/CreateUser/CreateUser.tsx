import { ChangeEvent, FormEvent, useState } from "react";
import classNames from "classnames/bind";
import { toast, ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";

import styles from "./CreateUser.module.scss"
import { address, SuburbType } from "~/pages/Register/data";

const cx = classNames.bind(styles);

type User = {
    userId: number | string;
    userName: string;
    password: string;
    dateOfBirth: string;
    contactMobile: string;
    contactTel: string;
    contactEmail: string;
    userLv: number;
    loginPermit: boolean;
    registerDate: string;
    addressState: string;
    addressSuburb: string;
    addressDetail: string;
    postCode: number | string;
    note: string;
}

const defaultRegisterDate = new Date().toLocaleDateString("fr-CA");

function CreateUser() {
    const [user, setUser] = useState<User>({
        userId: '',
        userName: '',
        password: '',
        dateOfBirth: '',
        contactMobile: '',
        contactTel: '',
        contactEmail: '',
        userLv: 1,
        loginPermit: false,
        registerDate: defaultRegisterDate,
        addressState: '',
        addressSuburb: '',
        addressDetail: '',
        postCode: '',
        note: ''
    });

    const [suburbs, setSuburbs] = useState<Array<SuburbType>>();

    const [submitted, setSubmitted] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const validateFields = (): Boolean => {
        let isValid: boolean = true;
        

        return isValid;
    }

    const changeState = (selectedState: number): void => {
        const filterStates = address.filter(
            (item) => item.id === selectedState
        );
        setSuburbs(filterStates.at(0).suburb);
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === "addressState") {
            changeState(parseInt(value));
            setUser(prev => ({
                ...prev,
                [name]: value,
                addressSuburb: "",
            }));
        } else if (name === "addressSuburb") {
            const { postCode } = suburbs.find((item) => item.id === parseInt(value));
            setUser(prev => ({
                ...prev,
                [name]: value,
                postCode: postCode
            }));
        } else if (name === "loginPermit") {
            setUser(prev => ({
                ...prev,
                loginPermit: !prev.loginPermit
            }));
        } else {
            setUser(prev => ({
                ...prev,
                [name]: value
            }));
        }
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        setSubmitted(true);
        setLoading(true);
        if (validateFields()) {

        }
    }

    return (
        <div className="container p-3 bg-white">
            <div className="row justify-content-center">
                <div className="col-12">
                    <div className="p-3">
                        <form className="form-group" onSubmit={handleSubmit}>
                            <div className="row mb-4 border-top position-relative py-3">
                                <div>
                                    <label className={cx("group-label")}>
                                        Account Information
                                    </label>
                                </div>
                                <div className="col-12 col-md-4">
                                    <label
                                        htmlFor="userId"
                                        className={cx("form-label", "label")}>
                                        User Id <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        id="userId"
                                        type="text"
                                        name="userId"
                                        className="form-control"
                                        autoComplete="off"
                                        maxLength={8}
                                        placeholder="Enter an 8-digit number"
                                        value={user.userId}
                                        onChange={handleChange}
                                    />
                                    {submitted && !user.userId && (
                                        <span className="text-danger form-text">
                                            User Id is required
                                        </span>
                                    )}
                                </div>
                                <div className="col-12 col-md-4">
                                    <label
                                        htmlFor="password"
                                        className={cx("form-label", "label")}>
                                        Password <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        id="password"
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        autoComplete="off"
                                        maxLength={100}
                                        placeholder="Enter 8 - 100 characters"
                                        value={user.password}
                                        onChange={handleChange}
                                    />
                                    {submitted && !user.password && (
                                        <span className="text-danger form-text">
                                            Password is required
                                        </span>
                                    )}
                                </div>
                                <div className="col-12 col-md-4 ms-auto">
                                    <label
                                        htmlFor="registerDate"
                                        className={cx("form-label", "label")}>
                                        Register Date <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        id="registerDate"
                                        type="date"
                                        name="registerDate"
                                        className="form-control"
                                        autoComplete="off"
                                        value={user.registerDate}
                                        onChange={handleChange}
                                    />
                                    {submitted && !user.registerDate && (
                                        <span className="text-danger form-text">
                                            Register Date is required
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="row mb-4 border-top position-relative py-3">
                                <div>
                                    <label className={cx("group-label")}>
                                        User Detail
                                    </label>
                                </div>
                                <div className="col-12 col-md-8">
                                    <label
                                        htmlFor="username"
                                        className={cx("form-label", "label")}>
                                        Username <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        id="username"
                                        type="text"
                                        name="username"
                                        className="form-control"
                                        autoComplete="off"
                                        maxLength={20}
                                        placeholder="Enter 8 - 20 characters"
                                        value={user.userName}
                                        onChange={handleChange}
                                    />
                                    {submitted && !user.userName && (
                                        <span className="text-danger form-text">
                                            Username is required
                                        </span>
                                    )}
                                </div>
                                <div className="col-12 col-md-4 ms-auto">
                                    <label
                                        htmlFor="dateOfBirth"
                                        className={cx("form-label", "label")}>
                                        Date Of Birth <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        id="dateOfBirth"
                                        type="date"
                                        name="dateOfBirth"
                                        className="form-control"
                                        autoComplete="off"
                                        value={user.dateOfBirth}
                                        onChange={handleChange}
                                    />
                                    {submitted && !user.dateOfBirth && (
                                        <span className="text-danger form-text">
                                            Date Of Birth is required
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="row mb-4 border-top position-relative py-3">
                                <div>
                                    <label className={cx("group-label")}>Contacts</label>
                                </div>
                                <div className="col-12 col-md-4">
                                    <label
                                        htmlFor="mobile"
                                        className={cx("form-label", "label")}>
                                        Mobile
                                    </label>
                                    <input
                                        id="mobile"
                                        type="text"
                                        name="mobile"
                                        className="form-control"
                                        autoComplete="off"
                                        placeholder="Enter mobile"
                                        value={user.contactMobile}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-12 col-md-4">
                                    <label
                                        htmlFor="tel"
                                        className={cx("form-label", "label")}>
                                        Tel
                                    </label>
                                    <input
                                        id="tel"
                                        type="text"
                                        name="tel"
                                        className="form-control"
                                        autoComplete="off"
                                        placeholder="Enter tel"
                                        value={user.contactTel}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-12 col-md-4">
                                    <label
                                        htmlFor="email"
                                        className={cx("form-label", "label")}>
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        type="text"
                                        name="email"
                                        className="form-control"
                                        autoComplete="off"
                                        placeholder="Enter email"
                                        value={user.contactEmail}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="row mb-4 border-top position-relative py-3">
                                <div>
                                    <label className={cx("group-label")}>Address</label>
                                </div>
                                <div className="col-12 col-md-4">
                                    <label
                                        htmlFor="addressState"
                                        className={cx("form-label", "label")}>
                                        State
                                    </label>
                                    <select
                                        id="state"
                                        name="addressState"
                                        className="form-select"
                                        value={user.addressState}
                                        onChange={handleChange}>
                                        <option value="" hidden>
                                            --Select--
                                        </option>
                                        {
                                            address.map((item) => (
                                                <option key={item.id} value={item.id}>{item.state}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="col-12 col-md-4">
                                    <label
                                        htmlFor="addressSuburb"
                                        className={cx("form-label", "label")}>
                                        Suburb
                                    </label>
                                    <select
                                        id="suburb"
                                        name="addressSuburb"
                                        className="form-select"
                                        value={user.addressSuburb}
                                        onChange={handleChange}>
                                        <option value="" hidden>
                                            --Select--
                                        </option>
                                        {
                                            suburbs && suburbs.map((item) => (
                                                <option key={item.id} value={item.id}>{item.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="col-12 col-md-4">
                                    <label
                                        htmlFor="postCode"
                                        className={cx("form-label", "label")}>
                                        Post Code
                                    </label>
                                    <input
                                        id="postCode"
                                        type="text"
                                        name="postCode"
                                        className="form-control"
                                        value={user.postCode}
                                        placeholder="Post Code will be auto-filled"
                                        disabled
                                        readOnly
                                        style={{
                                            userSelect: "none",
                                            caretColor: "transparent",
                                        }}
                                        autoComplete="off"
                                    />
                                </div>
                                <div className="col-12">
                                    <label
                                        htmlFor="addressDetail"
                                        className={cx("form-label", "label")}>
                                        Address Detail
                                    </label>
                                    <input
                                        id="addressDetail"
                                        type="text"
                                        name="addressDetail"
                                        className="form-control"
                                        placeholder="Enter address detail"
                                        value={user.addressDetail}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="row mb-4 border-top position-relative py-3">
                                <div>
                                    <label className={cx("group-label")}>Permits</label>
                                </div>
                                <div className="col-12 col-md-4">
                                    <label
                                        htmlFor="userLv"
                                        className={cx("form-label", "label")}>
                                        User Level <span className="text-danger">*</span>
                                    </label>
                                    <select
                                        id="userLv"
                                        name="userLv"
                                        className="form-select"
                                        value={user.userLv}
                                        onChange={handleChange}>
                                        <option value="" hidden>
                                            --Select--
                                        </option>
                                        <option value="1">Level 1</option>
                                        <option value="2">Level 2</option>
                                        <option value="3">Level 3</option>
                                    </select>
                                </div>
                                <div className="col-12 col-md-4">
                                    <label
                                        className={cx("form-label", "label")}>
                                        Login Permit <span className="text-danger">*</span>
                                    </label>
                                    <div className="form-check form-switch">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="loginPermit"
                                            name="loginPermit"
                                            onChange={handleChange}
                                            checked={user.loginPermit} />
                                        <label
                                            className="form-check-label"
                                            htmlFor="loginPermit"
                                        >
                                            {
                                                user.loginPermit ? "On" : "Off"
                                            }
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className={cx(
                                    "btn btn-primary w-100 mt-3",
                                    "btn-submit"
                                )}
                                disabled={loading}>
                                {loading && <FontAwesomeIcon icon={faSync} spin />} Sign
                                Up
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer theme="colored" />
        </div>
    );
}

export default CreateUser;