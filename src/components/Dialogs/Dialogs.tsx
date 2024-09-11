import React, { FC } from "react";
import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { reduxForm, Field, InjectedFormProps } from "redux-form";
import { CreateField, FormControl } from "../common/FormsControls/FormsControls";
import { maxLengthCreator, requiredField } from "../../utils/validators/validators";
import { DialogsDataType, MessagesDataType } from "../types/types";

const maxLenght50 = maxLengthCreator(50);

type FormPropsType = {};

const AddMessageForm: FC<InjectedFormProps<AddMessageFormValuesType, FormPropsType> & FormPropsType> = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        {CreateField<AddMessageFormValuesTypeKeys>("Message text", "newMessageText", [requiredField, maxLenght50], "textarea")}
        {/* <Field child="textarea" component={FormControl} name={"newMessageText"} validate={[requiredField, maxLenght50]} /> */}
      </div>
      <div>
        <button>Add</button>
      </div>
    </form>
  )
}

const AddMessageFormRedux = reduxForm<AddMessageFormValuesType, FormPropsType>({ form: 'AddMessageForm' })(AddMessageForm);

type AddMessageFormValuesType = {
  newMessageText: string
}
type AddMessageFormValuesTypeKeys = Extract<keyof AddMessageFormValuesType, string>;


type PropsType = {
  dialogsData: Array<DialogsDataType>
  messagesData: Array<MessagesDataType>
  addMessage: (newMessageText: string) => void
}

const Dialogs: FC<PropsType> = ({ dialogsData, messagesData, addMessage }) => {
  let dialogs = dialogsData.map((dialog) => (
    <DialogItem name={dialog.name} id={dialog.id} />
  ));

  let messages = messagesData.map((message) => (
    <Message message={message.message} id={message.id} />
  ));

  let AddNewMessage = (values: { newMessageText: string }) => {
    addMessage(values.newMessageText)
  }

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogs}</div>
      <div className={s.messages}>{messages}</div>

      <AddMessageFormRedux onSubmit={AddNewMessage} />
    </div>
  );
};

export default Dialogs;
