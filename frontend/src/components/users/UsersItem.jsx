import React from "react";
import viewIcon from "../../pics/eye.png";
import editIcon from "../../pics/pen.png";
import deleteIcon from "../../pics/remove.png";
import reservIcon from "../../pics/reservation.png";
import { useSelector } from "react-redux";

export default function UsersItem({ item, index, hendlerIcon, limit }) {
  const { user } = useSelector((state) => state.crUser);

  if (index >= limit) {
    return;
  }

  return (
    <>
      <tr key={item._id}>
        <td className="users-table-td users-table-npp">{index + 1}</td>
        <td className="users-table-td users-table-name">
          {item.name.length > 18 ? `${item.name.substr(0, 18)}...` : item.name}
        </td>
        <td className="users-table-td users-table-mail">{item.email}</td>
        <td className="users-table-td users-table-buttons">
          <img
            className="users-icon"
            src={viewIcon}
            onClick={(e) => hendlerIcon(e, item)}
            data-title="Просмотр"
            alt="view"
          />
          {user.role === "manager" && (
            <>
              <img
                className="users-icon"
                src={reservIcon}
                onClick={(e) => hendlerIcon(e, item)}
                data-title="Брони"
                alt="reserv"
              />
            </>
          )}
          {user.role === "admin" && (
            <>
              <img
                className="users-icon"
                src={editIcon}
                onClick={(e) => hendlerIcon(e, item)}
                data-title="Редактирование"
                alt="edit"
              />
              <img
                className="users-icon"
                src={deleteIcon}
                onClick={(e) => hendlerIcon(e, item)}
                data-title="Удалить"
                alt="delete"
              />
            </>
          )}
        </td>
      </tr>
    </>
  );
}