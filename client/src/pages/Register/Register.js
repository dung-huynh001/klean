import { useState } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./Register.module.scss";
import { address as data } from "./data";
import axiosInstance from "~/utils/request";

const cx = classNames.bind(styles);

const defaultRegisterDate = new Date().toLocaleDateString("fr-CA");

const requiredFields = [
  "username",
  "password",
  "userId",
  "userLv",
  "loginPermit",
  "registerDate",
];

function Register() {
  const navigate = useNavigate();
  const notify = (type, msg) => toast[type](msg);

  const addressData = data;

  const [suburbs, setSuburbs] = useState([]);

  const [accountInformation, setAccountInformation] = useState({
    userId: "",
    password: "",
    registerDate: defaultRegisterDate,
  });

  const [userDetail, setUserDetail] = useState({
    username: "",
    dateOfBirth: "1990-01-01",
  });

  const [contact, setContact] = useState({
    mobile: "",
    tel: "",
    email: "",
  });

  const [address, setAddress] = useState({
    state: "",
    suburb: "",
    postCode: "",
    addressDetail: "",
  });

  const [permits, setPermits] = useState({
    userLv: 2,
    loginPermit: 2,
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAccountInformationChange = (e) => {
    setAccountInformation({
      ...accountInformation,
      [e.target.name]: e.target.value,
    });
  };

  const handleUserDetailChange = (e) => {
    setUserDetail({
      ...userDetail,
      [e.target.name]: e.target.value,
    });
  };

  const handleContactChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    });
  };

  const handleStateChange = (value) => {
    const filterStates = addressData.filter(
      (item) => item.id === parseInt(value)
    );
    setSuburbs(filterStates.at(0).suburb);
    setAddress({
      ...address,
      state: value,
      suburb: "",
      postCode: "",
    });
  };

  const handleSuburbChange = (value) => {
    const filterSuburbs = suburbs.filter((item) => item.id === parseInt(value));
    console.log(filterSuburbs);
    setAddress({
      ...address,
      suburb: filterSuburbs.at(0).id,
      postCode: filterSuburbs.at(0).postCode,
    });
  };

  const handleAddressDetailChange = (e) => {
    setAddress({
      ...address,
      addressDetail: e.target.value,
    });
  };

  const handlePermitsChange = (e) => {
    setPermits({
      ...permits,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const registerData = {
      ...accountInformation,
      ...userDetail,
      ...contact,
      ...address,
      ...permits,
      userId: parseInt(accountInformation.userId),
      postCode: address.postCode === "" ? 0 : parseInt(address.postCode),
      loginPermit: permits.loginPermit === 1,
      userLv: parseInt(permits.userLv),
    };
    console.log(registerData);
    setSubmitted(true);
    const hasEmptyRequiredField = requiredFields.some(
      (field) =>
        registerData[field] === null ||
        registerData[field] === undefined ||
        registerData[field] === ""
    );
    if (hasEmptyRequiredField) {
      notify("warning", "Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      const res = await axiosInstance.post("Auth/Register", registerData, {});
      if (res) {
        notify("success", "User account registration successful");
        navigate("/login", { state: { registerSuccess: true } });
      } else {
        notify("warning", "Something went wrong");
      }
    } catch (err) {
      console.log(">>> Register check:", err);
      if (err.data && err.data.Message) {
        notify("warning", err.data.Message);
      } else {
        notify("error", "Unable to connect to server");
      }
    }
    setLoading(false);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("auth-bg", "auth-bg-position")}>
        <div className={cx("auth-bg-overlay")}></div>
        <div className={cx("shape")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="0 0 1440 120">
            <path d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z"></path>
          </svg>
        </div>
      </div>
      <div className={cx("content")}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="text-center mt-sm-5 mb-4">
                <h2 className={cx("auth-logo")}>KLEAN</h2>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10">
              <div className="card mt-4">
                <div className="card-body p-4">
                  <div className="text-center">
                    <h5 className="text-primary fw-bold text-capitalize">
                      Create new account
                    </h5>
                  </div>
                  <div className="p-2 mt-4">
                    <form className="form-group">
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
                            value={accountInformation.userId}
                            onChange={(e) => handleAccountInformationChange(e)}
                          />
                          {submitted && !accountInformation.userId && (
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
                            value={accountInformation.password}
                            onChange={(e) => handleAccountInformationChange(e)}
                          />
                          {submitted && !accountInformation.password && (
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
                            value={accountInformation.registerDate}
                            onChange={(e) => handleAccountInformationChange(e)}
                          />
                          {submitted && !accountInformation.registerDate && (
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
                            value={userDetail.username}
                            onChange={(e) => handleUserDetailChange(e)}
                          />
                          {submitted && !userDetail.username && (
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
                            value={userDetail.dateOfBirth}
                            onChange={(e) => handleUserDetailChange(e)}
                          />
                          {submitted && !userDetail.dateOfBirth && (
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
                            value={contact.mobile}
                            onChange={(e) => handleContactChange(e)}
                          />
                          {/*submitted && !contact.mobile && (
                            <span className="text-danger form-text">
                              Mobile is required
                            </span>
                          )*/}
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
                            value={contact.tel}
                            onChange={(e) => handleContactChange(e)}
                          />
                          {/*submitted && !contact.tel && (
                            <span className="text-danger form-text">
                              Tel is required
                            </span>
                          )*/}
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
                            value={contact.email}
                            onChange={(e) => handleContactChange(e)}
                          />
                          {/*submitted && !contact.email && (
                            <span className="text-danger form-text">
                              Email is required
                            </span>
                          )*/}
                        </div>
                      </div>
                      <div className="row mb-4 border-top position-relative py-3">
                        <div>
                          <label className={cx("group-label")}>Address</label>
                        </div>
                        <div className="col-12 col-md-4">
                          <label
                            htmlFor="state"
                            className={cx("form-label", "label")}>
                            State
                          </label>
                          <select
                            id="state"
                            name="state"
                            className="form-select"
                            value={address.state}
                            onChange={(e) => handleStateChange(e.target.value)}>
                            <option value="" hidden>
                              Choose
                            </option>
                            {addressData.map((item) => (
                              <option key={item.id} value={item.id}>
                                {item.state}
                              </option>
                            ))}
                          </select>
                          {/*submitted && address.state === "" && (
                            <span className="text-danger form-text">
                              State is required
                            </span>
                          )*/}
                        </div>
                        <div className="col-12 col-md-4">
                          <label
                            htmlFor="suburb"
                            className={cx("form-label", "label")}>
                            Suburb
                          </label>
                          <select
                            id="suburb"
                            name="suburb"
                            className="form-select"
                            value={address.suburb}
                            onChange={(e) =>
                              handleSuburbChange(e.target.value)
                            }>
                            <option value="" hidden>
                              Choose
                            </option>
                            {suburbs.map((item) => (
                              <option key={item.id} value={item.id}>
                                {item.name}
                              </option>
                            ))}
                          </select>
                          {/*submitted && address.suburb === "" && (
                            <span className="text-danger form-text">
                              Suburb is required
                            </span>
                          )*/}
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
                            value={address.postCode}
                            disabled
                            readOnly
                            tabIndex="-1"
                            style={{
                              userSelect: "none",
                              caretColor: "transparent",
                            }}
                            autoComplete="off"
                          />
                          {/*submitted && !address.postCode && (
                            <span className="text-danger form-text">
                              Post Code is required
                            </span>
                          )*/}
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
                            value={address.addressDetail}
                            onChange={(e) => handleAddressDetailChange(e)}
                          />
                          {/*submitted && !address.addressDetail && (
                            <span className="text-danger form-text">
                              Suburb is required
                            </span>
                          )*/}
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
                            value={permits.userLv}
                            onChange={(e) => handlePermitsChange(e)}>
                            <option value="" hidden>
                              Choose
                            </option>
                            <option value="1">Level 1</option>
                            <option value="2">Level 2</option>
                            <option value="3">Level 3</option>
                          </select>
                          {/*submitted && permits.userLv === "" && (
                            <span className="text-danger form-text">
                              User Level is required
                            </span>
                          )*/}
                        </div>
                        <div className="col-12 col-md-4">
                          <label
                            htmlFor="loginPermit"
                            className={cx("form-label", "label")}>
                            Login Permit <span className="text-danger">*</span>
                          </label>
                          <select
                            id="loginPermit"
                            name="loginPermit"
                            className="form-select"
                            value={permits.loginPermit}
                            onChange={(e) => handlePermitsChange(e)}>
                            <option value="" hidden>
                              Choose
                            </option>
                            <option value="1">On</option>
                            <option value="2">Off</option>
                          </select>
                          {/*submitted && permits.loginPermit === "" && (
                            <span className="text-danger form-text">
                              Login Permit is required
                            </span>
                          )*/}
                        </div>
                      </div>
                      <button
                        type="submit"
                        className={cx(
                          "btn btn-success w-100 mt-3",
                          "btn-submit"
                        )}
                        disabled={loading}
                        onClick={(e) => handleSubmit(e)}>
                        {loading && <FontAwesomeIcon icon={faSync} spin />} Sign
                        Up
                      </button>
                      <div className="d-flex justify-content-center">
                        <p className="mt-4">
                          Already have an account ?{" "}
                          <Link to="/login" className="fw-bold">
                            Sign In
                          </Link>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer theme="colored" />
    </div>
  );
}

export default Register;
