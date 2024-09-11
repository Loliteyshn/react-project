import { Dispatch } from "redux";
import { chatAPI, ChatMessageAPIType, StatusType } from "../api/chat-api";
import { getAuthUserData } from "./auth-reducer";
import { BaseThunkType, InferActionsTypes } from "./redux-store";
import { v4 } from "uuid";


let initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as StatusType
};

type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>
type ChatMessageType = ChatMessageAPIType & { id: string }

const chatReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "SN/CHAT/MESSAGES_RECEIVED":            
            return {
                ...state,
                messages: [...state.messages, ...action.payload
                    .map(m => ({ ...m, id: v4() }))]
                    .filter((m, index, array) => index >= array.length - 100)
            }
        case "SN/CHAT/STATUS_CHANGED":
            return {
                ...state,
                status: action.payload
            }
        default:
            return state;
    }
};

export const actions = {
    messagesReceived: (messages: ChatMessageAPIType[]) => ({
        type: "SN/CHAT/MESSAGES_RECEIVED", payload: messages
    } as const),
    statusChanged: (status: StatusType) => ({
        type: "SN/CHAT/STATUS_CHANGED", payload: status
    } as const)
}

let _newMessageHandler: ((messages: ChatMessageAPIType[]) => void) | null = null;
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesReceived(messages));
        }
    }
    return _newMessageHandler;
}

let _statusChangedHandler: ((status: StatusType) => void) | null = null;
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(actions.statusChanged(status));
        }
    }
    return _statusChangedHandler;
}

export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.start();
    chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch));
    chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch));
}

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.unsubscribe('messages-received', newMessageHandlerCreator(dispatch));
    chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch));
    chatAPI.stop();
}

export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    chatAPI.sendMessage(message);
}

export default chatReducer;