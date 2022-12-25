async function isFollowedByMe(profileId: string, accessToken: string): Promise<any> {
  let headersList = {
    Accept: "*/*",
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };

  let gqlBody = {
    query: `query Profile($id:ProfileId!) {
  profile(request: { profileId: $id }) {
    isFollowedByMe
  }
}`,
    variables: { id: profileId },
  };

  let bodyContent = JSON.stringify(gqlBody);

  let response = await fetch("https://api-mumbai.lens.dev/", {
    method: "POST",
    body: bodyContent,
    headers: headersList,
  });

  let data = await response.json();
  return data;
}
export default isFollowedByMe;
