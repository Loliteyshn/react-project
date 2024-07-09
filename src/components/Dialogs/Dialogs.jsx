import React from "react";
import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { reduxForm, Field } from "redux-form";
import { FormControl } from "../common/FormsControls/FormsControls";
import { maxLengthCreator, requiredField } from "../../utils/validators/validators";

const maxLenght50 = maxLengthCreator(50);

const AddMessageForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field child="textarea" component={FormControl} name={"newMessageText"} validate={[requiredField, maxLenght50]} />
      </div>
      <div>
        <button>Add</button>
      </div>
    </form>
  )
}

const AddMessageFormRedux = reduxForm({ form: 'AddMessageForm' })(AddMessageForm);

const Dialogs = (props) => {
  let dialogs = props.messagesPage.dialogsData.map((dialog) => (
    <DialogItem name={dialog.name} id={dialog.id} />
  ));

  let messages = props.messagesPage.messagesData.map((message) => (
    <Message message={message.message} id={message.id} />
  ));

  let AddNewMessage = (values) => {
    console.log(values);
    props.addMessage(values.newMessageText)
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
