import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {Add} from '@mui/icons-material';

type AddItemPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemPropsType) {
    let [title, setTitle] = useState('')
    let [error, setError] = useState('')
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError('')
        if (e.key === 'Enter') {
            addItem();
        }
    }
    const addItem = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim());
            setTitle('');
        } else {
            setError('Title is required')
        }
    }
    return (
        <div className="inputForm">
            <div style={{display: 'flex', alignItems: 'center'}}>
                <TextField value={title}
                           variant={'outlined'}
                           label={'Type value'}
                           onChange={onChangeHandler}
                           onKeyPress={onKeyPressHandler}
                           error={!!error}
                           helperText={error}
                />
                <Button variant="text" onClick={addItem}><Add/></Button>
            </div>

        </div>
    )

}