import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddHotelPics from "./AddHotelPics";
import {
  actHotelsAdd,
  actHotelsPics,
} from "../../store/actions/actionCreators";

export default function AddHotel() {
  // const { user } = useSelector((state) => state.crUser);
  const { hotelsPics } = useSelector((state) => state.hotelsList);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [saveBtnDisabled, setSaveBtnDisabled] = useState(true);
  const dispatch = useDispatch();
  const saveButton = useRef(null);
  const pictures = useMemo(() => <AddHotelPics />, []);

  //===============================================================
  function validate() {
    // --- название мин 5 симв
    // --- описание мин 100
    if (title.length < 5) {
      // alert("В заголовке должно быть не менее 5 символов");
      return false;
    }
    if (description.length < 100) {
      // alert("В описании должно быть не менее 100 символов");
      return false;
    }
    if (hotelsPics.length < 1) {
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
  }, [hotelsPics, title, description]);

  //===============================================================
  async function handlerHotelsSave(e) {
    e.preventDefault();
    // отсюда и до конца в САГИ
    const formData = new FormData();
    hotelsPics.forEach((item) => {
      // console.log('item pics after', item);
      formData.append("files", item);
    });
    formData.append("title", title);
    formData.append("description", description);
    dispatch(actHotelsAdd(formData));
    clearAll();
  }

  //================================================
  function clearAll() {
    dispatch(actHotelsPics([]));
    setTitle("");
    setDescription("");
  }

  //====================================================
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