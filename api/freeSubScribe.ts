export default async function createSubScribe(
  profileId: string,
  accessToken: string
) {
  try {
    console.log(profileId);

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
    console.log(gqlBody);
    let bodyContent = JSON.stringify(gqlBody);
    let response = await fetch("https://api-mumbai.lens.dev", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    });
    // console.log(response);
    let data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}
