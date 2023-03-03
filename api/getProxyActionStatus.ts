/**
 *
 * @param proxyId ProxyID which you can get from Dispatcher or `withSig` method
 * @param accessToken accesstoken of Signed-in Lens user
 * @returns Status of Transaction ststing mined or queued or processing
 */

async function getProxyActionStatus(
	proxyId: string,
	accessToken: string
): Promise<boolean | undefined> {
	try {
		let headersList = {
			"Content-Type": "application/json",
			"Authorization": "Bearer " + accessToken,
		};

		let gqlBody = {
			query: PROXY_ACTION_STATUS_QUERY,
			variables: { proxyId: proxyId },
		};
		let bodyContent = JSON.stringify(gqlBody);
		let response = await fetch("https://api-mumbai.lens.dev/", {
			method: "POST",
			body: bodyContent,
			headers: headersList,
		});
		let data = await response.json();
		if (data?.result?.__typename === "ProxyActionStatusResult") {
			return true;
		}
		if (data?.result?.__typename === "ProxyActionError") {
			return false;
		}
	} catch (error) {
		if (error instanceof Error) {
			return false;
		}
	}
}
export default getProxyActionStatus;

const PROXY_ACTION_STATUS_QUERY = `
query ProxyActionStatus($proxyId:ProxyActionId!) {
  proxyActionStatus(proxyActionId: $proxyId) {
    ... on ProxyActionStatusResult {
      txHash
      txId
      status
    }
    ... on ProxyActionError {
      reason
      lastKnownTxId
    }
    ... on ProxyActionQueued {
      queuedAt
    }
  }
}
`;
