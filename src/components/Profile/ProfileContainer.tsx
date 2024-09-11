import { Component, FC, useEffect } from "react";
import { connect } from "react-redux";
import Profile from "./Profile";
import { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile } from "../../redux/profile-reducer";
import { useParams, Navigate } from 'react-router-dom';
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import { ProfileType } from "../types/types";
import { AppStateType } from "../../redux/redux-store";
import { withRouter } from "../../hoc/withRouter";

type MapStatePropsType = {
    authorizedUserId: number | null
    profile: ProfileType | null
    status: string
}
type MapDispatchPropsType = {
    getUserProfile: (id: number) => void
    getStatus: (id: number) => void
    updateStatus: (status: string) => void
    savePhoto: (file: any) => void
    saveProfile: (profile: ProfileType) => void
}
type OwnPropsType = {
    isOwner: boolean
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

let ProfileContainer: FC<PropsType> = (props) => {
    let { userId } = useParams();

    useEffect(() => {
        let id = Number(userId);
        if (!id) {
            if (props.authorizedUserId) {
                id = props.authorizedUserId;
                if (!id) {
                    window.location.href = '/login';
                    // props.history.push('/login');
                }
            }

        }
        props.getUserProfile(id)
        props.getStatus(id)

    }, [userId, props.getUserProfile, props.getStatus]);

    return (<div>
        <Profile profile={props.profile}
            isOwner={!userId}
            savePhoto={props.savePhoto}
            saveProfile={props.saveProfile}
        />
    </div>
    );
}

let mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
});


export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>
        (mapStateToProps, { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile }),
    withAuthRedirect
)(ProfileContainer);