function getFileMimeType(filePath: string): string {
	if (!filePath.startsWith("file:///")) {
		throw new Error("Provide Valid File Path");
	}
	const reversePath = filePath.split("").reverse().join("");
	const reverseType = reversePath.split(".")[0];
	const type = reverseType.split("").reverse().join("");
	return type;
}
export default getFileMimeType;
