import { getAuthUserData } from "./auth-reducer";
import { InferActionsTypes } from "./redux-store";

let initialState = {
    initialized: false,
};

type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "SN/APP/INITIALIZED_SUCCESS":
            return {
                ...state,
                initialized: true
            };
        default:
            return state;
    }
};

export const actions = {
    initializedSuccess: () => ({ type: "SN/APP/INITIALIZED_SUCCESS" })
}


export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData());
    promise.then(() => {
        dispatch(actions.initializedSuccess())
    })
}


export default appReducer;