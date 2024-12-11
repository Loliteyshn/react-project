import React, { FC, useEffect } from "react";
import s from "./MyPosts.module.css";
import ProfileStatus from "../ProfileInfo/ProfileStatus";
import { Input } from "../../common/FormsControls/FormsControls";
import { PostType } from "../../types/types";
import { getPosts } from "../../../redux/profile-selectors";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../../redux/profile-reducer";
import { AppDispatch } from "../../../redux/redux-store";
import { Button, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";

const MyPosts: FC = React.memo(() => {
  const posts = useSelector(getPosts);
  const dispatch: AppDispatch = useDispatch();
  const methods = useForm<PostType>();

  const onSubmit = (formData: PostType) => {
    dispatch(actions.addPost(formData.message));
    methods.reset()
  }

  return (
    <div className={s.posts}>
      <ProfileStatus />

      <h3>My posts</h3>
      <div>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Input type="text"
              name='message'
              placeholder='Post Text'
              validate={{
                minLength: { value: 2, message: 'Post text must be at least 1 character' }
              }}
            />
            <Button variant="contained" color="secondary" type="submit" className={s.btn}>Save</Button>
          </form>
        </FormProvider>
      </div>

      <div><Posts posts={posts} /></div>
    </div>
  );
});

type PostsPropsType = {
  posts: PostType[]
}
const Posts: FC<PostsPropsType> = ({ posts }) => {
  return (
    posts.map(post => (
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <span className={s.span}></span>
            </ListItemIcon>
            <ListItemText primary={post.message} />
          </ListItemButton>
        </ListItem>
        <Divider />
      </List>
    ))
  )
}


export default MyPosts;
