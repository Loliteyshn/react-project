import profileReducer from "./profile-reducer";
import dialogReducder from "./dialogs-reducer";
import sideBar from "./sidebar-reducer";

let store = {
  _state: {
    profilePage: {
      posts: [
        { id: 1, message: "Hy, how is your project", likesCount: 12 },
        { id: 2, message: "It`s my first post", likesCount: 11 },
      ],
      newPostText: "it-kamasutra",
    },
    messagesPage: {
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
      ],
      newMessageText: "Input a message",
    },
    sideBar: {
      friends: [
        { id: 1, name: "Dimych" },
        { id: 2, name: "Andrew" },
        { id: 3, name: "Sveta" },
      ],
    },
  },
  _callSubscriber() {
    console.log("State changed ");
  },
  getState() {
    return this._state;
  },
  subscribe(observer) {
    this.callSubscriber = observer;
  },
  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.messagesPage = dialogReducder(this._state.messagesPage, action);
    this._state.sideBar = sideBar(this._state.sideBar, action);

    this._callSubscriber(this._state);
  },
};

export default store;
window.store = store;
