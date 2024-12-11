import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  actHotelsPics,
  actRoomsPics,
} from "../../store/actions/actionCreators.js";
import { hotelsUpdate } from "../../store/api/hotels/hotelsUpdate.js";
import { roomsByIdSearch } from "../../store/api/hotels/roomsByIdSearch.js";
import AddRoomPics from "./AddRoomPics.jsx";
import { roomsUpdate } from "../../store/api/hotels/roomsUpdate.js";
// import { regRoomsSearchList } from "../../store/api/regrooms/regroomsSearchList.js";

export default function EditRoom() {
  const { id } = useParams();
  const { roomsPics } = useSelector((state) => state.rooms);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [saveBtnDisabled, setSaveBtnDisabled] = useState(true);
  const dispatch = useDispatch();
  const saveButton = useRef(null);
  const pictures = useMemo(() => <AddRoomPics />, []);

  //==============================
  useEffect(() => {
    const fetchRoom = async () => {
      const data = await roomsByIdSearch(id);

      setTitle(data.title);
      setDescription(data.description);
      // Картинки
      const arrPicsFromBack = JSON.parse(data.images);
      const arrTemp = [];
      const backendUrl = process.env.REACT_APP_BACK_URL;
      arrPicsFromBack.forEach(async (i, index) => {
        const response = await fetch(backendUrl + i.url);
        const blob = await response.blob();
        const file = new File([blob], i.name);
        arrTemp.push(file);
        if (arrPicsFromBack.length === arrTemp.length) {
          console.log("123123123-123", arrTemp);
          dispatch(actRoomsPics(arrTemp));
        }
      });
    };
    fetchRoom();
  }, []);

  //===============================================================
  function validate() {
    // --- название мин 5 симв
    // --- описание мин 100
    if (title.length < 5) {
      console.log("В заголовке должно быть не менее 5 символов");
      return false;
    }
    if (description.length < 100) {
      console.log("В описании должно быть не менее 100 символов");
      return false;
    }
    if (roomsPics.length < 1) {
      console.log("Должно быть не менее 1 изображения");
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

  //===============================================================
  async function handlerHotelsSave(e) {
    e.preventDefault();
    // отсюда и до конца в САГИ
    const formData = new FormData();
    roomsPics.forEach((item) => {
      formData.append("files", item);
    });
    formData.append("title", title);
    formData.append("description", description);
    // dispatch(actHotelsAdd(formData));
    roomsUpdate(id, formData);
    clearAll();
  }

  //================================================
  function clearAll() {
    dispatch(actRoomsPics([]));
    setTitle("");
    setDescription("");
  }

  return (
    <>
      <div className="mainpage">
        {pictures}
        <div>
          <span className="addhotel-span">Название отеля</span>
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
            <span className="addhotel-span">Описание отеля</span>
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