import { CreateUnfollowTypedDataMutationResult } from "customTypes/generated";

function formatUnfollowTypedData(response: CreateUnfollowTypedDataMutationResult) {
	const typedData = response?.data?.createUnfollowTypedData?.typedData;
	const values = typedData?.value;
	const domain = typedData?.domain;

	const formattedTypedData = {
		types: {
			EIP712Domain: [
				{
					name: "name",
					type: "string",
				},
				{
					name: "version",
					type: "string",
				},
				{
					name: "chainId",
					type: "uint256",
				},
				{
					name: "verifyingContract",
					type: "address",
				},
			],
			BurnWithSig: [
				{
					name: "tokenId",
					type: "uint256",
				},
				{
					name: "nonce",
					type: "uint256",
				},
				{
					name: "deadline",
					type: "uint256",
				},
			],
		},
		domain: {
			name: domain?.name,
			version: domain?.version,
			chainId: domain?.chainId,
			verifyingContract: domain?.verifyingContract,
		},
		primaryType: "BurnWithSig",
		message: {
			tokenId: values?.tokenId,
			nonce: values?.nonce,
			deadline: values?.deadline,
		},
	};
	return formattedTypedData;
}

export default formatUnfollowTypedData;
