import s from "./ProfileInfo.module.css";
import mainImg from "../../../img/peaches.jpeg";
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus";
import userPhoto from '../../../assets/images/gratis-png-empresario-iconos-de-computadora-avatar-avatar.png';
import { ChangeEvent, FC, useState } from "react";
import ProfileDataForm from "./ProfileDataForm";
import { ContactsType, ProfileType } from "../../types/types";

type InfoPropsType = {
  savePhoto: (file: File) => void
  profile: ProfileType | null
  isOwner: boolean;
  saveProfile: (profile: ProfileType) => void
}

const ProfileInfo: FC<InfoPropsType> = ({ profile, savePhoto, isOwner, saveProfile }) => {
  const [editMode, setEditMode] = useState(false);

  if (!profile) {
    return <Preloader />
  }

  const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      savePhoto(e.target.files[0])
    }
  }

  const onSubmit = (formData: ProfileType) => {
    // @ts-ignore
    saveProfile(formData).then(() => {
      setEditMode(false);
    });
  }

  return (
    <div>
      <img src={mainImg} alt="" className={s.mainImg} />
      <div className={s.profile}>
        <img src={profile.photos.large || userPhoto} className={s.mainPhoto} alt="" />
        {isOwner && (<input type={"file"} onChange={e => onMainPhotoSelected(e)} />)}
        {editMode
          ? <ProfileDataForm initialValues={profile} onSubmit={onSubmit} profile={profile} error={undefined} />
          : <ProfileData profile={profile} isOwner={isOwner} goToEditMode={() => setEditMode(true)} />}
      </div>
      {/* <ProfileStatus status={props.status} updateStatus={props.updateStatus} /> */}
    </div>
  );
};

type ProfileDataFormPropsType = {
  profile: ProfileType
  isOwner: boolean;
  goToEditMode: () => void
}

const ProfileData: FC<ProfileDataFormPropsType> = ({ profile, isOwner, goToEditMode }) => {
  return <div>
    {isOwner && (<div><button onClick={goToEditMode}>Edit</button> </div>)}
    <h2>Full name: {profile.fullName}</h2>
    <div>
      <b>Looking for a job: {profile.lookingForAJob ? "yes" : "no"}</b>
    </div>
    {profile.lookingForAJob && (
      <div>
        <b>My professional skills: {profile.lookingForAJobDescription}</b>
      </div>
    )}
    <div>
      <b>About me: {profile.aboutMe}</b>
    </div>
    <div>
      <b>Contacts: {Object.keys(profile.contacts).map(key => {
        return <Contact
          key={key} contactTitle={key}
          contactValue={profile.contacts[key as keyof ContactsType]}
        />
      })}</b>
    </div>
  </div>
}

type ContactPropsType = {
  contactTitle: string
  contactValue: string
}

const Contact: FC<ContactPropsType> = ({ contactTitle, contactValue }) => {
  return <div className={s.contact}><b>{contactTitle}</b>: {contactValue}</div>
}

export default ProfileInfo;
