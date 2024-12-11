export const userLoginSearch = async (param) => {
  // const url = `${process.env.REACT_APP_BACK_URL}/api/auth/login`;
  const url =
    process.env.REACT_APP_BACK_URL + process.env.REACT_APP_POSTFIX_LOGIN;
  const { email, password } = param;
  const body = { email, passwordHash: password };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(body),
  };

  //const response = await fetch(url, options);

  // if (!response.ok) {
  //   throw new Error(response.statusText);
  // }
  // return await response.json();

  const response = await fetch(url, options);
  const data = await response.json();
  if (!response.ok) {
    throw data;
  } else {
    return data;
  }
};