// En caso de necesitar la implementación del FetchAPI
import 'whatwg-fetch'; // <-- yarn add whatwg-fetch

require('dotenv').config({
  path: '.env.test',
});

jest.mock('./src/utils/get-environments.utility', () => ({
  getEnvironments: () => ({ ...process.env }),
}));
