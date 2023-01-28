/**
 *
 * @param publicationId publication-id of post ex:0x5c59-0x1
 * @param accessToken accesstoken of Signed-in Lens user
 * @param profileId profile-id of user ex: 0x5c59
 * @returns `onfullfilled`:Proxyid that can be tracked to check if txn has been mined
 * `onrejected`: error message with valid reason
 *
 */

async function freeMirror(
    accessToken: string,
    profileId: string,
    publicationId: string,
  ): Promise<any> {
    try {
      let headersList = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      };
      let gqlBody = {
        query: `
        mutation CreateMirrorViaDispatcher(
          $pid: ProfileId!
          $pubId: InternalPublicationId!
        ) {
          createMirrorViaDispatcher(
            request: {
              profileId: $pid
              publicationId: $pubId
              referenceModule: { followerOnlyReferenceModule: false }
            }
          ) {
            ... on RelayerResult {
              txHash
              txId
            }
            ... on RelayError {
              reason
            }
          }
        }
      `,
        variables: { pid: profileId ,pubId: publicationId },
      };
      let bodyContent = JSON.stringify(gqlBody);
      let response = await fetch("https://api-mumbai.lens.dev", {
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
  export default freeMirror;