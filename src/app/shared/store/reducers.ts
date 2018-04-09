import * as fromUser from './user/user.reducer';
import * as fromUsers from './users/users.reducer';
import * as fromCategory from './category/category.reducer';
import * as fromProduct from './product/product.reducer';
import * as fromCart from './cart/cart.reducer';

export interface State {
    user: fromUser.State;
    users: fromUsers.State;
    category: fromCategory.State;
    product: fromProduct.State;
    cart: fromCart.State;
}

export const reducers = {
    user: fromUser.reducer,
    users: fromUsers.reducer,
    category: fromCategory.reducer,
    product: fromProduct.reducer,
    cart: fromCart.reducer
};

export const selectUsers = (state: State) => state.users.users;
export const selectCategories = (state: State) => state.category.categories;
export const selectProducts = (state: State) => state.product.products;
export const selectCartItems = (state: State) => state.cart.items; 
export const selectCartItemsCount = (state: State) => state.cart.itemCount;
