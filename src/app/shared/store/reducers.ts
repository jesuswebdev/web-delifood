import * as fromUser from './user/user.reducer';
import * as fromUsers from './users/users.reducer';
import * as fromCategory from './category/category.reducer';
import * as fromProduct from './product/product.reducer';
import * as fromCart from './cart/cart.reducer';
import * as fromSearch from './search/search.reducer';
import * as fromPaginator from './paginator/paginator.reducer';

export interface State {
    user: fromUser.State;
    users: fromUsers.State;
    category: fromCategory.State;
    product: fromProduct.State;
    cart: fromCart.State;
    paginator: fromPaginator.State;
    search: fromSearch.State;
}

export const reducers = {
    user: fromUser.reducer,
    users: fromUsers.reducer,
    category: fromCategory.reducer,
    product: fromProduct.reducer,
    cart: fromCart.reducer,
    paginator: fromPaginator.reducer,
    search: fromSearch.reducer
};

export const selectUsers = (state: State) => state.users.users;
export const selectCategories = (state: State) => state.category.categories;
export const selectProducts = (state: State) => state.product.products;
export const selectCartItems = (state: State) => state.cart.items; 
export const selectCartItemsCount = (state: State) => state.cart.itemCount;
