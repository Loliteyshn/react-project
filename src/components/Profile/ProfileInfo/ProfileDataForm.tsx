import { InjectedFormProps, reduxForm } from "redux-form";
import { CreateField, getStringKeys } from "../../common/FormsControls/FormsControls";
import s from "./ProfileInfo.module.css";
import styles from "../../common/FormsControls/FormsControls.module.css"
import { FC } from "react";
import { ProfileType } from "../../types/types";

type PropsType = {
    profile: ProfileType
    error: any
}
// type ProfileDataFormValuesType = {
//     fullName: string
//     lookingForAJob: boolean
//     lookingForAJobDescription: string
//     aboutMe: string
// }
type ProfileDataFormValuesTypeKeys = getStringKeys<ProfileType>

const ProfileDataForm:FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({ handleSubmit, profile, error }) => {
    return <form onSubmit={handleSubmit}>
        <div><button>Save</button> </div>
        {error && <div className={styles.formSummaryError}>
            {error}
        </div>}
        <h2>Full name: {CreateField<ProfileDataFormValuesTypeKeys>("Full name", "fullName", [], "input")}</h2>
        <div>
            <b>Looking for a job: {CreateField<ProfileDataFormValuesTypeKeys>("", "lookingForAJob", [], "input", { type: 'checkbox' })}</b>
        </div>
        <div>
            <b>My professional skills: {CreateField<ProfileDataFormValuesTypeKeys>("My professional skills:", "lookingForAJobDescription", [], "textarea")}</b>
        </div>

        <div>
            <b>About me: {CreateField<ProfileDataFormValuesTypeKeys>("About me:", "aboutMe", [], "textarea")}</b>
        </div>
        <div>
            <b>Contacts: {Object.keys(profile.contacts).map(key => {
                return <div key={key} className={s.contact}>
                    <b>{key}: {CreateField(key, "contacts." + key, [], "input")}</b>
                </div>
            })}</b>
        </div>
    </form>
}

const ProfileDataFormReduxForm = reduxForm<ProfileType, PropsType>({ form: 'edit-profile' })(ProfileDataForm)


export default ProfileDataFormReduxForm;