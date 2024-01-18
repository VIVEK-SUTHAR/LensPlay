import { LENSPLAY_SITE } from "constants/index";
import {
	OpenActionModule,
	TriStateValue,
	useActOnOpenActionMutation,
	useLegacyCollectMutation,
} from "customTypes/generated";
import { useCallback } from "react";
import {
	useActivePublication,
	useAuthStore,
	useReactionStore,
	useToast,
} from "store/Store";
import Logger from "utils/logger";
import usePaidCollectAction from "./usePaidCollectAction";
import useApproveAllownce from "hooks/useApproveAllownce";

function useCollectAction() {
	const toast = useToast();
	const { accessToken } = useAuthStore();
	const { collectStats, setCollectStats } = useReactionStore();
	const [actOnSimpleOpenAction] = useActOnOpenActionMutation();
	const [lagecyCollect] = useLegacyCollectMutation();
	const { approveAllowance } = useApproveAllownce();
	const activePublication = useActivePublication((s) => s.activePublication);
	const allo = usePaidCollectAction();
	console.log(allo);

	const context = {
		headers: {
			"x-access-token": `Bearer ${accessToken}`,
			origin: LENSPLAY_SITE,
		},
	};
	function onCompleted<TData, TOptions>(data: TData, clientOptions: TOptions) {
		toast.success("Collected !");
		setCollectStats(true, collectStats.collectCount + 1);
		console.log("data", data);
	}
	function onError<TData, TOptions>(error: TData, clientOptions: TOptions) {
		console.log("error", error);
	}
	const collect = useCallback(async () => {
		try {
			if (!activePublication) return;
			console.log("activePublication", activePublication.openActionModules);

			const canCollect = activePublication?.operations?.canAct;
			if (
				canCollect === TriStateValue.No ||
				canCollect === TriStateValue.Unknown
			) {
				toast.error("You cannot collect this publication");
				return;
			}
			const openActionModule: OpenActionModule =
				activePublication.openActionModules[0];
			console.log(openActionModule.__typename);

			const isSupportedModule =
				openActionModule?.__typename?.includes("LegacyFree") ||
				openActionModule?.__typename?.includes("LegacySimple") ||
				openActionModule?.__typename?.includes(
					"SimpleCollectOpenActionSettings"
				);
			if (!isSupportedModule) {
				toast.error("Collect is not supported yet");
				return;
			}

			let collectAmount = 0;
			let isBasicCollect = false;
			const collectModule = openActionModule;
			if (
				collectModule.__typename === "LegacySimpleCollectModuleSettings" ||
				collectModule.__typename === "SimpleCollectOpenActionSettings"
			) {
				collectAmount = Number(collectModule?.amount?.value);
			}

			const isFreeCollect = collectAmount == 0;
			isBasicCollect = isFreeCollect && !openActionModule?.followerOnly;

			Logger.Log("isFreeCollect: ", isFreeCollect);
			Logger.Log("isBasicCollect: ", isBasicCollect);

			if (isSupportedModule && !isFreeCollect) {
				approveAllowance(activePublication);
				toast.error("Paid Collect is not supported yet");
				return;
			}
			if (collectModule.__typename?.includes("LegacyFree") && isBasicCollect) {
				Logger.Log("Collecting via Legacy Free Collect...", isBasicCollect);
				await lagecyCollect({
					variables: {
						request: {
							on: activePublication?.id,
						},
					},
					context: context,
					onCompleted: onCompleted,
					onError: onError,
				});
			}
			console.log("collectModule", collectModule);

			return;
			if (
				collectModule.__typename?.includes("LegacySimple") &&
				isBasicCollect
			) {
				Logger.Log("Collecting...", isBasicCollect);
				await lagecyCollect({
					variables: {
						request: {
							on: activePublication?.id,
						},
					},
					context: context,
					onCompleted: onCompleted,
					onError: onError,
				});
			}
			if (collectModule.__typename === "SimpleCollectOpenActionSettings") {
				console.log("Collecting..", isBasicCollect);
				await actOnSimpleOpenAction({
					variables: {
						request: {
							actOn: {
								simpleCollectOpenAction: true,
							},
							for: activePublication.id,
						},
					},
					context: context,
					onCompleted: onCompleted,
					onError: onError,
				});
			}
		} catch (error) {}
	}, [activePublication, accessToken]);

	return { collect };
}

export default useCollectAction;
