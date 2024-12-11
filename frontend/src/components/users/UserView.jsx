import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

export default function UserView() {
  const { users } = useSelector((state) => state.usersList);
  const [user, setUser] = useState(null);
  let { id } = useParams();

  useEffect(() => {
    const userItem = users.find((item) => item._id === id);
    if (userItem !== -1) {
      setUser(userItem);
    }
    // console.log('useEffect ', userItem);
  }, []);

  return (
    <>
      {user && (
        <>
          <div className="user-view">
            <h1>Данные пользователя</h1>
          </div>
          <br />
          <div className="user-view">
            <span className="bold">ID: </span>
            {user._id}
          </div>
          <div className="user-view">
            <span className="bold">Имя: </span>
            {user.name}
          </div>
          <div className="user-view">
            <span className="bold">Email: </span>
            {user.email}
          </div>
          <div className="user-view">
            <span className="bold">Тел.: </span>
            {user.contactPhone}
          </div>
          <div className="user-view">
            <span className="bold">Роль.: </span>
            {user.role}
          </div>
        </>
      )}
    </>
  );
}