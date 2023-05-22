import { Maybe, MetadataOutput } from "../types/generated";

function getVideoDuration(metadata: MetadataOutput) {
  let duration: Maybe<string> | undefined = undefined;

  metadata.attributes.filter((attribute) => {
    if (attribute.traitType === "durationInSeconds") {
      duration = attribute.value;
    }
  });
  return duration || "00:00";
}
export default getVideoDuration;
