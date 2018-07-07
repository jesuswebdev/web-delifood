import { Action } from '@ngrx/store';
import { Comment } from '@delifood/store/comments/comment.model';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum CommentActionTypes {
    LOAD_COMMENTS = '[Comment] LOAD_COMMENTS',
    SEND_COMMENT_SUCCESS = '[Comment] SEND_COMMENT_SUCCESS'
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */
export class LoadComments implements Action {
    readonly type = CommentActionTypes.LOAD_COMMENTS;

    constructor(public payload: Comment[]) { }
}

export class SendCommentSuccess implements Action {
    readonly type = CommentActionTypes.SEND_COMMENT_SUCCESS;

    constructor(public payload: Comment) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type All
               = LoadComments
               | SendCommentSuccess;
