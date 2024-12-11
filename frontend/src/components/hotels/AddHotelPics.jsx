import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  actHotelsPics,
  actUserError,
} from "../../store/actions/actionCreators";
import EXIF from "exif-js";
import WinError from "../Error";

export default function AddHotelPics() {
  const { hotelsPics } = useSelector((state) => state.hotelsList);
  const { user, userError } = useSelector((state) => state.crUser);
  let idxFrom = null;
  const inputFile = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("hotelsPics");
  }, [hotelsPics]);

  //=====================================
  async function picsMetadata(file) {
    {
      const { name } = file;
      const fileExtension = name.split(".").pop();
      const localUrl = URL.createObjectURL(file);
      // reading a file to get height and width
      async function getImageParams(file) {
        return new Promise((resolve, reject) => {
          var reader = new FileReader();

          reader.onload = async (e) => {
            var image = new Image();
            image.src = e.target.result;
            await image.decode();

            resolve({ width: image.width, height: image.height });
          };
          reader.readAsDataURL(file);
        });
      }
      const { width, height } = await getImageParams(file);
      console.log("WIDTH", width, "HEIGHT", height);

      return { width, height, fileSize: file.size, fileExtension, localUrl };
    }
  }

  //===============================
  function fnPics2Arr(e) {
    // Мах объем 10МБ
    // Мин ширина 1000пкс
    // Макс 5000 пикс по сумме сторон

    const preArray = [...hotelsPics];
    const inputArray = Array.from(e.target.files);
    const picsQuantity = preArray.length + inputArray.length;
    if (picsQuantity > 10) {
      alert("Не более картинок 10!!!");
      return;
    }
    let picsMinus = 0;
    let errMessage = "";
    const br = document.createElement("br");

    inputArray.forEach(async (i, index) => {
      const wh = await picsMetadata(i);

      if (wh.width < 1000) {
        errMessage += `===== НЕ добавляем ${i.name} Ширина меньше 1000px ${wh.width}`;
        console.log(`НЕ добавляем ${i.name} Ширина меньше 1000px ${wh.width}`);
        picsMinus += 1;
      } else if (wh.width + wh.height > 5000) {
        errMessage += `===== НЕ добавляем ${i.name} сумма длин сторон больше 5000px ${
          wh.width + wh.height
        }`;
        console.log(
          `НЕ добавляем ${i.name} сумма длин сторон больше 5000px ${
            wh.width + wh.height
          }`,
        );
        picsMinus += 1;
      } else {
        preArray.push(i);
      }

      if (preArray.length === picsQuantity - picsMinus) {
        //  Последний элемент dispatch-им
        // Сначала проверка на общий размер
        let filesSize = 0;
        preArray.forEach(async (file, index) => {
          const tempSize = file.size;
          filesSize += Number(tempSize);
          if (index === preArray.length - 1) {
            if (Math.floor(filesSize / 1024 / 1024) > 10) {
              // Проверка на общийрамер файлов < 10МБ
              errMessage += `===== НЕ добавляем! общий размер файлов больше 10МБ`;
              console.log(`НЕ добавляем! общий размер файлов больше 10МБ`);
            } else {
              dispatch(
                actUserError({
                  statusCode: 0,
                  message: errMessage,
                }),
              );
              dispatch(actHotelsPics(preArray));
            }
          }
        });
      }
    });
  }

  //=====================================
  function fnClickPlus() {
    inputFile.current.click();
  }

  //=====================================
  function fnOnDragStart(e, item, index) {
    idxFrom = index;
  }

  //=====================================
  function fnOnDragLeave(e) {
    e.preventDefault();
    e.target.style.border = "3px solid white";
  }

  //=====================================
  function fnOnDragEnd(e) {
    // e.target.style.border = 'none';
  }

  //=====================================
  function fnOnDragOver(e) {
    e.preventDefault();
    e.target.style.border = "3px solid red";
  }

  //=====================================
  function fnOnDrop(e, item, idxTo) {
    e.preventDefault();
    e.target.style.border = "3px solid white";
    const tempArray = [...hotelsPics];
    tempArray.splice(idxTo, 0, tempArray.splice(idxFrom, 1)[0]);
    dispatch(actHotelsPics(tempArray));
  }

  //=====================================
  function fnRemovePics(index) {
    console.log("Удаляем индекс=", index);
    dispatch(actHotelsPics(hotelsPics.filter((i, arrIdx) => arrIdx !== index)));
  }

  //=====================================
  return (
    <>
      {userError && (
        <WinError type={userError.type} clearFields={() => {}}>
          {userError.text}
        </WinError>
      )}
      <div>
        <input
          ref={inputFile}
          type="file"
          className="addhotel-input-file"
          multiple
          accept="image/*"
          onChange={fnPics2Arr}
        />
        <div className="addhotel-preview">
          {hotelsPics.length > 0 &&
            hotelsPics.map((item, index) => (
              <div className="addhotel-div-preview" key={index}>
                <img
                  className="addhotel-pics-preview"
                  alt="not found"
                  src={URL.createObjectURL(item)}
                  draggable={true}
                  onDragStart={(e) => fnOnDragStart(e, item, index)}
                  onDragLeave={(e) => fnOnDragLeave(e)}
                  onDragEnd={(e) => fnOnDragEnd(e)}
                  onDragOver={(e) => fnOnDragOver(e)}
                  onDrop={(e) => fnOnDrop(e, item, index)}
                />
                <div
                  className="close-img-preview"
                  onClick={() => fnRemovePics(index)}
                >
                  &times;
                </div>
              </div>
            ))}
          {hotelsPics.length !== 10 && (
            <button className="addhotel-pics-btn" onClick={fnClickPlus}>
              <span>+</span>
            </button>
          )}
        </div>
      </div>
    </>
  );
}