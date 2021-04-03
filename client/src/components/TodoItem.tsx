import React from 'react'
import { Button, Card } from 'react-bootstrap'

type Props = TodoProps & {
    updateTodo: (todo: ITodo) => void
    deleteTodo: (_id: string) => void
}

const Todo: React.FC<Props> = ({ todo, updateTodo, deleteTodo }) => {
    const checkTodo: string = todo.status ? `line-through` : ''
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{todo.name}</Card.Title>
                <Card.Text>{todo.description}</Card.Text>
            </Card.Body>
            <Card.Body>
                <Button variant="outline-danger" onClick={() => deleteTodo(todo._id)}>Delete</Button>{' '}
                <Button variant="outline-primary" onClick={() => deleteTodo(todo._id)}>Complete</Button>
            </Card.Body>
        </Card>
        // <div className='Card'>
        //   <div className='Card--text'>
        //     <h1 className={checkTodo}>{todo.name}</h1>
        //     <span className={checkTodo}>{todo.description}</span>
        //   </div>
        //   <div className='Card--button'>
        //     <button
        //       onClick={() => updateTodo(todo)}
        //       className={todo.status ? `hide-button` : 'Card--button__done'}
        //     >
        //       Complete
        //     </button>
        //     <button
        //       onClick={() => deleteTodo(todo._id)}
        //       className='Card--button__delete'
        //     >
        //       Delete
        //     </button>
        //   </div>
        // </div>
    )
}

export default Todo