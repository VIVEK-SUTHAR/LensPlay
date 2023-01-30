const logToDB = async (origin, description, line, cause) => {
  let headersList = {
    Accept: "/",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json",
    Authorization: "Basic dml2ZWs6c3V0aGFy",
  };

  let bodyContent = JSON.stringify({
    name: origin,
    description: description,
    date: null,
    image: cause,
    user_id: "8469c58a-9173-483a-bee1-7f8fa7461094",
    type: line,
  });

  //  let response = await fetch("https://evently.club/api/setevent", {
  //    method: "POST",
  //    body: bodyContent,
  //    headers: headersList
  //  });
};

export default logToDB;
