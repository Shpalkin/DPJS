import { actUserError } from "../store/actions/actionCreators";
import { useDispatch } from "react-redux";

export default function WinError({ children, type, clearFields }) {
  const dispatch = useDispatch();

  const styleMess = {
    borderRadius: "5px",
    clolor: "black",
    fontSize: "20px",
    width: "93%",
    minHeight: "60px",
    padding: "20px",
    marginBottom: "20px",
  };

  if (type === "err") {
    console.log("err type", type);
    styleMess.border = "3px solid #dc3545";
    styleMess.backgroundColor = "#f8d7da";
  } else {
    console.log("mess type", type);
    styleMess.border = "3px solid #198754";
    styleMess.backgroundColor = "#d1e7dd";
  }

  function fnClose() {
    console.log("WinError-useEffect");
    const body = {
      message: "close",
      statusCode: "",
    };
    dispatch(actUserError(body));
    clearFields();
  }

  // ============================
  return (
    <>
      <div style={styleMess}>
        <div>{children}</div>
        <button
          className="hotels-item-btn"
          style={{ marginTop: "10px" }}
          onClick={fnClose}
        >
          Закрыть
        </button>
      </div>
    </>
  );
}