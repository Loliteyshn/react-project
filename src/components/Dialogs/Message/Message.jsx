import React from "react";
import s from "./../Dialogs.module.css";
import messageIcon from "./../../../img/865771.png";

const Message = (props) => {
  return (
    <div className={s.message}>
      <img src={messageIcon} className={s.messageIcon}/> {props.message}
    </div>
  );
};

export default Message;
