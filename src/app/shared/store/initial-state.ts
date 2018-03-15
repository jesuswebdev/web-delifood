import { ApplicationState } from "./application.state";
import { UserState } from "./user.state";

export const INITIAL_USER_STATE: UserState = {
    name: undefined,
    email: undefined,
    role: undefined,
    token: undefined
}

export const INITIAL_APPLICATION_STATE: ApplicationState = {
    userState: INITIAL_USER_STATE
}

