import React from "react";
import HotelView from "./HotelsView";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function RoomsItems({ item, hotelState }) {
  const { user } = useSelector((state) => state.crUser);
  const navigate = useNavigate();
  const pics = JSON.parse(item.images);
  const picsUrl = `url(${process.env.REACT_APP_BACK_URL}${pics[0].url})`;
  const picStyle = {
    backgroundImage: picsUrl,
    backgroundColor: "#ccc",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };

  //========================================
  function fnViewRoom() {
    // HotelView();
    const url = `/rooms/view/${item._id}`;
    console.log("URL", url);
    navigate(url, { state: { item, hotelState } });
  }

  function fnEditRoom() {
    // HotelView();
    const url = `/rooms/edit/${item._id}`;
    console.log("URL", url);
    navigate(url, { state: { item, hotelState } });
  }

  //========================================
  return (
    <>
      <div className="hotels-item-wrap">
        <div className="hotels-item-pic" style={picStyle}></div>
        <div className="hotels-item-conteiner">
          <h2>{item.title}</h2>
          <div className="hotels-item-description">{item.description}</div>
          <div style={{ display: "flex" }}>
            {user && user.role === "admin" && (
              <button
                className="addhotel-btn red"
                onClick={fnEditRoom}
                style={{ marginRight: "20px" }}
              >
                Редактировать
              </button>
            )}
            <button className="addhotel-btn blue" onClick={fnViewRoom}>
              Подробнее
            </button>
          </div>
        </div>
      </div>
    </>
  );
}