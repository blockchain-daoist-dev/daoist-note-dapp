import styles from '../../styles/Todo.module.css'
import { CalendarIcon, TrashIcon, PencilAltIcon } from '@heroicons/react/outline'

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

    return (
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
    )
}

export default NoteItem
