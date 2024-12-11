import { put, retry } from "redux-saga/effects";
import { actRegRoomsList, actionUserTest } from "../../actions/actionCreators";
import { regRoomsSearchList } from "../../api/regrooms/regroomsSearchList";

export default function* WorkerRegRoomsList(action) {
  // console.log('SAGA WORKER RegRoomsList', action.payload);
  if (typeof action.payload !== "string") {
    // console.log('NONONO ============== Прерываем WORKER REGRoomsList');
    return;
  }
  try {
    const retryCount = 1;
    const retryDelay = 1 * 1000;
    const data = yield retry(
      retryCount,
      retryDelay,
      regRoomsSearchList,
      action.payload,
    );
    // console.log('Worker HotelLIST 222', data);
    yield put(actRegRoomsList(data));
  } catch (err) {
    // alert('Ошибка запроса RegRooms List');
    yield put(actionUserTest(err.massage));
  }
}