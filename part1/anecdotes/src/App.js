import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(6).fill(0))


  const nextAnecdote = () => {
    setSelected(getRandomNumber())
  }
  
  const voteAnecdote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  const getRandomNumber = () => {
    let randomNumber = Math.floor(Math.random() * (anecdotes.length))
    while (randomNumber === selected) {
      randomNumber = Math.floor(Math.random() * (anecdotes.length))
    }
    return randomNumber
  }

  const maxVotes = Math.max(...votes)
  const bestAnecdote = anecdotes[votes.indexOf(maxVotes)]
  
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has vote {votes[selected]}</p>
      <button onClick={voteAnecdote}>vote</button>
      <button onClick={nextAnecdote}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <p>{bestAnecdote}</p>
      <p>has {maxVotes} votes</p>
    </div>
  )
}

export default App
