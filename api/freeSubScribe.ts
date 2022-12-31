/**
 *
 * @param profileId profile-id of user ex: 0x5c59
 * @param accessToken accesstoken of Signed-in Lens user
 * @returns `onfullfilled`:Proxyid that can be tracked to check if txn has been mined
 * `onrejected`: error message with valid reason
 */

export default async function createSubScribe(
  profileId: string,
  accessToken: string
): Promise<any> {
  try {
    let headersList = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    };
    let gqlBody = {
      query: `mutation ProxyAction($id: ProfileId!) {
                proxyAction(request: { follow: { freeFollow: { profileId: $id } } })
              }
            `,
      variables: { id: profileId },
    };
    let bodyContent = JSON.stringify(gqlBody);
    let response = await fetch("https://api-mumbai.lens.dev", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    });
    let data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      throw new Error(error.message);
    }
  }
}
