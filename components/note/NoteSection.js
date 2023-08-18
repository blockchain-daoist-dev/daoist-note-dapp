import styles from '../../styles/Todo.module.css'
import NoteList from './NoteList'

const NoteSection = ({ title, todos, actionUpdate, actionRemove }) => {
    return (
        <div className={styles.todoSection}>
            <h1 className={styles.title}>
                {title} - {todos.length}
            </h1>

            <NoteList todos={todos} actionUpdate={actionUpdate} actionRemove={actionRemove} />
        </div>
    )
}

export default NoteSection
