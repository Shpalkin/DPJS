import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  actRegRoomsClear,
  actRegRoomsList,
  actUserLogout,
} from "../store/actions/actionCreators";

export default function Header() {
  const { user } = useSelector((state) => state.crUser);
  const { regRooms, addRegRooms } = useSelector((state) => state.regrooms);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //===================================
  useEffect(() => {
    // console.log("useEffect in HEADER");
    if (user && user.role === "client") {
      // console.log("useEffect in HEADER 2  ");
      dispatch(actRegRoomsList(user._id));
    }
  }, [user, addRegRooms]);

  //===================================
  function fnLogout(event) {
    event.preventDefault();
    dispatch(actUserLogout());
    dispatch(actRegRoomsClear());
    navigate("/");
  }

  //===================================
  function fnRegRooms() {
    console.log("RegRooms", regRooms);
  }

  //============================================================
  return (
    <>
      <header className="header-container">
        <Link className="logo-link" to="/">
          <div className="logo-img">
            {/* <img className="logo-img" src={logo} /> */}
          </div>
        </Link>

        <div className="header-main">
          <div>
            <Link className="header-nav-link" to="/">
              Главная
            </Link>
          </div>
          {/* <div>
            <button onClick={fnRegRooms}>books</button>
            <h2>{regRooms?.length}</h2>
          </div> */}

          {user ? (
            <div className="header-user-wrap">
              {user?.role === "client" && (
                <Link className="header-nav-link" to="/reservations">
                  Бронирования
                </Link>
              )}
              <span className="header-user">{user.name}</span>
              <span className="header-nav-link" onClick={fnLogout}>
                Выйти
              </span>
            </div>
          ) : (
            <div className="header-user-wrap">
              <Link className="header-nav-link" to="/signup">
                <span>Регистрация</span>
              </Link>
              <Link className="header-nav-link" to="/signin">
                <span>Войти</span>
              </Link>
            </div>
          )}
        </div>
      </header>
    </>
  );
}