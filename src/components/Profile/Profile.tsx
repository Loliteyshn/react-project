import { FC } from "react";
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import { ProfileType } from "../types/types";
import { Box } from "@mui/material";

type PropsType = {
  savePhoto: (file: any) => void
  profile: ProfileType | null
  isOwner: boolean;
  saveProfile: (profile: ProfileType) => void
}

const Profile: FC<PropsType> = (props) => {
  return (<>
    <ProfileInfo savePhoto={props.savePhoto}
      isOwner={props.isOwner}
      profile={props.profile}
      saveProfile={props.saveProfile} />
    <MyPosts />
  </>

  );
};

export default Profile;
