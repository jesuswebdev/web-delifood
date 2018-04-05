import * as fromUser from './user/user.reducer';
import * as fromUsers from './users/users.reducer';
import * as fromCategory from './category/category.reducer';
import * as fromProduct from './product/product.reducer';

export interface State {
    user: fromUser.State;
    users: fromUsers.State;
    category: fromCategory.State;
    product: fromProduct.State
}

export const reducers = {
    user: fromUser.reducer,
    users: fromUsers.reducer,
    category: fromCategory.reducer,
    product: fromProduct.reducer
};

export const selectUsers = (state: State) => state.users.users;
export const selectCategories = (state: State) => state.category.categories;
export const selectProducts = (state: State) => state.product.products;
