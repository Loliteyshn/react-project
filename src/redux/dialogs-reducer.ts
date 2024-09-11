import { DialogsDataType, MessagesDataType } from "../components/types/types";
import { InferActionsTypes } from "./redux-store";

let initialState = {
    dialogsData: [
        { id: 1, name: "Dimych" },
        { id: 2, name: "Andrew" },
        { id: 3, name: "Sveta" },
        { id: 4, name: "Sasha" },
        { id: 5, name: "Viktor" },
        { id: 6, name: "Valera" },
    ] as Array<DialogsDataType>,
    messagesData: [
        { id: 1, message: "Hi" },
        { id: 2, message: "How is your project" },
        { id: 3, message: "Yo" },
        { id: 4, message: "Yo" },
        { id: 5, message: "Yo" },
        { id: 6, message: "Yo" },
    ] as Array<MessagesDataType>
};

type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>


const dialogReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "SN/Dialogs/ADD-MESSAGE":
            let body = action.newMessageText;
            return {
                ...state,
                messagesData: [...state.messagesData, { id: 7, message: body }],
            };
        default:
            return state;
    }
};

export const actions = {
    addMessage: (newMessageText: string) => ({ type: "SN/Dialogs/ADD-MESSAGE", newMessageText })
}

export default dialogReducer;