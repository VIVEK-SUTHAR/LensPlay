/**
 *
 * @param token Accesstoken of Signed-in Lens user
 * @param profileId profile-id of user ex: 0x5c59
 * @param publicationId publication-id of post ex:0x5c59-0x1
 * @returns `onfullfilled`:null `onrejected`:error message
 */

async function removeLike(
    token: string,
    profileId: string,
    publicationId: string
  ) {
    let headersList = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
    let gqlBody = {
      query: `mutation RemoveReaction {
        removeReaction(request: { profileId: "${profileId}", reaction: UPVOTE, publicationId: "${publicationId}" })
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
  export default removeLike;