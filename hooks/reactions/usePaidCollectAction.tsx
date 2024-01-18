import { Supported_Currencies } from "constants/Currencies";
import {
    Amount,
	OpenActionModule,
	OpenActionModuleType,
	PrimaryPublication,
	useApprovedModuleAllowanceAmountLazyQuery,
	useApprovedModuleAllowanceAmountQuery,
} from "customTypes/generated";
import React, { useState } from "react";
import { useActivePublication, useAuthStore } from "store/Store";
import Logger from "utils/logger";

export function getPubOpenAction(
	publication: PrimaryPublication
): OpenActionModuleType | undefined {
	const pubOpenAction = publication.openActionModules[0].__typename;
	if (pubOpenAction === "LegacyFeeCollectModuleSettings") {
		return OpenActionModuleType.LegacyFeeCollectModule;
	}
	if (pubOpenAction === "LegacySimpleCollectModuleSettings") {
		return OpenActionModuleType.LegacySimpleCollectModule;
	}
	if (pubOpenAction === "SimpleCollectOpenActionSettings") {
		return OpenActionModuleType.SimpleCollectOpenActionModule;
	}
	return undefined;
}

export function getModuleCurrency(
	publication: PrimaryPublication
): string | undefined {
	const collectModule = publication.openActionModules[0];
	if (collectModule.__typename === "SimpleCollectOpenActionSettings") {
		return collectModule.amount.asset.contract.address;
	}
	if (collectModule.__typename === "LegacyFeeCollectModuleSettings") {
		return collectModule.amount.asset.contract.address;
	}
	if (collectModule.__typename === "LegacySimpleCollectModuleSettings") {
		return collectModule.amount.asset.contract.address;
	}
}
export function getModuleContract(
	publication: PrimaryPublication
): string | undefined {
	const collectModule = publication.openActionModules[0];
	if (collectModule.__typename === "SimpleCollectOpenActionSettings") {
		return collectModule.contract.address;
	}
	if (collectModule.__typename === "LegacyFeeCollectModuleSettings") {
		return collectModule.contract.address;
	}
	if (collectModule.__typename === "LegacySimpleCollectModuleSettings") {
		return collectModule.contract.address;
	}
}
export function getPubCollectPrice(
	publication: PrimaryPublication
):Amount | undefined {
	const collectModule = publication.openActionModules[0];
	if (collectModule.__typename === "SimpleCollectOpenActionSettings") {
		return collectModule.amount;
	}
	if (collectModule.__typename === "LegacyFeeCollectModuleSettings") {
		return collectModule.amount;
	}
	if (collectModule.__typename === "LegacySimpleCollectModuleSettings") {
		return collectModule.amount;
	}
}

function usePaidCollectAction() {
	const [allowence, setAllowence] = useState<number | undefined>(undefined);
	const { accessToken } = useAuthStore();
	const { activePublication } = useActivePublication();
	if (!activePublication) return;
	Logger.Log("Currency", getModuleCurrency(activePublication));
	if (!getPubOpenAction(activePublication)) return;
	const pubOpenAction: OpenActionModule =
		activePublication.openActionModules[0];
	const {} = useApprovedModuleAllowanceAmountQuery({
		variables: {
			request: {
				currencies: [getModuleCurrency(activePublication)!],
				openActionModules: [getPubOpenAction(activePublication)!],
			},
		},
		context: {
			headers: {
				"x-access-token": `Bearer ${accessToken}`,
			},
		},
		onCompleted(data) {
			data.approvedModuleAllowanceAmount.map((item) => {
				console.log(Number(item.allowance.value));
				setAllowence(Number(item.allowance.value));
			});
		},
		onError(error) {
			console.log(error);
		},
	});

	const paidCollect = (publication: PrimaryPublication) => {
		try {
		} catch (error) {}
	};

	return { allowence, paidCollect };
}

export default usePaidCollectAction;
