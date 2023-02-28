const canUploadToArweave = (blob: Blob | undefined) => {
    if (blob?.size < 100000){
        return true;
    }
    else {
        return false;
    }
}
export default canUploadToArweave;