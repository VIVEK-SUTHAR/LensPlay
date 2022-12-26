/**
 *
 * @param profileId profile-id of user that you want to check ex: 0x5c59
 * @param accessToken accesstoken of Signed-in Lens user
 * @returns true if user is following the user and false if not following `@defalt`:false
 */

async function isFollowedByMe(
  profileId: string,
  accessToken: string
): Promise<any> {
  try {
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
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}
export default isFollowedByMe;
