import { setError, removeError, finishLoading, startLoading } from 'actions/ui';
import { authTypes } from 'types';

describe('Pruebas en ui-actions', () => {
  test('setError', () => {
    const message = 'HELP!!!';
    const action = setError(message);

    expect(action).toEqual({
      type: authTypes.uiSetError,
      payload: message,
    });
  });

  test('removeError', () => {
    const action = removeError();

    expect(action).toEqual({
      type: authTypes.uiRemoveError,
    });
  });

  test('finishLoading', () => {
    const action = finishLoading();

    expect(action).toEqual({
      type: authTypes.uiFinishLoading,
    });
  });

  test('startLoading', () => {
    const action = startLoading();

    expect(action).toEqual({
      type: authTypes.uiStartLoading,
    });
  });
});
