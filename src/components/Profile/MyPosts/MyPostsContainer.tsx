import { connect } from "react-redux";
import { actions, getStatus, updateStatus } from "../../../redux/profile-reducer";
import MyPosts, { MapDispatchPropsType, MapStatePropsType } from "./MyPosts"
import { AppStateType } from "../../../redux/redux-store";




let mapStateToProps = (state: AppStateType) => {
    return {
        posts: state.profilePage.posts,
        status: state.profilePage.status
    };
};

const MyPostsContainer = connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps,
    {
        addPost: actions.addPost, updateStatus
    }
)(MyPosts);

export default MyPostsContainer;