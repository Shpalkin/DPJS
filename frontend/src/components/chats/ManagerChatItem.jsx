import React from "react";

export default function ManagerChatItem({
  item,
  fnLiOnClick,
  fnOnMouseOver,
  fnOnMouseLeave,
}) {
  // console.log('ITEM item.newMessage', item.newMessage);
  const signal = {
    backgroundColor: item.newMessage
      ? "rgba(255, 83, 15, 1)"
      : "rgba(255, 83, 15, 0)",
  };

  // console.log('ManagerChatItem', signal);
  return (
    <>
      <li
        className="mchat-users-cell"
        onClick={(e) => fnLiOnClick(e, item._id, item.user)}
        onMouseOver={(e) => fnOnMouseOver(e)}
        onMouseLeave={(e) => fnOnMouseLeave(e)}
      >
        <span className="mchat-name">{item.user.name}</span>
        <div className="mchat-signal" style={signal}>
          {" "}
        </div>
      </li>
    </>
  );
}
