import style from "./Post.module.css"
import peachNumb from "../../../../img/529peach_100978.png";
import { PostType } from "../../../types/types";
import { FC } from "react";

type PropsType = {
  post: PostType
}

const Post: FC<PropsType> = ({ post }) => {
  return (
    <div className={style.flex}>
      <img src={peachNumb} alt="" className={style.postImg} />
      {post.message} {post.likesCount}

    </div>
  );
};

export default Post;
