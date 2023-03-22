async function TrackAction(event: string) {
  if (__DEV__) {
    console.log("dev mode");
    return;
  }
  const options = {
    method: "POST",
    headers: { accept: "text/plain", "content-type": "application/json" },
    body: JSON.stringify([
      {
        properties: {
          token: "99c7752eb9896ed47d99f588a86a7e98",
        },
        event: event,
      },
    ]),
  };

  fetch("https://api.mixpanel.com/track", options)
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
}
export default TrackAction;
