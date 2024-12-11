import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddRoomPics from "./AddRoomPics";
import { actRoomsAdd, actRoomsPics } from "../../store/actions/actionCreators";

export default function AddRoom({ setIsAddRoom, hotelId }) {
  const { user } = useSelector((state) => state.crUser);
  const { roomsPics } = useSelector((state) => state.rooms);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [saveBtnDisabled, setSaveBtnDisabled] = useState(true);

  const dispatch = useDispatch();
  const saveButton = useRef(null);
  const pictures = useMemo(() => <AddRoomPics />, []);

  //===============================================================
  function validate() {
    if (title.length < 5) {
      // alert("В заголовке должно быть не менее 5 символов");
      return false;
    }
    if (description.length < 100) {
      // alert("В описании должно быть не менее 100 символов");
      return false;
    }
    if (roomsPics.length < 1) {
      // alert("Должно быть не менее 1 изображения");
      return false;
    }
    return true;
  }

  //===============================================================
  useEffect(() => {
    if (validate()) {
      setSaveBtnDisabled(false);
      return;
    }
    setSaveBtnDisabled(true);
  }, [roomsPics, title, description]);
  // удалить

  //===============================================================
  async function handlerHotelsSave(e) {
    e.preventDefault();
    //По умолчанию formData создается с праметром multipart/form-data
    const formData = new FormData();
    roomsPics.forEach((item) => {
      formData.append("files", item);
    });
    formData.append("title", title);
    formData.append("description", description);
    formData.append("hotelId", hotelId);
    formData.append("isAnable", true);

    console.log("formData", formData);
    dispatch(actRoomsAdd(formData));
    clearAll();
    // }
  }

  //================================================
  function clearAll() {
    dispatch(actRoomsPics([]));
    setTitle("");
    setDescription("");
    const timeoutId = setTimeout(setIsAddRoom(false), 200);
    return clearTimeout(timeoutId);
  }

  //====================================================
  return (
    <>
      <div className="mainpage">
        {pictures}
        <div>
          <span className="addhotel-span">Название номера</span>
          <input
            className="addhotel-title"
            type="text"
            placeholder="не менее 5 символов"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>
            <span className="addhotel-span">Описание номера</span>
            <textarea
              className="addhotel-desc"
              placeholder="не менее 100 символов"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
        </div>
        <div className="addhotel-btn">
          <button
            ref={saveButton}
            className="addhotel-btn green"
            onClick={handlerHotelsSave}
            disabled={saveBtnDisabled}
          >
            Сохранить
          </button>
          <button className="addhotel-btn red" onClick={clearAll}>
            Отменить
          </button>
        </div>
      </div>
    </>
  );
}