import React from 'react'
import {anecdoteCreate} from '../reducers/anecdoteReducer'
import {notificationAdd} from "../reducers/notificationReducer";
import {connect} from 'react-redux'
import anecdoteService from '../services/anecdotes'

class AnecdoteForm extends React.Component {
    handleSubmit = async (e) => {
        e.preventDefault()

        const content = e.target.anecdote.value
        e.target.anecdote.value = ''
        const content2 = await anecdoteService.createNew(content)
        this.props.anecdoteCreate(content2)
        this.props.notificationAdd(content)
        setTimeout(() => {
            this.props.notificationAdd('')
        }, 5000)
    }

    render() {
        return (
            <div>
                <h2>create new</h2>
                <form onSubmit={this.handleSubmit}>
                    <div><input name='anecdote'/></div>
                    <button>create</button>
                </form>
            </div>
        )
    }
}

const ConnectedAnecdoteForm = connect(null, {anecdoteCreate, notificationAdd})(AnecdoteForm)

export default ConnectedAnecdoteForm
