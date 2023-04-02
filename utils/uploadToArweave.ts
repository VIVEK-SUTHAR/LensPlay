/**
 *
 * @param commentText Content of Comment
 * @param handle lens handle of user with .lens
 * @returns id Arweave txn id
 */

import { PublicationMetadataV2Input } from "../types/generated";

async function uploadToArweave(metadata: PublicationMetadataV2Input) {
  try {
    const headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
      Authorization: "Bearer ENGINEERCANTAKEOVERWORLD",
    };

    const bodyContent = {
      metadata: metadata,
    };

    const response = await fetch(
      `https://lensplay-api.vercel.app/api/upload/postMetadata`,
      {
        method: "POST",
        body: JSON.stringify(bodyContent),
        headers: headersList,
      }
    );
    if (response.ok) {
      const jsondata = await response.json();
      const content_uri = `https://arweave.net/${jsondata.id}`;
      return content_uri;
    }
  } catch (err) {
    if (err instanceof Error) {
      throw new Error("Something went wromg", { cause: err });
    }
  }
}
export default uploadToArweave;
