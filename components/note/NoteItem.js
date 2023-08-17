import styles from '../../styles/Todo.module.css'
import { CalendarIcon, TrashIcon, PencilAltIcon, CheckCircleIcon } from '@heroicons/react/outline'

import React from 'react'
const NoteItem = ({ idx, content, marked, dateline, publicKey, action }) => {
    const handleMarkTodo = () => {
        // Only allow unchecked todo to be marked
        if (marked) return

        action(publicKey, idx)

    }

    const handleRemoveTodo = () => {
        // Only allow checked todo to be removed
        if (!marked) return

        action(publicKey, idx)

    }

    const [updateContent, setUpdateContent] = React.useState([])
    const [isEditing, setIsEditing] = React.useState(false);
    const handleChange = (e)=> {
        setUpdateContent(e.target.value)
    }

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const updateNote = () => {
        setIsEditing(!isEditing);
    }

    return (
        <>
            {isEditing ? (
                <li key={idx} className={styles.todoItem}>
                    <div />
                    <div>
                        <input 
                            id = {styles.noteInputField}
                            type="text"
                            onChange={handleChange}
                            value= {updateContent}
                            placeholder= {content}
                        >
                        </input>
                    </div>
                    <div className={styles.iconContainer}>
                        <CheckCircleIcon onClick={updateNote} className={styles.checkCircleIcon} />
                    </div>
                </li>
            ) : (
                <li key={idx} className={styles.todoItem}>
                    <div />
                    <div className={styles.noteItem}>
                        <span className="todoText">{content}</span>
                        {dateline && (
                            <div className={styles.todoDateline}>
                                <CalendarIcon className={styles.calendarIcon} />
                                <span>{dateline}</span>
                            </div>
                        )}
                    </div>
                    <div className={styles.iconContainer}>
                        <PencilAltIcon onClick={toggleEdit} className={styles.pencilAltIcon} />
                        <TrashIcon onClick={handleRemoveTodo} className={`${styles.trashIcon} ${!marked && styles.checked}`} />
                    </div>
                </li>
            )}
        </>

    )
}

export default NoteItem
