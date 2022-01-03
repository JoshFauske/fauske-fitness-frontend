import React, { useState } from "react"
import { CountdownCircleTimer } from "react-countdown-circle-timer"
import useSound from "use-sound"
import beep from "../public/beep-01a.mp3"

const renderTime = ({ remainingTime }) => {
  if (remainingTime === 0) {
    return <div className="timer">DONE!!!</div>
  }

  return (
    <div className="timer">
      <div className="text">Remaining</div>
      <div className="value">{remainingTime}</div>
      <div className="text">seconds</div>
    </div>
  )
}

const CountdownTimer = ({ isPlaying, workout }) => {
  const [key, setKey] = useState(0)
  const [duration, setDuration] = useState(workout.Exercise[0].duration)
  const [index, setIndex] = useState(1)
  const [active, setActive] = useState(false)
  const [exercise, setExercise] = useState(workout.Exercise[0].name)
  const [play] = useSound(beep)

  const timerHandler = () => {
    setActive(!active)
  }

  return (
    <div className="d-flex flex-col text-center">
      <div className="text-3xl mb-4 font-bold">{exercise}</div>
      <div className="text-xl mb-4">Next exercise - {workout.Exercise[index].name}</div>
      <CountdownCircleTimer
        key={key}
        onComplete={() => {
          play()
          setIndex(index + 1)
          if (workout.Exercise[index] != null) {
            setDuration(workout.Exercise[index].duration)
            setExercise(workout.Exercise[index].name)
          } else {
            setDuration(0)
            setExercise("Congrats! You Finihsed!")
          }
          setKey((prevKey) => prevKey + 1)
        }}
        isPlaying={active}
        duration={duration}
        colors={[
          ["#004777", 0.33],
          ["#F7B801", 0.33],
          ["#A30000", 0.33],
        ]}
      >
        {renderTime}
      </CountdownCircleTimer>
      <div className="mt-4">
        <button className="grow w-44 h-12 p-0 px-2 my-2" onClick={timerHandler}>
          {active ? "Pause" : "Play"}
        </button>
        <button className="grow w-44 h-12 p-0 px-2 my-2" onClick={() => setKey((prevKey) => prevKey + 1)}>
          Restart Timer
        </button>
        <button
          className="grow w-44 h-12 p-0 px-2 my-2"
          onClick={() => {
            setExercise(workout.Exercise[0].name)
            setDuration(workout.Exercise[0].duration)
            setActive(false)
            setIndex(1)
            setKey((prevKey) => prevKey + 1)
          }}
        >
          Reset Workout
        </button>
      </div>
    </div>
  )
}

export default CountdownTimer
