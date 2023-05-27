import { IPFS_FREE_UPLOAD_LIMIT } from "../constants";

const canUploadedToIpfs = (bytes: number | undefined): boolean => {
	if (bytes != null) {
		const megaBytes = bytes !== 0 ? bytes / 1024 ** 2 : 0;
		return bytes !== 0 ? megaBytes < IPFS_FREE_UPLOAD_LIMIT : false;
	} else {
		return false;
	}
};

export default canUploadedToIpfs;
