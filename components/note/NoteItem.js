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
    const isEditing = true;
    const handleChange = (e)=> {
        setUpdateContent(e.target.value)
    }
    return (
        <>
            {isEditing ? (
                <li key={idx} className={styles.todoItem}>
                    <div className={styles.todoCheckbox} />
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
                        <CheckCircleIcon className={styles.pencilAltIcon} />
                    </div>
                </li>
            ) : (
                <li key={idx} className={styles.todoItem}>
                    <div onClick={handleMarkTodo} className={`${styles.todoCheckbox} ${marked && styles.checked}`} />
                    <div>
                        <span className="todoText">{content}</span>
                        {dateline && (
                            <div className={styles.todoDateline}>
                                <CalendarIcon className={styles.calendarIcon} />
                                <span>{dateline}</span>
                            </div>
                        )}
                    </div>
                    <div className={styles.iconContainer}>
                        <PencilAltIcon className={styles.pencilAltIcon} />
                        <TrashIcon onClick={handleRemoveTodo} className={`${styles.trashIcon} ${!marked && styles.checked}`} />
                    </div>
                </li>
            )}
        </>

    )
}

export default NoteItem
