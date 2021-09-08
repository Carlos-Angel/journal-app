const { fileUpload } = require('helpers/fileUpload');

describe('pruebas en fileUpload', () => {
  test('debe de cargar una imagen y retornar el url', async () => {
    const response = await fetch(
      'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png',
    );
    const blob = await response.blob();

    const file = new File([blob], 'foto.png');
    const url = await fileUpload(file);

    expect(typeof url).toBe('string');
  });

  test('debe de retornar u null en caso de no enviar el archivo', async () => {
    const file = new File([], 'foto.png');
    const url = await fileUpload(file);

    expect(url).toBe(null);
  });
});
