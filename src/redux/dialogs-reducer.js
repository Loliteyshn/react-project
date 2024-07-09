const ADD_MESSAGE = "ADD-MESSAGE";

let initialState = {
    dialogsData: [
        { id: 1, name: "Dimych" },
        { id: 2, name: "Andrew" },
        { id: 3, name: "Sveta" },
        { id: 4, name: "Sasha" },
        { id: 5, name: "Viktor" },
        { id: 6, name: "Valera" },
    ],
    messagesData: [
        { id: 1, message: "Hi" },
        { id: 2, message: "How is your project" },
        { id: 3, message: "Yo" },
        { id: 4, message: "Yo" },
        { id: 5, message: "Yo" },
        { id: 6, message: "Yo" },
    ]
};

const dialogReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            let body = action.newMessageText;
            return {
                ...state,
                messagesData: [...state.messagesData, { id: 7, message: body }],
            };
        default:
            return state;
    }
};

export const addMessage = (newMessageText) => ({ type: ADD_MESSAGE, newMessageText });

export default dialogReducer;