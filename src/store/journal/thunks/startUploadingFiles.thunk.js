import { fileUpload } from '../../../utils/file-upload.utility';
import { setPhotosToActiveNote, setSaving } from '../journal.slice';

const startUploadingFiles = (files = []) => {
  return async (dispatch) => {
    dispatch(setSaving());

    const fileUploadPromises = [];
    for (const file of files) {
      fileUploadPromises.push(fileUpload(file));
    }

    const photosUrls = await Promise.all(fileUploadPromises);

    dispatch(setPhotosToActiveNote(photosUrls));
  };
};

export default startUploadingFiles;
