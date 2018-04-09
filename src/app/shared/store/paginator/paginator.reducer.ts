// import * as Paginator from './paginator.actions';

export interface State {
    productsCount: number;
    totalPages: number;
    loadedPages: number[],
    currentPage: number;
};

const initialState: State = {
        productsCount: 0,
        totalPages: 0,
        loadedPages: [],
        currentPage: 1
};

// export function reducer(state = initialState, action: Paginator.Actions ): State {
//     switch (action.type) {
//         case Paginator.ActionTypes.TYPE: {
//         }

//         default: {
//             return state;
//         }
//     }
// }
