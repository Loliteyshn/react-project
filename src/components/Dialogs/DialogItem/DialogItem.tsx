import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import s from "./../Dialogs.module.css";
import avatar from "./../../../img/avatar.png";

type PropsType = {
  name: string
  id: number
}

const DialogItem: FC<PropsType> = (props) => {
  
  let path = "/dialogs/" + props.id;
  return (
    <div className="center">
      <NavLink
        to={path}
        className={(dialog) => (dialog.isActive ? s.active : s.dialog)}
      >
        <img src={avatar} className={s.avatar} /> {props.name}
      </NavLink>
    </div>
  );
};
// {s.dialog + " " + s.active}
export default DialogItem;
