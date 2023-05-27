import { type ReferenceModuleType } from "../types/Store";

function getReferenceModule(userSelectedReferenceModule: ReferenceModuleType | null): any {
	if (userSelectedReferenceModule?.isFollowerOnly === true) {
		return {
			followerOnlyReferenceModule: true,
		};
	}
	if (userSelectedReferenceModule?.degreesOfSeparationReferenceModule?.isEnabled === true) {
		return {
			degreesOfSeparationReferenceModule: {
				commentsRestricted: true,
				mirrorsRestricted: true,
				degreesOfSeparation:
					userSelectedReferenceModule?.degreesOfSeparationReferenceModule?.seperationLevel,
			},
		};
	}
	return null;
}
export default getReferenceModule;
