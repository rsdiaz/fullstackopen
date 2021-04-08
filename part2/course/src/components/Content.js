import React from 'react'
import Part from './Part'

const Content = ({ parts }) => {
  let initialValue = 0
  const total = parts.reduce((s, p) => s + p.exercises, initialValue)


return (
  <div>
    {parts.map((part) =>
      <Part key={part.id} name={part.name} exercises={part.exercises} />
    )}
    <p><b>total of {total} exercises</b></p>
  </div>
)
}

export default Content