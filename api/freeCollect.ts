/**
 *
 * @param publicationId publication-id of post ex:0x5c59-0x1
 * @param accessToken accesstoken of Signed-in Lens user
 * @returns `onfullfilled`:Proxyid that can be tracked to check if txn has been mined
 * `onrejected`: error message with valid reason
 *
 */

async function freeCollectPublication(
  publicationId: string,
  accessToken: string
): Promise<any> {
  try {
    let headersList = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    };
    let gqlBody = {
      query: `mutation ProxyAction($pubId: InternalPublicationId!) {
  proxyAction(request: {
    collect: {
      freeCollect: {
        publicationId: $pubId
      }
    }
  })
}`,
      variables: { pubId: publicationId },
    };
    console.log(gqlBody);
    let bodyContent = JSON.stringify(gqlBody);
    let response = await fetch("https://api-mumbai.lens.dev", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    });
    let data = await response.json();
    console.log(data.data);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}
export default freeCollectPublication;
