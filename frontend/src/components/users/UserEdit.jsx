import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { actUsersUpdate } from "../../store/actions/actionCreators";

export default function UserEdit() {
  const { users } = useSelector((state) => state.usersList);
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("client");
  let { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const userItem = users.find((item) => item._id === id);
    if (userItem !== -1) {
      setUser(userItem);
    }
  }, []);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setPhone(user.contactPhone);
      setRole(user.role);
    }
  }, [user]);

  function fnFormHandler(event) {
    event.preventDefault();
    const formObj = {
      id,
      name,
      contactPhone: phone,
      role,
    };
    console.log("FORM SEND!!!", formObj);
    dispatch(actUsersUpdate(formObj));
    navigate("/users");
  }

  // console.log("COMPONENT");
  return (
    <>
      {user && (
        <>
          <div className="user-view">
            <h1>Редактирование Данных пользователя</h1>
          </div>
          <br />
          <form onSubmit={fnFormHandler}>
            <div className="user-view">
              <span className="edit-fields bold">ID: </span>
              {user._id}
            </div>
            <div className="user-view">
              <span className="edit-fields bold">Имя: </span>
              <input
                className="user-edit-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="user-view">
              <span className="edit-fields bold">Email: </span>
              {user.email}
            </div>
            <div className="user-view">
              <span className="edit-fields bold">Тел.: </span>
              <input
                className="user-edit-input"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="user-view">
              <span className="edit-fields bold">Роль.: </span>
              <input
                className="user-edit-input"
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </div>
            <button className="form-button user-edit-button">Сохранить</button>
          </form>
        </>
      )}
    </>
  );
}