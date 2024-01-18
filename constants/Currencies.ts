export const WMaticAddress = "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270";
export const USDCAddress = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";
export const Supported_Currencies = {
	USDC: { symbol: "USDC", address: USDCAddress },
	WMATIC: { symbol: "WMATIC", address: WMaticAddress },
};

export const ERC20 = [
	{
		name: 'transfer',
		type: 'function',
		inputs: [
			{ name: '_to', type: 'address' },
			{ name: '_value', type: 'uint256' },
		],
		outputs: [{ name: '', type: 'bool' }],
		constant: false,
		payable: false,
		stateMutability: 'nonpayable',
	},
	{
		name: 'approve',
		type: 'function',
		inputs: [
			{ name: '_spender', type: 'address' },
			{ name: '_value', type: 'uint256' },
		],
		outputs: [{ name: '', type: 'bool' }],
		constant: false,
		payable: false,
		stateMutability: 'nonpayable',
	},
]
