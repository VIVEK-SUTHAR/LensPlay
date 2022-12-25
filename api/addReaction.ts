async function addLike(
  token: string,
  profileId: string,
  publicationId: string
): Promise<any> {
  let headersList = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };
  let gqlBody = {
    query: `mutation AddReaction {
      addReaction(request: { profileId: "${profileId}", reaction: UPVOTE, publicationId: "${publicationId}" })
    }
`,
    variables: "{}",
  };
  let bodyContent = JSON.stringify(gqlBody);
  let response = await fetch("https://api-mumbai.lens.dev", {
    method: "POST",
    body: bodyContent,
    headers: headersList,
  });
  let data = await response.json();
  console.log(data?.data);
  return data?.data;
}
export default addLike;
