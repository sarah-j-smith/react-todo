import React, { useState } from 'react'
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

type Props = { 
  saveTodo: (e: React.FormEvent, formData: ITodo | any) => void 
}

const AddTodo: React.FC<Props> = ({ saveTodo }) => {
    const [formData, setFormData] = useState<ITodo | {}>()

    const handleForm = (e: React.FormEvent<any>): void => {
        setFormData({
            ...formData,
            [e.currentTarget.id]: e.currentTarget.value,
        })
    }

    return (
        <Form onSubmit={(e) => saveTodo(e, formData)}>
            <Form.Group controlId="name">
                <Form.Label>Title</Form.Label>
                <Form.Control onChange={handleForm} type="text" placeholder="Title of this to-do item" />
            </Form.Group>

            <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control onChange={handleForm} type="text" placeholder="What are we going to do?" />
            </Form.Group>
            <Button disabled={formData === undefined ? true: false} variant="primary" type="submit">Add To-do</Button>
        </Form>
        // <form className='Form' onSubmit={(e) => saveTodo(e, formData)}>
        //   <div>
        //     <div>
        //       <label htmlFor='name'>Name</label>
        //       <input onChange={handleForm} type='text' id='name' />
        //     </div>
        //     <div>
        //       <label htmlFor='description'>Description</label>
        //       <input onChange={handleForm} type='text' id='description' />
        //     </div>
        //   </div>
        //   { /** <button disabled={formData === undefined ? true: false} >Add Todo</button> */ }
        //   <Button type="submit" disabled={formData === undefined ? true: false} variant="primary">Add Todo</Button>
        // </form>
    )
}

export default AddTodo