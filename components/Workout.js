import Link from "next/link"
import React from "react"
import Moment from "react-moment"
import { ImYoutube2 } from "react-icons/im"

const Workout = ({ workout }) => {
  let workoutLength = 0

  workout.Exercise.map((exercise) => {
    workoutLength += exercise.duration
  })
  var minutes = Math.floor(workoutLength / 60)
  var seconds = workoutLength - minutes * 60

  return (
    <div>
      <Link href={`/workouts/${workout.Date}`}>
        <button className="grow grow-lg w-full">
          <Moment format="MMM Do YYYY">{workout.Date}</Moment>
          <br />
          <div>
            Duration: {minutes} minutes {seconds} secs
          </div>
          {workout.YTVideo && (
            <div className="flex justify-center ytVideo">
              <ImYoutube2 size={30} />
            </div>
          )}
        </button>
      </Link>
    </div>
  )
}

export default Workout
