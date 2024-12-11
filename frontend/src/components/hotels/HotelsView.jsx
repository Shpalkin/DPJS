import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import AddRoom from "./AddRoom";
import { actRoomsList } from "../../store/actions/actionCreators";
import RoomsItems from "./RoomsItems";

export default function HotelsView(props) {
  const { user } = useSelector((state) => state.crUser);
  const { rooms } = useSelector((state) => state.rooms);
  const [isModal, setIsModal] = useState(false);
  const [urlForModal, setUrlForModal] = useState(null);
  const [isAddRoom, setIsAddRoom] = useState(false);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { _id, title, description, files } = location.state.item;
  const hotelsPics = JSON.parse(files);
  const backendUrl = `${process.env.REACT_APP_BACK_URL}`;

  useEffect(() => {
    const objParams = {
      offset,
      limit,
      hotelId: _id,
    };
    dispatch(actRoomsList(objParams));
  }, [isAddRoom]);

  function fnModalPics(url) {
    setIsModal(!isModal);
    setUrlForModal(url);
  }

  function fnCloseModalPics() {
    setIsModal(false);
    setUrlForModal("");
  }

  function fnEditHotel() {
    console.log("Редактируем отель");
    navigate(`/hotels/edit/${_id}`);
  }

  return (
    <>
      <div className="mainpage">
        {/* <h1  className="mb20">Гостиница</h1> */}
        <div className="mb20">
          <h1 style={{ color: "blue" }}>{title}</h1>
        </div>
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
          <span style={{ color: "#8a92a6" }}>{description}</span>
        </div>
        {user && user.role === "admin" && (
          <div className="addhotel-btn">
            <button className="addhotel-btn red" onClick={fnEditHotel}>
              Редактировать
            </button>
            <button
              className="addhotel-btn blue"
              onClick={() => setIsAddRoom(true)}
            >
              Добавить номер
            </button>
            {/* <h2 style={{color: 'red'}}>{isAddRoom ? 'Yes' : 'No'}</h2> */}
          </div>
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
      {isAddRoom && <AddRoom setIsAddRoom={setIsAddRoom} hotelId={_id} />}
      {/* <h2 style={{ color: "black"}}>{title}</h2> */}
      <h2 className="hotels-header" style={{ backgroundColor: "#dfffe5" }}>
        Выбрать и забронировать номер:
      </h2>
      {rooms.length > 0 &&
        rooms.map((i) => (
          <RoomsItems key={i._id} item={i} hotelState={location.state.item} />
        ))}
    </>
  );
}