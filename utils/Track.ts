import Logger from "./logger";

async function TrackAction(event: string) {
  
  const options = {
    method: "POST",
    headers: { accept: "text/plain", "content-type": "application/json" },
    body: JSON.stringify([
      {
        properties: {
          token: "33a7ed7c61c940384d30edaf7d54d663",
        },
        event: event,
      },
    ]),
  };

  fetch("https://api.mixpanel.com/track", options)
    .then((res) => res.json()).then((res)=>Logger.Success('mix panell',res))
    .catch((err) => console.error(err));
}
export default TrackAction;
