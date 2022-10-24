import { checkingCredentials } from '../../../../src/store/auth/auth.slice';
import checkingAuthentication from '../../../../src/store/auth/thunks/checkingAuthentication.thunk';

describe('pruebas en checkingAuthentication', () => {
  test('debe de invocar el checkingCredentials', async () => {
    const dispatch = jest.fn();

    await checkingAuthentication()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
  });
});
