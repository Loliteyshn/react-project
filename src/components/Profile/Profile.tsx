import { FC } from "react";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import { ProfileType } from "../types/types";

type PropsType = {
  savePhoto: (file: any) => void
  profile: ProfileType | null
  isOwner: boolean;
  saveProfile: (profile: ProfileType) => void
}

const Profile: FC<PropsType> = (props) => {
  return (
    <div>
      <ProfileInfo savePhoto={props.savePhoto}
        isOwner={props.isOwner}
        profile={props.profile}
        saveProfile={props.saveProfile} />
      <MyPostsContainer />
    </div>
  );
};

export default Profile;
