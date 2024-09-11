import React, { FC } from "react";
import style from "./MyPosts.module.css";
import Post from "./Post/Post";
import ProfileStatus from "../ProfileInfo/ProfileStatus";
import { InjectedFormProps, reduxForm } from "redux-form";
import { requiredField, maxLengthCreator } from "../../../utils/validators/validators";
import { CreateField, FormControl, getStringKeys } from "../../common/FormsControls/FormsControls";
import { PostType } from "../../types/types";

const maxLength10 = maxLengthCreator(10);
type FormPropsType = {};
type AddPostFormValuesType = {
  newPostText: string
}
type AddPostFormValuesTypeKeys = getStringKeys<AddPostFormValuesType>

const AddPostForm: FC<InjectedFormProps<AddPostFormValuesType, FormPropsType> & FormPropsType> = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        {CreateField<AddPostFormValuesTypeKeys>("Post text", "newPostText", [requiredField, maxLength10], "textarea")}
        {/* <Field child="textarea" component={FormControl} name={"newPostText"} validate={[requiredField, maxLength10]} placeholder="Post message" /> */}
      </div>
      <div>
        <button>Login</button>
      </div>
    </form>
  )
}

const AddPostReduxForm = reduxForm<AddPostFormValuesType, FormPropsType>({ form: 'AddPost' })(AddPostForm);

export type MapStatePropsType = {
  posts: Array<PostType>
  status: string
}
export type MapDispatchPropsType = {
  addPost: (text: string) => void
  updateStatus: (status: string) => void
}

const MyPosts: FC<MapStatePropsType & MapDispatchPropsType> = React.memo(({ posts, addPost, status, updateStatus }) => {
  let postsElements = posts.map((post) => {
    return (
      <Post post={post} key={post.id} />
    );
  });

  let AddPost = (formData: AddPostFormValuesType) => {
    addPost(formData.newPostText);
  }

  return (
    <div className={style.posts}>
      <ProfileStatus status={status} updateStatus={updateStatus} />

      <h3>My posts</h3>
      <div className={style.flex}>
        <AddPostReduxForm onSubmit={AddPost} />
      </div>

      <div>{postsElements}</div>
    </div>
  );
});


export default MyPosts;
