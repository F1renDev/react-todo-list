import React from 'react';
import TodoItem from './TodoItem';
import shortid from 'shortid'

export default class TodoForm extends React.Component {
    constructor() {
        super();
        this.state = {
            currentItem: '',
            todos: []
        }
    }

    handleInput = (event) => {
        this.setState({
            currentItem: event.target.value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const todos = [...this.state.todos, {
            text: this.state.currentItem,
            done: false,
            id: shortid.generate()
        }];
        this.setState({
            todos: todos,
            currentItem: ''
        })
    };

    toggleComplete = (id) => {
        this.setState({
            todos: this.state.todos.map((item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        done: !item.done
                    }
                } else {
                    return item
                }
            })
        })
    };

    deleteTodo = (id) => {
        this.setState({
            todos: this.state.todos.filter((item) => {
                return item.id !== id
            })
        })
    };

    render() {
        return (
            <div className={'todo-list'}>
                <h1>Todo List</h1>
                <form onSubmit={this.handleSubmit}>
                    <input
                        value={this.state.currentItem}
                        onChange={this.handleInput}
                        type='text'
                    />
                    <span> </span>
                    <button type='submit'>Add item</button>
                </form>
                <ul>
                    {this.state.todos.map((item) => {
                        return <TodoItem
                            deleteTodo={() => this.deleteTodo(item.id)}
                            id={item.id}
                            toggleComplete={() => this.toggleComplete(item.id)}
                            item={item}
                            key={item.id}
                        />
                    })}
                </ul>
            </div>
        )
    }
}