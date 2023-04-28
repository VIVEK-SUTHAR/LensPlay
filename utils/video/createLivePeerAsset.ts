import { LIVEPEER_API_TOKEN, LIVEPEER_API_URL } from "./../../constants/index";
async function createLivePeerAsset(fileUrl: string) {
  try {
    console.log("called");

    const livepeerResponse = await fetch(`${LIVEPEER_API_URL}/asset/import`, {
      method: "POST",
      body: JSON.stringify({
        url: fileUrl,
        name: fileUrl,
      }),
      headers: {
        Authorization: `Bearer ${LIVEPEER_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    if (livepeerResponse.ok) {
      const jsonData = await livepeerResponse.json();
      console.log(jsonData.asset.playbackId);
      return jsonData.asset.playbackId;
    }
  } catch (error) {
    console.log(error);
  }
}
export default createLivePeerAsset;
