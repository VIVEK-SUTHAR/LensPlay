import { ReferenceModuleType } from "customTypes/Store";

function getReferenceModule(
  userSelectedReferenceModule: ReferenceModuleType | null
) {
  if (userSelectedReferenceModule?.isFollowerOnly) {
    return {
      followerOnlyReferenceModule: true,
    };
  }
  if (
    userSelectedReferenceModule?.degreesOfSeparationReferenceModule?.isEnabled
  ) {
    return {
      degreesOfSeparationReferenceModule: {
        commentsRestricted: true,
        mirrorsRestricted: true,
        degreesOfSeparation:
          userSelectedReferenceModule?.degreesOfSeparationReferenceModule
            ?.seperationLevel,
      },
    };
  }
  return null;
}
export default getReferenceModule;
