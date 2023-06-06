import getRawurl from "utils/getRawUrl";
import getIPFSLink from "utils/getIPFSLink";
import Logger from "utils/logger";
async function getPubCoverImage(publicationId: string): Promise<string | undefined> {
	try {
		let headersList = {
			"Content-Type": "application/json",
		};
		let gqlBody = {
			query: `
        query CoverImage($pubId:InternalPublicationId!) {
  publication(request:{publicationId:$pubId}){
    ... on Post{
      metadata{
        cover{
          original{
            url
          }
          optimized{
            url
          }
        }
      }
    }
    ... on Mirror {
      metadata{
        cover{
          original{
            url
          }
          optimized{
            url
          }
        }
      }
    }
  }
}
      `,
			variables: { pubId: publicationId },
		};
		let bodyContent = JSON.stringify(gqlBody);
		let response = await fetch("https://api.lens.dev", {
			method: "POST",
			body: bodyContent,
			headers: headersList,
		});
		let data = await response.json();
		const imageUrl = data?.data?.publication?.metadata?.cover?.original?.url;
		Logger.Success("Got cover from lens", imageUrl);
		return imageUrl;
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message);
		}
	}
}
export default getPubCoverImage;
