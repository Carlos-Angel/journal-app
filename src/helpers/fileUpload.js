export const fileUpload = async (file) => {
  const cloudUrl = process.env.REACT_APP_CLOUDINARY_URL;
  const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
  const formData = new FormData();
  formData.append('upload_preset', uploadPreset);
  formData.append('file', file);

  try {
    const response = await fetch(cloudUrl, { method: 'POST', body: formData });
    if (response.ok) {
      const cloudResp = await response.json();
      return cloudResp.secure_url;
    } else {
      throw await response.json();
    }
  } catch (error) {
    console.log(error.message);
  }
};
