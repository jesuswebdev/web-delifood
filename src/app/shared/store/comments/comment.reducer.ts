import * as CommentActions from './comment.actions';
import { Comment } from '@delifood/store/comments/comment.model';

export interface State {
    comments: Comment[]
};

const initialState: State = {
    comments: []
};

export function reducer(state = initialState, action: CommentActions.All ): State {
    switch (action.type) {
        
        case CommentActions.CommentActionTypes.LOAD_COMMENTS: {
            
            return {
                ...state,
                comments: action.payload
            };
        }

        case CommentActions.CommentActionTypes.SEND_COMMENT_SUCCESS: {

            return {
                ...state,
                comments: state.comments.length === 0 ? [action.payload] : [action.payload, ...state.comments]
            }
        }

        default: {
            return state;
        }
    }
}
