export const initialState = {
  status: 'no-authenticated', // *status:checking, no-authenticated, authenticated
  uid: '',
  email: '',
  displayName: '',
  photoURL: '',
  errorMessage: '',
};

export const authenticatedState = {
  status: 'authenticated',
  uid: '123',
  email: 'test@test.com',
  displayName: 'test',
  photoURL: 'https://foto.jpg',
  errorMessage: '',
};

export const demoUser = {
  uid: '123',
  email: 'test@test.com',
  displayName: 'test',
  photoURL: 'https://foto.jpg',
};
