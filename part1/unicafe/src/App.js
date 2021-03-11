import { useState } from 'react';

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td><td>{value}</td>
    </tr>
  )
}


const Statistics = ({ good, neutral, bad, clicks }) => {
  if (clicks > 0) {
    return (
      <div>
        <table>
          <tbody>

            <Statistic text="good" value={good} />
            <Statistic text="neutral" value={neutral} />
            <Statistic text="bad" value={bad} />
            <tr>
              <td>
                all
              </td>
              <td>
                {clicks}
              </td>
            </tr>
            <tr>
              <td>average</td><td>{(good + bad * (-1)) / clicks}</td>
            </tr>
            <tr>
              <td>positive</td><td>{(good / clicks) * 100} %</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  } else {
    return <p>No feedback given</p>
  }
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [clicks, setClicks] = useState(0)

  const handleClickGood = () => {
    setGood(good + 1)
    setClicks(clicks + 1)
  }
  const handleClickNeutral = () => {
    setNeutral(neutral + 1)
    setClicks(clicks + 1)
  }
  const handleClickBad = () => {
    setBad(bad + 1)
    setClicks(clicks + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleClickGood} text="good" />
      <Button onClick={handleClickNeutral} text="neutral" />
      <Button onClick={handleClickBad} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} clicks={clicks} />
    </div>
  )

}

export default App;