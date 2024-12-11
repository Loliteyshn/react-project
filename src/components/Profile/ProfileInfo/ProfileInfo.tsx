import s from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader/Preloader";
import userPhoto from '../../../assets/images/gratis-png-empresario-iconos-de-computadora-avatar-avatar.png';
import { ChangeEvent, FC, useState } from "react";
import { ProfileForm } from "./ProfileDataForm";
import { ContactsType, ProfileType } from "../../types/types";
import { Box, Button } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

type InfoPropsType = {
  savePhoto: (file: File) => void
  profile: ProfileType | null
  isOwner: boolean;
  saveProfile: (profile: ProfileType) => void
}

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

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
    <Box sx={{}}>

      <div className={s.profile}>
        <div className={s.profileLeft}>
          <img src={profile.photos.large || userPhoto} className={s.mainPhoto} alt="" />
          {isOwner && (
            // <input type={"file"} onChange={e => onMainPhotoSelected(e)} />
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon color="secondary" />}
              className={s.muiBtn}
            >
              Upload avatar
              <VisuallyHiddenInput
                type="file"
                onChange={e => onMainPhotoSelected(e)}
              />
            </Button>
          )}
        </div>

        <div className={s.profileRight}>
          {editMode
            ? <>
              {/* <ProfileDataForm initialValues={profile} onSubmit={onSubmit} profile={profile} error={undefined} /> */}
              <ProfileForm handleSubmit={onSubmit} profile={profile} />
            </>

            : <ProfileData profile={profile} isOwner={isOwner} goToEditMode={() => setEditMode(true)} />
          }
        </div>
      </div>

    </Box>
  );
};

type ProfileDataPropsType = {
  profile: ProfileType
  isOwner: boolean
  goToEditMode: () => void
}

const ProfileData: FC<ProfileDataPropsType> = ({ profile, isOwner, goToEditMode }) => {
  return <div>

    <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{profile.fullName}</p>
    <div className={s.flex}>
      <p>Looking for a job:</p>
      <p>{profile.lookingForAJob ? "yes" : "no"}</p>
    </div>




    {profile.lookingForAJob && (
      <p>My professional skills: {profile.lookingForAJobDescription}</p>
    )}
    <div>
      <p>About me: {profile.aboutMe}</p>
    </div>
    {/* <div>
        <b>Contacts: {Object.keys(profile.contacts).map(key => {
          return <Contact
            key={key} contactTitle={key}
            contactValue={profile.contacts[key as keyof ContactsType]}
          />
        })}</b>
      </div> */}


    {isOwner && (<div><Button variant="contained" color="secondary" onClick={goToEditMode}>Edit</Button> </div>)}
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
