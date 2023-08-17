import styles from '../../styles/Todo.module.css'
import NoteItem from './NoteItem'

const NoteList = ({ todos, actionUpdate, actionRemove }) => {
    return (
        <ul className={styles.todoList}>
            {todos.map((todo) => (
                <NoteItem key={todo.account.idx} {...todo.account} publicKey={todo.publicKey} actionUpdate={actionUpdate} actionRemove={actionRemove} />
            ))}
        </ul>
    )
}

export default NoteList
