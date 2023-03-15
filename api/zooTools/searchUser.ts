async function searchUser(address: string) {
  const headersList = {
    "Content-Type": "application/json",
    Authorization:
      "Bearer zootools-api-token-4f6a024c-84ae-4eb6-b3b8-e525994c4f4e",
  };

  const bodyContent = JSON.stringify({
    cryptoAddress: address,
  });

  try {
    const response = await fetch(
      "https://audience-consumer-api.zootools.co/lists/WzNdl6Tusvm3k89B3yKL/members/search",
      {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      }
    );
    const userData = await response.json();
    return userData;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}
export default searchUser;
