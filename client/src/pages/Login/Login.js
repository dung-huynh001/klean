import { useState } from "react";
import { useDispatch } from "react-redux";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Login.module.scss";
import { login } from "~/redux/actions/authActions";
import { faSync } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function Login() {
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
    console.log(res);
    setLoading(false);
  };

  return (
    <div className={cx("container")}>
      <div>
        <form className={cx("form-group")}>
          <div className={cx("mb-3")}>
            <label htmlFor="username" className={cx("form-label")}>
              Username
            </label>
            <input
              id="username"
              type="text"
              name="username"
              className={cx("form-control")}
              onChange={(e) => handleChange(e)}
              autoComplete="off"
            />
            {submitted && !credentials.username && (
              <span className={cx("text-danger form-text")}>
                Username is required
              </span>
            )}
          </div>
          <div className={cx("mb-3")}>
            <label htmlFor="password" className={cx("form-label")}>
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              className={cx("form-control")}
              onChange={(e) => handleChange(e)}
              autoComplete="off"
            />
            {submitted && !credentials.password && (
              <span className={cx("text-danger form-text")}>
                Password is required
              </span>
            )}
          </div>
          <button
            type="submit"
            className={cx("btn btn-success")}
            onClick={(e) => handleSubmit(e)}>
            {loading && <FontAwesomeIcon icon={faSync} spin />} Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
