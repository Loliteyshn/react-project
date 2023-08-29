import style from './Profile.module.css';
import mainImg from "../img/peaches.jpeg";
import profileImg from "../img/profile-img.jpeg";
import peachNumb from "../img/529peach_100978.png"

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
            Date of birth: 19 April <br />
            City: Chernivtsi <br />
            Education: Bachelor
          </p>
        </div>
      </div>

      <div className={style.posts}>
        <h3>My posts</h3>
        
        <div className={style.flex}>
          <input type="text" className={style.input} />
          <input type="button" value="Send" className={style.btn} />
        </div>

        <div>
          <div className={style.flex}>
            <img src={peachNumb} alt="" className={style.postImg} />
            I love it!
          </div>
          <div className={style.flex}>
            <img src={peachNumb} alt="" className={style.postImg} />
            Peach =)
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Profile;
