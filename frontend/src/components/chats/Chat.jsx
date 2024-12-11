import React, { useEffect, useRef, useState } from "react";
import chat from "../../pics/chat.png";
import { useSelector } from "react-redux";
import { sendClientMessage } from "../../store/api/chat/sendClientMessage";
import { findUserRequest } from "../../store/api/chat/findUserRequest";
import ManagerChatDialogItem from "./ManagerChatDialogsItem";
import io from "socket.io-client";
import { readMessage } from "../../store/api/chat/readMessage";

const socket = io.connect(process.env.REACT_APP_BACK_URL);

export default function Chat() {
  const { user } = useSelector((state) => state.crUser);
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [myMessage, setMyMessage] = useState("");
  const dialog = useRef();
  const [currenChat, setCurrentChat] = useState({ _id: "newchat" }); // текущий чат
  const [messages, setMessages] = useState(null); // массив сообщений

  // ======================================
  useEffect(() => {
    // console.log('== 10 ==');
    if (isChatVisible) {
      fetchUserReq();
      goToEndDialog();
    }
  }, [isChatVisible]);

  // ======================================
  useEffect(() => {
    // console.log('== 20 ==');
    fetchUserReq();
  }, []);

  //==== Слушаем сообщение сервера ========
  useEffect(() => {
    // console.log("== 30 == SOCKET");
    if (!isChatVisible) {
      return;
    }
    const eventName = `serverToClient${user._id}`;
    // console.log("333 Слушаем сообщение сервера!!!", eventName);
    socket.on(eventName, (data) => {
      // console.log("== 30-1 == SOCKET ON");
      // console.log("=YESSSSon========== ", data.clientId);
      // console.log("=YESSSSon== FUNC ======== ", data.func);
      if (data.clientId === user._id) {
        // console.log("===!=== Пришло новое сообщение ");
        // setMessages(null); // Старые сообщения удаляем
        fetchUserReq(); // Новые сообщения запрашиваем
      }
    });
    goToEndDialog(); // Переход в конец сообщений
    // console.log("== 30-2 ==");
    return () => {
      // console.log("== 30-3==  SOCKET OFF");
      socket.off(eventName);
    };
  }, [messages, isChatVisible]);

  // ======================================
  async function fetchUserReq() {
    // console.log("== 40 == Запрос диалога");
    const response = await findUserRequest(user._id);
    // console.log("=!========== ", response);
    if (response.length > 0) {
      setCurrentChat(response[0]);
      setMessages(response[0].messages);
    }
  }

  // ======================================
  function goToEndDialog() {
    if (dialog.current && isChatVisible && messages) {
      // console.log("== 50 == Идем в конец isChatVisible=", isChatVisible);
      dialog.current.scrollTop = 99999; // Прокрутка вниз
      if (messages.at(-1).author === user._id) return; // Если последнее message автора то не посылаем в сокет
      // Отправка ПРОЧТЕНО
      // console.log("== 50-1 == Прочитал последнее от  МЕНЕГЕРА");
      const notReadMess = messages
        .filter((i) => i.author !== user._id && !i.readAt)
        .map((i) => i._id);
      if (notReadMess.length < 1) return;

      const params = {
        id: currenChat,
        body: {
          createdBefore: notReadMess,
        },
      };
      const response = readMessage(params); // Посылаем метку ПРОЧИТАНО
      const bodyToSocket = { clientId: user._id };
      socket.emit("clientReadMessage", bodyToSocket);
    }
  }

  // ======================================
  async function fnSendMessage() {
    if (myMessage.trim().length < 1) return;
    // console.log("== 60 == Посылаем текстовое сообщение");
    // console.log("Посылаем сообщение", myMessage);
    const body = { author: user._id, text: myMessage };
    const params = { id: currenChat, body };
    const response = await sendClientMessage(params);
    if (response.errorStatus) {
      return;
    }
    const bodyToSocket = { clientId: user._id };
    socket.emit("clientToManager", bodyToSocket);
    setCurrentChat(response);
    setMyMessage("");
  }

  // ======================================
  // console.log('== 70 ==');
  return (
    <>
      <img
        className="chat-btn"
        width="80"
        height="80"
        src={chat}
        alt="speech-bubble-with-dots"
        onClick={() => setIsChatVisible(!isChatVisible)}
      />
      {isChatVisible && (
        <div className="chat-window">
          <div className="chat-dialog" ref={dialog}>
            {messages &&
              messages.map((i) => (
                <ManagerChatDialogItem key={i._id} item={i} chatOwner={user} />
              ))}
          </div>
          <div className="chat-send">
            <input
              className="chat-input"
              type="text"
              value={myMessage}
              onChange={(e) => setMyMessage(e.target.value)}
            />
            <button className="chat-send-btn" onClick={fnSendMessage}>
              &gt;
            </button>
          </div>
        </div>
      )}
    </>
  );
}