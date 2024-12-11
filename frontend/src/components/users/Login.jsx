import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actUserError, actUserLogin } from "../../store/actions/actionCreators";
import { useNavigate } from "react-router-dom";
import WinError from "../Error";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailStyle, setEmailStyle] = useState({});
  const { user, userError } = useSelector((state) => state.crUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //====================================
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  //====================================
  function hendlerSubmit(event) {
    event.preventDefault();
    if (!isValidEmail(email)) {
      console.error("Неверный email!!!");
      dispatch(
        actUserError({
          statusCode: 400,
          message: "Не верный формат E-mail",
        }),
      );
      return;
    }
    dispatch(actUserLogin({ email, password }));
  }

  //====================================
  function clearFields() {
    setEmail("");
    setPassword("");
  }

  //==========================================
  function isValidEmail(email) {
    return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email,
    );
  }
  //====================================
  function checkEmail(e) {
    if (!isValidEmail(e.target.value)) {
      // setError('Email is invalid');
      setEmailStyle({ border: "2px solid red", outline: "none" });
    } else {
      // setError(null);
      setEmailStyle({ border: "2px solid green", outline: "none" });
    }

    setEmail(e.target.value);
  }

  //====================================
  return (
    <>
      {userError && (
        <WinError type={userError.type} clearFields={clearFields}>
          {userError.text}
        </WinError>
      )}
      <div className="mainpage">
        <div className="home flex-col">
          <div className="cl-black">
            <h1 className="title-login">Войдите в систему</h1>
          </div>
          <form className="flex-col">
            <div className="pol">
              <span className="input-span">email</span>
              <input
                className="login-input"
                style={emailStyle}
                type="email"
                value={email}
                onChange={(e) => checkEmail(e)}
              />
            </div>
            <div>
              <span className="input-span">Пароль</span>
              <input
                className="login-input"
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              onClick={hendlerSubmit}
              type="submit"
              className="form-button"
            >
              Войти
            </button>
          </form>
        </div>
      </div>
    </>
  );
}