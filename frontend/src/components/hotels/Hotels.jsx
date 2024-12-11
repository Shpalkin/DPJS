import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actHotelsList } from "../../store/actions/actionCreators";
import HotelsItems from "./HotelsItems";

export default function Hotels() {
  const { hotels } = useSelector((state) => state.hotelsList);
  const [limit, setLimit] = useState(3);
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  //===================================
  useEffect(() => {
    fnFilterHotels();
  }, [offset, limit]);

  //===================================
  function fnFilterHotels() {
    const preOffset = offset;
    const params = {
      offset: preOffset,
      limit,
      search,
    };
    // console.log("FILTER HOTES", params);
    dispatch(actHotelsList(params));
  }

  //===================================
  function fnChangeLimit(event) {
    const numLimit = Number(event.target.value);
    setOffset(0);
    setLimit(numLimit);
  }

  function fnSetOffset(type) {
    if (type === "incr") {
      setOffset(offset + 1);
    } else {
      setOffset(offset === 0 ? 0 : offset - 1);
    }
  }

  return (
    <>
      <div className="hotels-main">
        <div className="hotels-header">
          <div className="hotels-flex">
            <h1 className="">Поиск гостиницы</h1>
            <div>
              <span className="span-limit">Показывать по</span>
              <select value={limit} onChange={fnChangeLimit}>
                <option value="3">3</option>
                <option value="6">6</option>
                <option value="12">12</option>
              </select>
            </div>
          </div>

          <div className="hotels-filter">
            <input
              type="text"
              className="findrooms hotels"
              placeholder="введите слова для поиска"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="hotels-item-btn" onClick={fnFilterHotels}>
              Найти
            </button>
          </div>
        </div>

        {hotels.length > 0 &&
          hotels.map((i, index) => (
            <HotelsItems key={i._id} item={i} limit={limit} index={index} />
          ))}

        <div className="paging">
          <button
            className="paging-button"
            onClick={() => fnSetOffset("decr")}
            disabled={offset < 1 ? true : false}
          >
            <span className="paging-arrows">&lt;</span>
          </button>
          <span className="paging-span">{offset + 1}</span>
          <button
            className="paging-button"
            onClick={() => fnSetOffset("incr")}
            disabled={hotels.length <= limit ? true : false}
          >
            <span className="paging-arrows">&gt;</span>
          </button>
        </div>
      </div>
    </>
  );
}