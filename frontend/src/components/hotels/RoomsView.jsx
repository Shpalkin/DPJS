import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AddRoom from "./AddRoom";
import { actRegRoomsAdd } from "../../store/actions/actionCreators";
import RoomsItems from "./RoomsItems";

export default function RoomsView(props) {
  const { user } = useSelector((state) => state.crUser);
  const [isModal, setIsModal] = useState(false);
  const [urlForModal, setUrlForModal] = useState(null);
  const dateNow = () => {
    const tempdate = new Date();
    return tempdate.toISOString().split("T")[0];
  };
  const [dateStart, setDateStart] = useState(dateNow);
  const [dateEnd, setDateEnd] = useState(dateNow);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { _id, title, description, images } = location.state.item;
  const hotelState = location.state.hotelState;
  const hotelsPics = JSON.parse(images);
  const backendUrl = `${process.env.REACT_APP_BACK_URL}`;

  // ============================================================
  function fnModalPics(url) {
    // Просмотр картинки
    setIsModal(!isModal);
    setUrlForModal(url);
  }

  function fnCloseModalPics() {
    setIsModal(false);
    setUrlForModal("");
  }

  function fnReturn() {
    // Назад к гостинице
    const url = `/hotels/view/${hotelState._id}`;
    navigate(url, { state: { item: hotelState } });
  }

  function fnRegisterRoom() {
    // Бронируем номер
    console.log(
      "БРОНИРУЕМ НОМЕР hotel",
      hotelState._id,
      "nomer",
      _id,
      "user",
      user._id,
      "start",
      dateStart,
      "END",
      dateEnd,
    );
    const newRegrooms = {
      userId: user._id,
      hotelId: hotelState._id,
      roomId: _id,
      dateStart,
      dateEnd,
    };
    dispatch(actRegRoomsAdd(newRegrooms));
    navigate("/reservations");
  }

  function fnEditRoom() {
    // Редактируем номер
    console.log("РЕДАКТИРУЕМ НОМЕР");
  }

  //========================================================
  return (
    <>
      <div className="hotels-header" onClick={fnReturn}>
        <span style={{ color: "blue", fontWeight: "bold", cursor: "pointer" }}>
          &lt; {hotelState.title}
        </span>
      </div>
      <div className="mainpage">
        <div className="addhotel-preview">
          {hotelsPics.length > 0 &&
            hotelsPics.map((item, index) => (
              <img
                key={item.url}
                alt="not found"
                className="view-pics-preview"
                src={backendUrl + item.url}
                onClick={() => fnModalPics(backendUrl + item.url)}
              />
            ))}
        </div>
        <div className="mb20">
          <h1 style={{ color: "black" }}>{title}</h1>
        </div>
        <div className="mb20">
          <span style={{ color: "#8a92a6" }}>{description}</span>
        </div>
        {!user && (
          <div
            className="hotels-item-wrap"
            style={{
              display: "block",
              marginTop: "60px",
              backgroundColor: "#fcfee2",
            }}
          >
            <h2>
              Для возможности бронирования номера необходимо войти в систему!
            </h2>
          </div>
        )}
        {user && user.role === "client" && (
          <>
            <div
              className="hotels-item-wrap"
              style={{
                display: "block",
                marginTop: "60px",
                backgroundColor: "#fcfee2",
              }}
            >
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

              <div className="addhotel-btn">
                <button className="addhotel-btn red" onClick={fnRegisterRoom}>
                  Забронировать
                </button>
                {user && user.role === "admin" && (
                  <button className="addhotel-btn blue" onClick={fnEditRoom}>
                    Редактировать
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      {isModal && (
        <div className="modal-wrap">
          <div
            className="pics-modal"
            style={{ backgroundImage: `url(${urlForModal})` }}
          >
            <div className="close-modal" onClick={fnCloseModalPics}>
              &times;
            </div>
          </div>
        </div>
      )}
    </>
  );
}