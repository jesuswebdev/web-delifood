import * as fromUser from './user/user.reducer';

export interface State {
    user: fromUser.State;
}

export const reducers = {
    user: fromUser.reducer
};