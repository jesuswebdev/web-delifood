import * as fromUser from './user/user.reducer';
import * as fromUsers from './users/users.reducer';
import * as fromCategory from './category/category.reducer';

export interface State {
    user: fromUser.State;
    users: fromUsers.State;
    category: fromCategory.State;
}

export const reducers = {
    user: fromUser.reducer,
    users: fromUsers.reducer,
    category: fromCategory.reducer
};

export const selectUsers = (state: State) => state.users.users;
export const selectCategories = (state: State) => state.category.categories;
