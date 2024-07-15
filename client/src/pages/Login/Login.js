import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Login.module.scss";
import { login } from "~/redux/actions/authActions";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

function Login() {
  const navigate = useNavigate();
  const notify = (msg) => toast.warning(msg);

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
    const res = await dispatch(login(credentials));
    if (res && res.payload) {
      navigate("/");
    } 
    console.log(res);
    setLoading(false);
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('auth-bg', 'auth-bg-position')}>
        <div className={cx("auth-bg-overlay")}></div>
        <div className={cx("shape")}>
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1440 120">
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
                    <h5 className="text-primary">Welcome to KLEAN</h5>
                  </div>
                  <div className="p-2 mt-3">
                    <form className="form-group">
                      <div className="mb-3">
                        <label htmlFor="username" className="form-label">
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
                        <label htmlFor="password" className="form-label">
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
                        className="btn btn-success w-100 mt-3"
                        disabled={loading}
                        onClick={(e) => handleSubmit(e)}>
                        {loading && <FontAwesomeIcon icon={faSync} spin />} Sign In
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    </div >
  );
}

export default Login;
