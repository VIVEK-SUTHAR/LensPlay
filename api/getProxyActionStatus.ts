async function getProxyActionStatus(proxyId: string, accessToken: string) {
  let headersList = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + accessToken,
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
  console.log(data);
  console.log(data?.data?.result);
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
