import { put, retry } from "redux-saga/effects";
import { actRoomsList, actionUserTest } from "../../actions/actionCreators";
import { roomsListSearch } from "../../api/hotels/roomsListSearch";

export default function* WorkerRoomsList(action) {
  // console.log('SAGA WORKER ROOMS List', action);
  if (!action.payload.limit) {
    // console.log('ROOMS worker NONONO');
    return;
  }
  // console.log('YESYESYES');
  try {
    const retryCount = 0;
    const retryDelay = 0 * 1000;
    const data = yield retry(
      retryCount,
      retryDelay,
      roomsListSearch,
      action.payload,
    );
    yield put(actRoomsList(data));
  } catch (err) {
    alert("Ошибка запроса API ROOMS list");
    yield put(actionUserTest(err.massage));
  }
}