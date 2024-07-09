import React from "react";
import style from "./MyPosts.module.css";
import Post from "./Post/Post";
import ProfileStatus from "../ProfileInfo/ProfileStatus";
import { Field } from "redux-form";
import { reduxForm } from "redux-form";
import { requiredField, maxLengthCreator } from "../../../utils/validators/validators";
import { FormControl } from "../../common/FormsControls/FormsControls";

const maxLength10 = maxLengthCreator(10);

const AddPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field child="textarea" component={FormControl} name={"newPostText"} validate={[requiredField, maxLength10]} placeholder="Post message" />
      </div>
      <div>
        <button>Login</button>
      </div>
    </form>
  )
}

const AddPostReduxForm = reduxForm({ form: 'AddPost' })(AddPostForm)


const MyPosts = React.memo((props) => {
  let postsElements = props.posts.map((post) => {
    return (
      <Post message={post.message} key={post.id} likesCount={post.likesCount} />
    );
  });

  let AddPost = (formData) => {
    console.log('potts', formData);
    props.addPost(formData.newPostText);
  }

  return (
    <div className={style.posts}>
      <ProfileStatus status={props.status} updateStatus={props.updateStatus} />

      <h3>My posts</h3>
      <div className={style.flex}>
        <AddPostReduxForm onSubmit={AddPost}/>
      </div>

      <div>{postsElements}</div>
    </div>
  );
});


export default MyPosts;
