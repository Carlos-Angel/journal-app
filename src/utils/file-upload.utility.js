import { getEnvironments } from './get-environments.utility';

export const fileUpload = async (file) => {
  if (!file) throw new Error('No tenemos ningún archivo a subir');

  const { VITE_CLOUDINARY_URL, VITE_CLOUDINARY_UPLOAD_PRESET } = getEnvironments();

  const cloudUrl = VITE_CLOUDINARY_URL;
  const uploadPreset = VITE_CLOUDINARY_UPLOAD_PRESET;

  const formData = new FormData();
  formData.append('upload_preset', uploadPreset);
  formData.append('file', file);

  try {
    const resp = await fetch(cloudUrl, {
      method: 'POST',
      body: formData,
    });

    if (!resp.ok) throw new Error('No se pudo subir imagen');
    const cloudResp = await resp.json();

    return cloudResp.secure_url;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};
