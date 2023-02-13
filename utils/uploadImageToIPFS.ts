/**
 *
 * @param imageBlob Blob of Image
 * @returns CID of image
 */

const uploadImageToIPFS = async (imageBlob: Blob | undefined) => {
	try {
		const hash = await fetch("https://api.web3.storage/upload", {
			method: "POST",
			headers: {
				Authorization:
					"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEQzQjZCNEYwMjIzQzNBYUJhYTNGY2FjNzc4QkYzZTcwMzk4MjZDMTEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzYyNjY2NjY2ODIsIm5hbWUiOiJMZW5zUGxheSJ9.yvvWPFyduWg6vQ1H1_TXTpMKlHTUcqnx4Int8vuMdec",
			},
			body: imageBlob,
		});
		let json = await hash.json();
		return json.cid;
	} catch (error) {
		throw new Error("Something went wrong");
	}
};
export default uploadImageToIPFS;
