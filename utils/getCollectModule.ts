import { CollectModules } from "./../types/generated";

export type CollectModuleType = {
  type: string;
  isFreeCollect?: boolean;
  isRevertCollect?: boolean;
  followerOnlyCollect?: boolean;
};
function getCollectModule(userSelectedCollectModule: CollectModuleType) {
  if (userSelectedCollectModule.isRevertCollect) {
    return {
      revertCollectModule: true,
    };
  }
  return {
    freeCollectModule: {
      followerOnly: userSelectedCollectModule.followerOnlyCollect as boolean,
    },
  };
}
export default getCollectModule;
