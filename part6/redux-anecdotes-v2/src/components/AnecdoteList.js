import React from 'react'
import {anecdoteVote} from '../reducers/anecdoteReducer'
import {connect} from 'react-redux'
import anecdoteService from  '../services/anecdotes'

class AnecdoteList extends React.Component {


    render() {
        return (
            <div>
                <h2>Anecdotes</h2>
                {this.props.anecdotesToShow.map(anecdote =>
                    <div key={anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={async => {
                                this.props.anecdoteVote(anecdote.id)
                            }}>
                                vote
                            </button>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

const anecdotesToShow = (anecdotes, filterString) => {
    return anecdotes
        .filter(a => a.content.includes(filterString))
        .sort((a, b) => b.votes - a.votes)
}

const mapStateToProps = (state) => {
    return{
        anecdotes: state.anecdotes,
        anecdotesToShow: anecdotesToShow(state.anecdotes, state.filter)
    }
}

const ConnectedAnecdoteList = connect(mapStateToProps, {anecdoteVote})(AnecdoteList)

export default ConnectedAnecdoteList
