import { actions } from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import { connect } from "react-redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import { DialogsDataType, MessagesDataType } from "../types/types";
import { AppStateType } from "../../redux/redux-store";

type MapStatePropsType = {
    dialogsData: Array<DialogsDataType>
    messagesData: Array<MessagesDataType>
}

type MapDispatchPropsType = {
    addMessage: (newMessageText: string) => void
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        dialogsData: state.messagesPage.dialogsData,
        messagesData: state.messagesPage.messagesData
    }
}

export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, null, AppStateType>(
        mapStateToProps, 
        { addMessage: actions.addMessage }),
    withAuthRedirect
)(Dialogs);