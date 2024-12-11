import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  actUsersDelete,
  actUsersList,
} from "../../store/actions/actionCreators";
import UsersItem from "./UsersItem";

export default function Users() {
  const { users, isDelete } = useSelector((state) => state.usersList);
  const { user } = useSelector((state) => state.crUser);
  const [limit, setLimit] = useState(3);
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState("");
  const [allowedShown, setAllowedShown] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const trueRols = ["admin", "manager"];

  // ==================================
  useEffect(() => {
    localStorage.removeItem("reservations");
    console.log("112");
    if (user && trueRols.includes(user.role)) {
      // console.log('trueRols', user);
      setAllowedShown(true);
    } else {
      // console.log('НЕ trueRols');
    }
  }, []);

  //==================================
  useEffect(() => {
    if (allowedShown) {
      findUsers();
    }
  }, [offset, limit, isDelete, allowedShown]);

  //==================================
  function findUsers() {
    const preOffset = offset;
    const params = {
      offset: preOffset,
      limit,
      search,
    };
    dispatch(actUsersList(params));
  }

  //==================================
  function searchUsers() {
    setOffset(0);
    findUsers();
  }

  //==================================
  function fnAddUser() {
    navigate("/signup");
  }

  //==================================
  function hendlerIcon(event, item) {
    const action = event.target?.alt;
    switch (action) {
      case "view":
        navigate(`/userview/${item._id}`);
        break;
      case "edit":
        navigate(`/useredit/${item._id}`);
        break;
      case "reserv":
        navigate(`/mgrresevations/${item._id}`, {
          state: { item: item },
        });
        break;
      case "delete":
        setOffset(0);
        dispatch(actUsersDelete(item._id));
        break;
      default:
        break;
    }
  }

  //==================================
  function fnChangeLimit(event) {
    const numLimit = Number(event.target.value);
    setOffset(0);
    setLimit(numLimit);
  }

  //==================================
  function fnSetOffset(type) {
    if (type === "incr") {
      setOffset(offset + 1);
    } else {
      setOffset(offset === 0 ? 0 : offset - 1);
    }
  }

  //===========================================
  return (
    <>
      {!allowedShown && <div>Страница не доступна</div>}
      {/* {!trueRols.includes(user?.role) && <div>Страница не доступна</div>} */}
      {allowedShown && (
        <div className="mainpage">
          <div className="users-header">
            {user && user.role === "admin" && (
              <button onClick={fnAddUser} type="submit" className="form-button">
                Добавить
              </button>
            )}
            {user && user.role === "manager" && <div></div>}
            <div>
              <span className="span-limit">Показывать по</span>
              <select value={limit} onChange={fnChangeLimit}>
                <option value="3">3</option>
                <option value="6">6</option>
                <option value="12">12</option>
              </select>
            </div>
          </div>
          <div className="user-search-wrap">
            <input
              className="users-search"
              placeholder="Введите Имя, телефон или email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="form-button" onClick={searchUsers}>
              Найти
            </button>
          </div>

          {users ? (
            <>
              <table className="users-table">
                <tbody>
                  <tr className="" key="0">
                    <th className="users-table-th users-table-npp">ID</th>
                    <th className="users-table-th users-table-name">name</th>
                    <th className="users-table-th users-table-mail">email</th>
                    <th className="users-table-th users-table-buttons"></th>
                  </tr>
                  {users &&
                    users.map((item, index) => (
                      <UsersItem
                        limit={limit}
                        key={item._id}
                        index={index}
                        item={item}
                        hendlerIcon={hendlerIcon}
                      />
                    ))}
                </tbody>
              </table>
              <div className="paging">
                <button
                  className="paging-button"
                  onClick={() => fnSetOffset("decr")}
                  disabled={offset < 1 ? true : false}
                >
                  <span className="paging-arrows">&lt;</span>
                </button>
                <span className="paging-span">{offset + 1}</span>
                <button
                  className="paging-button"
                  onClick={() => fnSetOffset("incr")}
                  disabled={users.length <= limit ? true : false}
                >
                  <span className="paging-arrows">&gt;</span>
                </button>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      )}
    </>
  );
}