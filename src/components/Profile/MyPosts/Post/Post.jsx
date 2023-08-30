import style from "./Post.module.css";
import peachNumb from "../../../../img/529peach_100978.png";

const MyPosts = () => {
  return (
    <div className={style.flex}>
      <img src={peachNumb} alt="" className={style.postImg} />I love it!
    </div>
  );
};

export default MyPosts;
