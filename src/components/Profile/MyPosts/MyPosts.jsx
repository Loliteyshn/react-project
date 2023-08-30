import style from "./MyPosts.module.css";
import Post from "./Post/Post";

const MyPosts = () => {
  return (
    <div className={style.posts}>
      <h3>My posts</h3>

      <div className={style.flex}>
        <input type="text" className={style.input} />
        <input type="button" value="Send" className={style.btn} />
      </div>

      <div>
        <Post />
      </div>
    </div>
  );
};

export default MyPosts;
