import getUserNotifications from "../apollo/Queries/getUserNotifications";

async function fetchNotifications(profileId: string, accesToken: string) {
  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    Authorization: "Bearer " + accesToken,
    "Content-Type": "application/json",
  };

  let gqlBody = {
    query: getUserNotifications,
    variables: { pid: profileId },
  };

  let bodyContent = JSON.stringify(gqlBody);

  let response = await fetch("https://api-mumbai.lens.dev/", {
    method: "POST",
    body: bodyContent,
    headers: headersList,
  });

  let data = await response.text();
  return data;
}
export default fetchNotifications;
