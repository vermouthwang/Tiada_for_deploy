import TodoItem from './Todo';

function TodoView(props) {
    return (
        <div key={props.todoList._id}>
            <ul key={props.todoList._id}>
                {props.todoList.map(todo => <TodoItem todo={todo} onDelete={props.onDelete}/>)}
            </ul>
        </div>
    )
}

export default TodoView;