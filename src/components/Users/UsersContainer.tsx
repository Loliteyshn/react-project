import React, { Component, FC } from "react";
import { connect, useSelector } from "react-redux";
import {
  follow,
  unfollow,
  requestUsers,
  FilterType
} from "../../redux/users-reducer"
import { actions } from "../../redux/users-reducer";
import preloader from "../../assets/images/Spin-1s-200px.svg"
import { getPageSize, getIsFetching, getTotalUsersCount, getUsers, getCurrentPage, getFollowingInProgress, getUsersFilter } from "../../redux/users-selectors";
import { UsersType } from "../types/types";
import { AppStateType } from "../../redux/redux-store";
import { compose } from "redux";
import { Users } from "./Users";

type UsersPagePropsType = {
  pageTitle: string
}
 
export const UsersPage: FC<UsersPagePropsType> = (props) => {
  const isFetching = useSelector(getIsFetching);

  return <>
    <h2>{props.pageTitle}</h2>
    {isFetching ?
      <img src={preloader} />
      : null}
    <Users />
  </>
}
