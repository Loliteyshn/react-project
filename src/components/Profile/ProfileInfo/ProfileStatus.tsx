import React, { useState, useEffect, FC, ChangeEventHandler, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppStateType } from "../../../redux/redux-store";
import { updateStatus } from "../../../redux/profile-reducer";

type PropsType = {}

const ProfileStatus: FC<PropsType> = () => {
    const propsStatus = useSelector((state: AppStateType) => state.profilePage.status)
    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(propsStatus);
    const dispatch: AppDispatch = useDispatch()
    

    useEffect( () => {
        setStatus(propsStatus);
    }, [propsStatus]);

    let activateEditMode = () => {
        setEditMode(true);
    }

    let deactivateEditMode = () => {
        setEditMode(false);
        dispatch(updateStatus(status));
    }

    let onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.target.value);
    }

    return <>
        {!editMode &&
            <div>
                <b>Status: </b> <span onDoubleClick={activateEditMode}>{propsStatus || "----"}</span>
            </div>
        }

        {editMode &&
            <div>
                <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode}
                    value={status} />
            </div>
        }
    </>
}




export default ProfileStatus;
