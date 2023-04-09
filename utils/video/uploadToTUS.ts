import * as tus from "tus-js-client";

export type TusUploadRequestOptions = {
  videoBlob: Blob;
  tusEndPoint: string;
  onSucessCallBack: () => void;
  onError: () => void;
  onProgress: (bytesSent: number, bytesTotal: number) => void;
};
/**
 *
 * @param params See `TusUploadRequestOptions`
 *
 */
async function uploadToTus(params: TusUploadRequestOptions): Promise<void> {
  const { tusEndPoint, videoBlob, onSucessCallBack, onProgress } = params;
  const uploader = new tus.Upload(videoBlob, {
    endpoint: tusEndPoint,
    onError: (err) => {
      console.error("Error uploading file:", err);
    },
    onProgress: (bytesUploaded, bytesTotal) => {
      onProgress(bytesUploaded, bytesTotal);
    },
    onSuccess: () => {
      console.log("Upload finished:");
      onSucessCallBack();
    },
  });
  uploader.start();
}
export default uploadToTus;
