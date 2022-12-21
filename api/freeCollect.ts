async function freeCollectPublication(
  publicationId: string,
  accessToken: string
) {
  try {
    console.log(accessToken);
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
    console.log(response);
    let data = await response.json();
    console.log(data.data);
    return data;
  } catch (error) {
    console.log(error);
  }
}
export default freeCollectPublication;
