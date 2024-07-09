import React from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";

let Users = ({ totalUsersCount, pageSize, currentPage, onPageChange, users, followingInProgress, follow, unfollow }) => {
  return (
    <div>
      <Paginator totalUsersCount={totalUsersCount} pageSize={pageSize} currentPage={currentPage} onPageChange={onPageChange} />
      {users.map((user) => (
        <User user={user} followingInProgress={followingInProgress} unfollow={unfollow} follow={follow} />
      ))}
    </div>
  );
};

export default Users;
