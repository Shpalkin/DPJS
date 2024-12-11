import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function FindRooms() {
  // const { user } = useSelector((state) => state.crUser);
  const dispatch = useDispatch();
  const dateNow = () => {
    const tempdate = new Date();
    return tempdate.toISOString().split("T")[0];
  };
  const [hotelName, setHotelName] = useState("");
  const [dateStart, setDateStart] = useState(dateNow);
  const [dateEnd, setDateEnd] = useState(dateNow);

  // useEffect(() => {
  //   console.log('useEffect ', user);
  // }, []);

  function fnFindRooms() {
    const objDTO = {
      hotelName,
      dateStart,
      dateEnd,
    };
    console.log("objDTO", objDTO);
    const fetchData = async () => {
      const url = process.env.REACT_APP_BACK_URL + "/api/client/reservations";
      const res = await fetch(url);
      if (!res.ok) {
        console.log("ERR");
        throw new Error(res.statusText);
      }
      const data = await res.json();
      console.log("RES ", data);
    };
    fetchData();
  }

  return (
    <>
      <div className="mainpage">
        <h1 className="mb20 clb">Поиск номеров</h1>
        <div className="mb20">
          <input
            type="text"
            className="findrooms hotels"
            placeholder="Введите название гостиницы (не обязательно)"
            value={hotelName}
            onChange={(e) => setHotelName(e.target.value)}
          />
        </div>
        <div className="findrooms dates">
          <div className="findrooms date">Заезд</div>
          <div className="findrooms date">Выезд</div>
        </div>
        <div className="findrooms dates mb20">
          <input
            type="date"
            className="findrooms date"
            value={dateStart}
            onChange={(e) => setDateStart(e.target.value)}
          />
          --
          <input
            type="date"
            className="findrooms date"
            value={dateEnd}
            onChange={(e) => setDateEnd(e.target.value)}
          />
        </div>
        <button className="findrooms-btn blue" onClick={fnFindRooms}>
          Искать
        </button>
      </div>
    </>
  );
}