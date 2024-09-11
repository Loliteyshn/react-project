import React, { useEffect } from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import UserSearchForm from "./UsersSearchForm";
import { actions, FilterType, requestUsers, follow, unfollow } from "../../redux/users-reducer";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentPage, getFollowingInProgress, getPageSize, getTotalUsersCount, getUsers, getUsersFilter } from "../../redux/users-selectors";
import { AppDispatch } from "../../redux/redux-store";
import { useNavigate, useSearchParams } from "react-router-dom";


type PropsType = {}

export const Users: React.FC<PropsType> = (props) => {
  const totalUsersCount = useSelector(getTotalUsersCount);
  const currentPage = useSelector(getCurrentPage);
  const pageSize = useSelector(getPageSize);
  const users = useSelector(getUsers);
  const filter = useSelector(getUsersFilter);
  const followingInProgress = useSelector(getFollowingInProgress);

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    navigate({
      pathname: '/users',
      search: `$term=${filter.term}&friend=${filter.friend}&page=${currentPage}`
    })
  }, [filter, currentPage]);

  useEffect(() => {
    const params = Object.fromEntries(searchParams)
    const parsed = Object.fromEntries(
      Object.entries(params).map(([key, value]) => {
        const newKey = key.startsWith('$') ? key.slice(1) : key; // Remove $ if it exists
        return [newKey, value];
      })
    );
    console.log(parsed);

    let actualPage = currentPage;
    let actualFilter = filter;
    if (!!parsed.page) actualPage = Number(parsed.page)
    if (!!parsed.term) actualFilter = { ...actualFilter, term: parsed.term }
    if (!!parsed.friend)
      switch (parsed.friend) {
        case 'null':
          actualFilter = { ...actualFilter, friend: null }
          break
        case 'true':
          actualFilter = { ...actualFilter, friend: true }
          break
        default:
          actualFilter = { ...actualFilter, friend: false }
      }

    dispatch(requestUsers(actualPage, pageSize, actualFilter));
  }, []);

  const onPageChange = (pageNumber: number) => {
    dispatch(actions.setCurrentPage(pageNumber));
    dispatch(requestUsers(pageNumber, pageSize, filter));
  }

  const onFilterChanged = (filter: FilterType) => {
    dispatch(requestUsers(1, pageSize, filter));
  }

  const followUser = (userId: number) => {
    dispatch(follow(userId))
  }
  const unfollowUser = (userId: number) => {
    dispatch(unfollow(userId))
  }


  return (
    <div>
      <UserSearchForm onFilterChanged={onFilterChanged} />

      <Paginator totalUsersCount={totalUsersCount} pageSize={pageSize} currentPage={currentPage} onPageChange={onPageChange} />
      {users.map((user) => (
        <User user={user} followingInProgress={followingInProgress} unfollow={unfollowUser} follow={followUser} />
      ))}
    </div>
  );
};