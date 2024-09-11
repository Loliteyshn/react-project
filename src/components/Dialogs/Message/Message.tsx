import React, { FC } from "react";
import s from "./../Dialogs.module.css";
import messageIcon from "./../../../img/865771.png";

type PropsType = {
  message: string
  id: number
}

const Message: FC<PropsType> = ({ message, id }) => {
  return (
    <div className={s.message}>
      <img src={messageIcon} className={s.messageIcon} /> {message}
    </div>
  );
};

export default Message;
