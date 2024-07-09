import s from "./ProfileInfo.module.css";
import profileImg from "../../../img/profile-img.jpeg";
import mainImg from "../../../img/peaches.jpeg";
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus";

const ProfileInfo = (props) => {
  console.log(props);
  if (!props.profile) {
    return <Preloader />
  }

  return (
    <div>
      <img src={mainImg} alt="" className={s.mainImg} />
      <div className={s.profile}>
        <img src={props.profile.photos.large} alt="" />
        
        <div>
          <h2>{props.profile.fullName}</h2>
          <p>
            {props.profile.aboutMe}<br />
            {props.profile.lookingForAJobDescription} <br />
            
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
