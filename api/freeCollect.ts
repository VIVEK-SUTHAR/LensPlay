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
    let bodyContent = JSON.stringify(gqlBody);
    let response = await fetch("https://api-mumbai.lens.dev", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    });
    let data = await response.json();
    if (data?.data?.proxyAction) {
      return data?.data?.proxyAction;
    } else if (data?.errors) {
      if (
        data?.errors[0].message ===
        "Can only collect if the publication has a `FreeCollectModule` set"
      ) {
        throw new Error("You can't collect this post");
      } else if (
        data?.errors[0].message ===
        "You have already collected this publication"
      ) {
        throw new Error("You have already collected this post");
      } else {
        throw new Error("Something wen't wrong");
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}
export default freeCollectPublication;
