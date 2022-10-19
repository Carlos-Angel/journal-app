import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from '../../src/utils/file-upload.utility';

cloudinary.config({
  cloud_name: process.env.VITE_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.VITE_CLOUDINARY_API_KEY,
  api_secret: process.env.VITE_CLOUDINARY_API_SECRET,
  secure: true,
});

describe('prueba en fileUpload', () => {
  test('debe de subir el archivo correctamente a cloudinary', async () => {
    const imageUrl =
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80';
    const resp = await fetch(imageUrl);
    const blob = await resp.blob();

    const file = new File([blob], 'foto.jpg');

    const url = await fileUpload(file);

    expect(typeof url).toBe('string');

    const segments = url.split('/');

    const imageId = segments[segments.length - 1].replace('.jpg', '');

    await cloudinary.api.delete_resources([`react-journal/${imageId}`], {
      resource_type: 'image',
    });
  });

  test('debe fallar fileUpload si no se envía una imagen', async () => {
    try {
      const file = new File([], 'foto.jpg');
      await fileUpload(file);
      expect(true).toBe(false);
    } catch (error) {
      expect(typeof error.message).toBe('string');
    }
  });
});
