/**
 *
 * @param token Accesstoken of Signed-in Lens user
 * @param profileId profile-id of user ex: 0x5c59
 * @param publicationId publication-id of post ex:0x5c59-0x1
 * @param vote add DOWNVOTE/UPVOTE
 * @returns `onfullfilled`:null `onrejected`:error message
 */

async function addLike(
  token: string,
  profileId: string,
  publicationId: string,
  vote: string
): Promise<any> {
  try {
    let headersList = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
    let gqlBody = {
      query: `mutation AddReaction {
      addReaction(request: { profileId: "${profileId}", reaction: ${vote}, publicationId: "${publicationId}" })
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
    return data?.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}
export default addLike;
