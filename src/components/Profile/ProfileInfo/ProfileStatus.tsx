import React, { useState, useEffect, FC, ChangeEventHandler, ChangeEvent } from "react";

type PropsType = {
    status: string
    updateStatus: (status: string) => void
}

const ProfileStatus: FC<PropsType> = (props) => {
    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);

    useEffect( () => {
        setStatus(props.status);
    }, [props.status]);

    let activateEditMode = () => {
        setEditMode(true);
    }

    let deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    }

    let onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.target.value);
    }

    return <>
        {!editMode &&
            <div>
                <b>Status: </b> <span onDoubleClick={activateEditMode}>{props.status || "----"}</span>
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
