import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ManagerChatItem from "./ManagerChatItem";
import { getUsersFromRequests } from "../../store/api/chat/getUsersFromRequests";
import { findRequestById } from "../../store/api/chat/findRequestById";
import ManagerChatDialogItem from "./ManagerChatDialogsItem";
import io from "socket.io-client";
import { sendClientMessage } from "../../store/api/chat/sendClientMessage";
import { readMessage } from "../../store/api/chat/readMessage";

const socket = io.connect(process.env.REACT_APP_BACK_URL);

export default function ManagerChat() {
  const { user } = useSelector((state) => state.crUser);
  const [seletedLi, setSeletedLi] = useState(null);
  const [chatsUsers, setChatsUsers] = useState(null);
  const [messages, setMessages] = useState(null);
  const [chatOwner, setChatOwner] = useState(null);
  const [mgrMessage, setMgrMessage] = useState("");
  const [socetData, setSocetData] = useState(null);
  const [mgrSend, setMgrSend] = useState(false);
  const dialog = useRef();
  let saveBtnDisabled = true;

  useEffect(() => {
    // console.log("== 10 ==  Messages изменились - идем в конец списка");
    goToEndDialog();
  }, [messages]);

  // ==== Слушаем сообщение сервера ========
  useEffect(() => {
    // console.log("== 20 == Эффект сокета");
    const eventName = `serverToManager`;
    socket.on(eventName, (data) => {
      // console.log("=YESSSSon========== ", data.clientId);
      // console.log("=YESSSSon== FUNC ======== ", data.func);
      fetchChatsUsers(data);
    });

    return () => {
      // console.log("== 20-2 ==");
      socket.off(eventName);
    };
  }, [chatsUsers]);

  //=======================================
  useEffect(() => {
    // console.log("== 30 == Поучаем пользователей ЧАТов");
    // console.log("== 30 ==");
    if (!chatsUsers) {
      fetchChatsUsers();
    }
    if (!socetData) return;
    const newChatsUsers = [...chatsUsers];

    newChatsUsers.forEach((item) => {
      if (item.user._id === socetData.clientId) {
        item.newMessage = true;
        if (chatOwner && item.user._id === chatOwner.user._id) {
          fetchUserRequest(chatOwner.chatId);
        }
      }
    });
    setChatsUsers(newChatsUsers);
  }, [socetData]);

  //=============================================
  async function fetchChatsUsers(socetData) {
    console.log("== 40 == Получаем ЧАТ выбранного пользователя");
    try {
      const response = await getUsersFromRequests();
      const data = await response;
      data.forEach((item) => {
        item.newMessage = false;
      });
      setChatsUsers(await data);
      if (socetData) setSocetData(socetData);
    } catch (err) {
      console.log("Ошибка в ManagerChat", err.massage);
    }
  }

  //==================================
  async function fnLiOnClick(e, chatId, user) {
    // console.log("== 50 == ОНКЛИК по пользователям");
    e.preventDefault();
    setChatOwner({ chatId, user });
    // Меняем стили
    if (seletedLi) {
      seletedLi.style.backgroundColor = "white";
      seletedLi.firstChild.style.color = "black";
    }
    const currentLi = e.target.closest(".mchat-users-cell");
    setSeletedLi(currentLi);
    currentLi.style.backgroundColor = "#5181b8";
    currentLi.firstChild.style.color = "white";
    // запрос чата выбранного клиента
    fetchUserRequest(chatId);
    const newChatsUsers = [...chatsUsers];
    newChatsUsers.forEach((item) => {
      if (item.user._id === user._id) {
        item.newMessage = false;
      }
    });
    setChatsUsers(newChatsUsers);
  }

  //====================================
  function goToEndDialog() {
    // console.log("== 60 == Идем в конец и ПРОЧТЕНО");
    if (!chatOwner) return;
    if (dialog.current) {
      dialog.current.scrollTop = 99999;
    }
    if (messages.at(-1).author !== chatOwner.user._id) return; // Если последнее message манагера то не посылаем в сокет

    // Отправка ПРОЧТЕНО
    const notReadMess = messages
      .filter((i) => i.author == chatOwner.user._id && !i.readAt)
      .map((i) => i._id);
    if (notReadMess.length < 1) return;

    const params = {
      id: chatOwner.chatId,
      body: {
        createdBefore: notReadMess,
      },
    };
    const response = readMessage(params);
    const bodyToSocket = { clientId: chatOwner.user._id };
    socket.emit("managerReadMessage", bodyToSocket);
  }

  //====================================
  async function fetchUserRequest(chatId) {
    console.log("== 70 == Получаем сообщения из чата пользователя");
    const dataRequest = await findRequestById(chatId);
    setMessages(dataRequest.messages);
  }

  //==================================
  function fnOnMouseOver(e) {
    // console.log("== 80 ==");
    e.preventDefault();
    const currentLi = e.target.closest(".mchat-users-cell");
    if (currentLi === seletedLi) {
      return;
    }
    currentLi.style.backgroundColor = "#cfd2da";
    currentLi.firstChild.style.color = "black";
  }

  //==================================
  function fnOnMouseLeave(e) {
    // console.log("== 90 ==");
    e.preventDefault();
    const currentLi = e.target.closest(".mchat-users-cell");
    if (currentLi === seletedLi) {
      return;
    }
    currentLi.style.backgroundColor = "white";
  }

  //================================== Отправка сообщений
  async function fnSendMessage() {
    // console.log("== 100 == Посылаем сообщение менеджера");
    if (mgrMessage.trim().length < 1) return;
    const body = { author: user._id, text: mgrMessage };
    const params = { id: { _id: chatOwner.chatId }, body };
    const response = await sendClientMessage(params);
    if (response.errorStatus) {
      return;
    }
    setMgrMessage("");
    const bodyToSocket = { clientId: chatOwner.user._id };
    setMgrSend(true);
    socket.emit("managerToClient", bodyToSocket);
  }

  // const dis
  // disabled={saveBtnDisabled}
  if (chatOwner) {
    saveBtnDisabled = false;
  }

  return (
    <>
      <div className="mainpage">
        <div className="mchat-wrap">
          <div className="mchat-users">
            <div className="mchat-header">
              <h2>Чаты клиентов</h2>
            </div>
            <div className="">
              <ul className="">
                {chatsUsers &&
                  chatsUsers.map((i) => (
                    <ManagerChatItem
                      key={i._id}
                      item={i}
                      fnLiOnClick={fnLiOnClick}
                      fnOnMouseOver={fnOnMouseOver}
                      fnOnMouseLeave={fnOnMouseLeave}
                    />
                  ))}
              </ul>
            </div>
          </div>

          <div className="mchat-dialog-wrap">
            <div ref={dialog} className="mchat-dialog">
              {messages &&
                messages.map((i) => (
                  <ManagerChatDialogItem
                    key={i._id}
                    item={i}
                    chatOwner={chatOwner.user}
                  />
                ))}
            </div>
            <div className="mchat-dialog-send">
              <input
                type="text"
                value={mgrMessage}
                onChange={(e) => setMgrMessage(e.target.value)}
                disabled={saveBtnDisabled}
              />
              <button
                className="mchat-dialog-btn"
                onClick={fnSendMessage}
                disabled={saveBtnDisabled}
              >
                {" "}
                &gt;&gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}