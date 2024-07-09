import style from "./Post.module.css";
import peachNumb from "../../../../img/529peach_100978.png";

const Post = (props) => {
  return (
    <div className={style.flex}>
      <img src={peachNumb} alt="" className={style.postImg} />
      {props.message} {props.likesCount}

    </div>
  );
};

export default Post;
