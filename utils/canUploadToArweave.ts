const canUploadToArweave = (blob: Blob | undefined): boolean => {
	if (blob != null) {
		if (blob?.size < 100000) {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
};
export default canUploadToArweave;
