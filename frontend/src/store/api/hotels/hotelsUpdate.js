export const hotelsUpdate = async (id, formData) => {
    // console.log("===== PARAM SAGA hotels ADD", formData, '555', formData instanceof FormData);
    const url =
      process.env.REACT_APP_BACK_URL +
      process.env.REACT_APP_POSTFIX_HOTELS +
      `/${id}`;
    const options = {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Access-Control-Allaow-Origin": "*",
      },
      body: formData,
    };
    try {
      const res = await fetch(url, options);
      console.log("RES", res.json());
      // console.log('res', res);
      console.log("Гостиница успешно добавлена!");
    } catch (e) {
      console.log("ERROR UPLOAD", e.massage);
    }
  };