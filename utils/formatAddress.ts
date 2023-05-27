import { ADDRESS_REGEX } from "../constants";
/**
 *
 * @param address Ethereum Address
 * @returns Shorted Address ex:0xa5...c50
 */

const formatAddress = (address: string | undefined): string => {
	if (address === undefined) {
		return "";
	}

	if (address.match(ADDRESS_REGEX) != null) {
		return `${address.slice(0, 4)}…${address.slice(address.length - 4, address.length)}`;
	}

	return address;
};

export default formatAddress;
