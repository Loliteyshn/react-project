import style from "./Profile.module.css";
import mainImg from "../../img/peaches.jpeg";
import profileImg from "../../img/profile-img.jpeg";
import MyPosts from "./MyPosts/MyPosts";

const Profile = () => {
  return (
    <div className={style.content}>
      <div>
        <img src={mainImg} alt="" className={style.mainImg} />
      </div>

      <div className={style.profile}>
        <img src={profileImg} alt="" />
        <div>
          <h2>Golovach Lolita</h2>
          <p>
            Date of birth: 19 April 2003 <br />
            City: Chernivtsi <br />
            Education: Bachelor
          </p>
        </div>
      </div>

      <MyPosts />
    </div>
  );
};

export default Profile;
