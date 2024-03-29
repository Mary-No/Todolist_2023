import React, {ChangeEvent, useState} from 'react';
import {TextField} from '@mui/material';

type EditableSpanType = {
    title: string
    onChange: (title: string) => void

}

export const EditableSpan = React.memo((props: EditableSpanType)=> {
    console.log("editable")
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState('')

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }
    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        editMode
            ? <TextField variant="standard" value={title} onChange={changeHandler} onBlur={activateViewMode} autoFocus/>
            : <span onDoubleClick={activateEditMode}>{props.title}</span>
    )

})