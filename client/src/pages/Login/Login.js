import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./Login.module.scss";
import { login } from "~/redux/actions/authActions";

const cx = classNames.bind(styles);

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.registerSuccess) {
      toast.success("Registration successful! Please login.");
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate, location.pathname]);

  const notify = (type, msg) => toast[type](msg);

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (!credentials.username || !credentials.password) {
      return;
    }
    setLoading(true);
    try {
      const res = await dispatch(login(credentials));
      if (res && res.payload) {
        navigate("/");
      }
    } catch (err) {
      if (err.Message) {
        notify("warning", err.Message);
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
            <div className="col-md-8 col-lg-6 col-xl-5">
              <div className="card mt-4">
                <div className="card-body p-4">
                  <div className="text-center">
                    <h5 className="text-primary fw-bold">Welcome Back</h5>
                  </div>
                  <div className="p-2 mt-3">
                    <form className="form-group">
                      <div className="mb-3">
                        <label
                          htmlFor="username"
                          className={cx("form-label", "label")}>
                          Username
                        </label>
                        <input
                          id="username"
                          type="text"
                          name="username"
                          className="form-control"
                          value={credentials.username}
                          onChange={(e) => handleChange(e)}
                          autoComplete="off"
                        />
                        {submitted && !credentials.username && (
                          <span className="text-danger form-text">
                            Username is required
                          </span>
                        )}
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="password"
                          className={cx("form-label", "label")}>
                          Password
                        </label>
                        <input
                          id="password"
                          type="password"
                          name="password"
                          className="form-control"
                          value={credentials.password}
                          onChange={(e) => handleChange(e)}
                          autoComplete="off"
                        />
                        {submitted && !credentials.password && (
                          <span className="text-danger form-text">
                            Password is required
                          </span>
                        )}
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
                        In
                      </button>
                      <div className="d-flex justify-content-center">
                        <p className="mt-4">
                          Don't have an account ?{" "}
                          <Link to="/register" className="fw-bold">
                            Sign Up
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

export default Login;
