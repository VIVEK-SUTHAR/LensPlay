function getFileName(filePath: string) {
	if (!filePath.startsWith("file:///")) {
		throw new Error("Provide Valid File Path");
	}
	let reverseFullPath = filePath.split("").reverse().join("");
	const reverseType = reverseFullPath.split(".")[1];
	const absolutePath = reverseType.split("").reverse().join("");
	const reversePath = absolutePath.split("").reverse().join("");
	const name = reversePath.split("/")[0];
	return name.split("").reverse().join("");
}
export default getFileName;
