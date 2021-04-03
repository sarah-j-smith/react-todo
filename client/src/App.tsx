import TodoItem from './components/TodoItem'
import AddTodo from './components/AddTodo'
import { getTodos, addTodo, updateTodo, deleteTodo } from './API'

import * as appStyles from './App.module.scss';

import Container from 'react-bootstrap/Container';
import { Col, Jumbotron, Row } from 'react-bootstrap';
import React from 'react';

type StateType = {
    todos: ITodo[]
}

type PropType = null | any

class App extends React.Component<PropType, StateType> {

    constructor(props: any) {
        super(props);

        // note re initialisation of state:
        //   1. don't copy props into state - acesss it directly from this.props
        //   2. don't call setState( ...something ) in constructor
        //
        //   https://stackoverflow.com/a/47341539/813919
        //
        // on modern (es6+) compilers can just use
        //  state = { todos: [] } and eschew/elide the constructor
        //
        this.state = {
            todos: []
        }
    }

    setTodos(udpatedTodos: ITodo[]) {
        // replace whatever the current array of tood items is with the argument
        // "updatedTodo's", while keeping any other state as it currently is
        this.setState({ ...this.state, todos: udpatedTodos })
    }

    todos(): ITodo[] {
        return this.state.todos;
    }

    componentDidMount() {
        this.fetchTodos();
    }

    fetchTodos() {
        getTodos()
            .then(({ data: { todos } }: ITodo[] | any) => this.setTodos(todos))
            .catch((err: Error) => console.log(err))
    }

    handleSaveTodo(e: React.FormEvent, formData: ITodo) {
        e.preventDefault()
        addTodo(formData)
            .then(({ status, data }) => {
                if (status !== 201) {
                    throw new Error("Error! Todo not saved")
                }
                this.setTodos(data.todos)
            })
            .catch(err => console.log(err))
    }

    handleUpdateTodo(todo: ITodo) {
        updateTodo(todo)
            .then(({ status, data }) => {
                if (status !== 200) {
                    throw new Error("Error! Todo not updated")
                }
                this.setTodos(data.todos)
            })
            .catch(err => console.log(err))
    }

    handleDeleteTodo(_id: string) {
        deleteTodo(_id)
            .then(({ status, data }) => {
                if (status !== 200) {
                    throw new Error("Error! Todo not deleted")
                }
                this.setTodos(data.todos)
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <Container>
                <Jumbotron>
                    <h1>To-do Manager</h1>
                </Jumbotron>
                <Row>
                    <Col className={appStyles.AddContainer}>
                        <h2>Add</h2>
                        <AddTodo saveTodo={this.handleSaveTodo} />
                    </Col>
                </Row>
                {this.todos().map((todo: ITodo) => (
                    <Row>
                        <Col>
                            <TodoItem
                                key={todo._id}
                                updateTodo={this.handleUpdateTodo}
                                deleteTodo={this.handleDeleteTodo}
                                todo={todo}
                            />
                        </Col>
                    </Row>
                ))}
            </Container>
        );
    }
}

export default App