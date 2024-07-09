import { Component, useEffect } from "react";
import { connect } from "react-redux";
import Profile from "./Profile";
import { getUserProfile, getStatus, updateStatus } from "../../redux/profile-reducer";
import { useParams, Navigate } from 'react-router-dom';
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";


function ProfileContainer(props) {
  let { userId } = useParams();

  useEffect(() => {
    if (!userId) {
      userId = props.authorizedUserId;
      if (!userId) {
        window.location.href = '/login';
        // props.history.push('/login');
      }
    }
    props.getUserProfile(userId)
    props.getStatus(userId)

  }, [userId, props.getUserProfile, props.getStatus]);


  return (
    <div>
      <Profile profile={props.profile}
        status={props.status}
        updateStatus={props.updateStatus} />
    </div>
  );
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.userId,
  isAuth: state.auth.isAuth
});


export default compose(
  connect(mapStateToProps, { getUserProfile, getStatus, updateStatus }),
  // withAuthRedirect
)(ProfileContainer);