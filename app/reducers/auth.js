import * as authActions from '../consts/auth-action';
import * as authStates from '../consts/auth-states';

export const auth = (state = {}, { type, payload }) => {
  switch (type) {
    case authActions.START:
      return {
        ...state,
        state: authStates.STARTED,
        token: payload,
      };
    case authActions.SUCCESS:
      return {
        ...state,
        state: authStates.LOGGED,
        user: payload
      };
    case authActions.LOG_OUT:
      return {
        ...state,
        state: authStates.NOT_LOGGED,
        token: 'null',
        user: {}
      };
    case authActions.FAILURE:
      return {
        ...state,
        state: authStates.FAILED,
        token: '',
        user: {}
      };
    default:
      return state;
  }
};

export default auth;
