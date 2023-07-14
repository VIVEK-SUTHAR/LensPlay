/**
 *
 * @param uri local uri of image
 * @returns blob of image
 */

import Logger from "./logger";
import * as FileSystem from 'expo-file-system';
import ReactNativeBlobUtil from 'react-native-blob-util'

const getVideoBlobFromUri = async (uri: string) => {
  try {
    const lulu = await ReactNativeBlobUtil.fetch('GET', uri, {
    // more headers  ..
});
Logger.Error(''+lulu);

    // Logger.Success('ramji', blob._data.__collector);
    // return blob;
    // const fileStat = await FileSystem.getInfoAsync(uri);
    // const fileSize = fileStat.size;
    // Logger.Log(fileSize,'Heres the file size');

    // const chunkSize = 1024 * 1024 * 20; // 1MB chunk size (adjust as needed)
    // const totalChunks = Math.ceil(fileSize / chunkSize);
    // const chunks = [];

    // for (let i = 0; i < totalChunks; i++) {
    //     Logger.Log(i + 'the loop')
    //   const start = i * chunkSize;
    //   const end = Math.min(start + chunkSize, fileSize);
    //   const chunk = await FileSystem.readAsStringAsync(uri, {
    //     // encoding: FileSystem.EncodingType.Base64,
    //     position: start,
    //     length: end - start,
    //   });

    // //   const chunkData = atob(chunk); // Decode base64 string to binary data
    //   const byteArray = new Uint8Array(chunk.length);
    //   for (let j = 0; j < chunk.length; j++) {
    //     byteArray[j] = chunk.charCodeAt(j);
    //   }
    //   chunks.push(byteArray);
    // }

    // // const blobData = new Blob([chunks.buffer], { type: 'image/jpeg' });

    // const blobData = new Blob(chunks, { type: 'video/mp4' });
    // // Logger.Success('godji2',blobData);
    // // Logger.Success('ramji2', blob._data.__collector);
    // return blobData;

  } catch (error) {
    if (error instanceof Error) {
      // console.log(error);
    }
  }
};
export default getVideoBlobFromUri;
