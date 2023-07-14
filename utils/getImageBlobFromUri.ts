/**
 *
 * @param uri local uri of image
 * @returns blob of image
 */

import Logger from "./logger";
import * as FileSystem from 'expo-file-system';

const getImageBlobFromUri = async (uri: string) => {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    Logger.Success('godji1',blob);
    return blob;
   
  } catch (error) {
    if (error instanceof Error) {
      // console.log(error);
    }
  }
};
export default getImageBlobFromUri;
