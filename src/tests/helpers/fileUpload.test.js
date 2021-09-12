import cloudinary from 'cloudinary';

const { fileUpload } = require('helpers/fileUpload');

const config = {
  cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
  api_secret: process.env.REACT_APP_CLOUDINARY_API_SECRET,
  secure: true,
};
cloudinary.config(config);

describe('pruebas en fileUpload', () => {
  test('debe de cargar una imagen y retornar el url', async () => {
    const response = await fetch(
      'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png',
    );
    const blob = await response.blob();

    const file = new File([blob], 'foto.png');
    const url = await fileUpload(file);

    expect(typeof url).toBe('string');

    const segments = url.split('/');
    const imgId = segments[segments.length - 1].replace('.png', '');

    await cloudinary.v2.api.delete_resources(imgId);
  });

  test('debe de retornar u null en caso de no enviar el archivo', async () => {
    const file = new File([], 'foto.png');
    const url = await fileUpload(file);

    expect(url).toBe(null);
  });
});
