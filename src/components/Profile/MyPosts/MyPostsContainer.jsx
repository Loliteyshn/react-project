import { connect } from "react-redux";
import {
    addPost,
    getStatus,
    updateStatus
} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";

let mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText,
        status: state.profilePage.status
    };
};

const MyPostsContainer = connect(mapStateToProps, { addPost, getStatus, updateStatus })(MyPosts);

export default MyPostsContainer;