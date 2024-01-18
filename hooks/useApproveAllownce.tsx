import { PrimaryPublication } from "customTypes/generated";
import React from "react";
import { Alert } from "react-native";
import { useAccount, useContractWrite } from "wagmi";
import {
	getModuleContract,
	getPubCollectPrice,
} from "./reactions/usePaidCollectAction";
import { ERC20 } from "constants/Currencies";
import { writeContract as writeContractWC } from "@wagmi/core";
function useApproveAllownce() {
	const { isConnected } = useAccount();

	const approveAllowance = async (publication: PrimaryPublication) => {
		try {
			if (!isConnected) {
				Alert.alert("Error", "Please connect your wallet");
				return;
			}

			const openActionModule = publication.openActionModules?.[0];
			console.log("openActionModule", openActionModule);
			let spender = getModuleContract(publication);
			let amount = getPubCollectPrice(publication);
			if (!amount) return;
			let amountInWei = "" + amount?.value * 10 ** amount?.asset.decimals;
			console.log(
				"approveAllowance",
				amount?.asset?.contract?.address,
				spender,
				amountInWei
			);
			const params = {
				chainId: amount?.asset?.contract?.chainId,
				address: amount?.asset?.contract?.address,
				abi: ERC20,
				functionName: "approve",
				args: [spender, amountInWei],
			};
			await writeContractWC(params);
		} catch (e) {
			console.log(JSON.stringify(e, null, 2));

			return false;
		}
	};
    return {approveAllowance}
}

export default useApproveAllownce;
