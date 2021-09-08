import { authTypesMock, notesTypesMock } from 'tests/mocks/typesMock';
import { authTypes, notesTypes } from 'types';

describe('Pruebas de nuestros tipos', () => {
  test('deben de contener estos tipos', () => {
    expect(authTypes).toEqual(authTypesMock);
    expect(notesTypes).toEqual(notesTypesMock);
  });
});
