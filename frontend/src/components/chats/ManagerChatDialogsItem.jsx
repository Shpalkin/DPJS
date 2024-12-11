import React from "react";
import vGreen from "../../pics/v-green.png";
import vvGreen from "../../pics/vv-green.png";

export default function ManagerChatDialogItem({ item, chatOwner }) {
  // console.log("333", item.readAt);
  // `url(${background})`
  const checkRead = item.readAt ? vvGreen : vGreen;

  let clientRead = (
    <div className="client-read">
      <img className="message-read-pics" src={checkRead} alt="view" />
    </div>
  );
  let managerRead = (
    <div className="manager-read">
      <img className="message-read-pics" src={checkRead} alt="view" />
    </div>
  );
  if (chatOwner.role === "client") {
    clientRead = null;
  } else {
    managerRead = null;
  }

  return (
    <>
      {item.author === chatOwner._id ? (
        <div className="message-wrap" style={{ justifyContent: "flex-end" }}>
          <div className="message-client">
            {item.text}
            {managerRead}
          </div>
        </div>
      ) : (
        <div>
          <div className="message-wrap">
            <div className="message-manager">
              {item.text}
              {clientRead}
            </div>
          </div>
        </div>
      )}
      <div className="message-wrap"></div>
    </>
  );
}