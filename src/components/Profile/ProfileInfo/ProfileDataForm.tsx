import { InjectedFormProps, reduxForm } from "redux-form";
import { CreateField, getStringKeys, Input } from "../../common/FormsControls/FormsControls";
import styles from "../../common/FormsControls/FormsControls.module.css"
import { FC } from "react";
import { ProfileType } from "../../types/types";
import { Controller, FieldValues, FormProvider, RegisterOptions, useForm, useFormContext } from "react-hook-form";
import s from './ProfileInfo.module.css'
import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";

type PropsTypeProfile = {
    handleSubmit: (formData: ProfileType) => void
    profile: ProfileType
}

export const ProfileForm: FC<PropsTypeProfile> = ({ handleSubmit, profile }) => {
    const methods = useForm<ProfileType>({
        defaultValues: profile
    });

    const onSubmit = (formData: ProfileType) => {
        // console.log(formData);
        handleSubmit(formData)
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <Input type="text"
                    name='fullName'
                    placeholder='Full Name'
                    validate={{
                        required: 'Full name is required',
                        minLength: { value: 3, message: 'Full name must be at least 3 characters' }
                    }}
                />
                <FormControlLabel
                    control={
                        <Controller
                            name="lookingForAJob"
                            control={methods.control}
                            render={({ field }) => <Checkbox {...field} color="secondary"
                                checked={!!field.value} 
                                onChange={(e) => field.onChange(e.target.checked)}
                            />
                            }
                        />
                    }
                    label="Looking for a job"
                />
                <Input type="text"
                    name='lookingForAJobDescription'
                    placeholder='Professional skills: '
                    validate={{}}
                />
                <Input type="text"
                    name='aboutMe'
                    placeholder='About me: '
                    validate={{}}
                />
                <Button variant="contained" color="secondary" type="submit">Save</Button>
            </form>
        </FormProvider>
    )
}

// const ProfileDataForm: FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({ handleSubmit, profile, error }) => {
//     return <form onSubmit={handleSubmit} style={{ display: 'flex', justifyContent: 'space-between', position: "relative", width: '100%' }}>
//         {error && <div className={styles.formSummaryError}>
//             {error}
//         </div>}

//         <div>
//             <h2>Full name: {CreateField<ProfileDataFormValuesTypeKeys>("Full name", "fullName", [], "input")}</h2>
//             <b>Looking for a job: {CreateField<ProfileDataFormValuesTypeKeys>("", "lookingForAJob", [], "input", { type: 'checkbox' })}</b>
//             <b>My professional skills: {CreateField<ProfileDataFormValuesTypeKeys>("My professional skills:", "lookingForAJobDescription", [], "textarea")}</b>
//             <b>About me: {CreateField<ProfileDataFormValuesTypeKeys>("About me:", "aboutMe", [], "textarea")}</b>
//         </div>
//         {/* <div>
//             <b>Contacts: {Object.keys(profile.contacts).map(key => {
//                 return <div key={key} className={s.contact}>
//                     <b>{key}: {CreateField(key, "contacts." + key, [], "input")}</b>
//                 </div>
//             })}</b>
//         </div> */}
//         <div><button>Save</button></div>
//     </form>
// }

// const ProfileDataFormReduxForm = reduxForm<ProfileType, PropsType>({ form: 'edit-profile' })(ProfileDataForm)
// export default ProfileDataFormReduxForm;