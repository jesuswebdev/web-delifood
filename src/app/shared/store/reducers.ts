import * as fromUser from './user/user.reducer';
import * as fromUsers from './users/users.reducer';

export interface State {
    user: fromUser.State;
    users: fromUsers.State
}

export const reducers = {
    user: fromUser.reducer,
    users: fromUsers.reducer
};

export const selectUsers = (state: State) => state.users.users;
