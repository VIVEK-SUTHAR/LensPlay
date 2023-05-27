import { type Maybe, type MetadataOutput } from "../types/generated";

function getVideoDuration(metadata: MetadataOutput): any {
	let duration: Maybe<string> | undefined;

	metadata.attributes.filter((attribute) => {
		if (attribute.traitType === "durationInSeconds") {
			duration = attribute.value;
			return duration;
		} else {
			return "00:00";
		}
	});
}
export default getVideoDuration;
