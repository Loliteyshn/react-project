import React, { Component } from "react";
import { connect } from "react-redux";
import Users from "./Users";
import {
  follow,
  unfollow,
  setCurrentPage,
  requestUsers
} from "../../redux/users-reducer";
import preloader from "../../assets/images/Spin-1s-200px.svg";
import { getPageSize, getIsFetching, getTotalUsersCount, getUsers, getCurrentPage, getFollowingInProgress } from "../../redux/users-selectors";

class UsersContainer extends Component {
  componentDidMount() {
    let {getUsers, currentPage, pageSize} = this.props;
    getUsers(currentPage, pageSize);
  }

  onPageChanged = (pageNumber) => {
    let {setCurrentPage, getUsers, pageSize} = this.props;
    setCurrentPage(pageNumber);
    getUsers(pageNumber, pageSize);
  };

  render() {
    return (
      <>
        {this.props.isFetching ?

          <img src={preloader} />
          : null}
        <Users
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          onPageChange={this.onPageChanged}
          users={this.props.users}
          follow={this.props.follow}
          unfollow={this.props.unfollow}
          toggleFollowingProgress={this.props.toggleFollowingProgress}
          followingInProgress={this.props.followingInProgress}
        />
      </>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state)
  };
};

export default connect(mapStateToProps, {
  follow,
  unfollow,
  setCurrentPage,
  requestUsers,
  getUsers: requestUsers
})(UsersContainer);
