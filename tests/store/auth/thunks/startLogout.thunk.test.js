import { logoutFirebase } from '../../../../src/firebase/providers';
import { logout } from '../../../../src/store/auth/auth.slice';
import startLogout from '../../../../src/store/auth/thunks/startLogout.thunk';
import { clearNotesLogout } from '../../../../src/store/journal/journal.slice';

jest.mock('../../../../src/firebase/providers.js');

describe('pruebas en startLogout', () => {
  test('debe de llamar el logoutFirebase, clearNotes y logout', async () => {
    const dispatch = jest.fn();

    logoutFirebase.mockResolvedValue({ ok: true });

    await logoutFirebase();

    await startLogout()(dispatch);

    expect(logoutFirebase).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
    expect(dispatch).toHaveBeenCalledWith(logout());
  });
});
