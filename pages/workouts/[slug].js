import CountdownTimer from "@/components/CountdownTimer"
import Seo from "@/components/Seo"
import { fetchAPI } from "@/utils/api"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useState } from "react"
import Moment from "react-moment"
// import { MdOutlineCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md"

const Workout = ({ workout }) => {
  const router = useRouter()
  // const [active, setActive] = useState(false)

  const seo = {
    metaTitle: `Workout`,
    metaDescription: `Workout for ${workout.Date}`,
  }

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  let workoutLength = 0

  workout.Exercise.map((exercise, i) => {
    workoutLength += exercise.duration
  })
  var minutes = Math.floor(workoutLength / 60)
  var seconds = workoutLength - minutes * 60

  // const timerHandler = () => {
  //   setActive(!active)
  // }

  return (
    <div className="mt-8">
      <Seo metadata={seo} />
      <div className="text-center text-2xl font-bold">
        <Moment format="MMM Do YYYY">{workout.Date}</Moment>
        <div className="text-xl">
          Duration {minutes} minutes {seconds} seconds
        </div>
        {workout.YTVideo && (
          <div className="mt-8 text-primary underline">
            <Link href={workout.YTVideo}>
              <a target="_blank">Watch the YouTube video here</a>
            </Link>
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <div className="my-12">
          {workout.Exercise.map((exercise) => (
            <div className="mx-4 exercise flex items-center" key={exercise.id}>
              {/* <MdOutlineCheckBoxOutlineBlank /> */}
              <span className="font-bold">{`${exercise.name} - `}</span>
              <span>{`${exercise.duration} seconds`}</span>
            </div>
          ))}
        </div>
        <div className="text-center flex-1">
          <div className="flex justify-center">
            <CountdownTimer workout={workout} />
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getStaticPaths() {
  const workouts = await fetchAPI("/workouts")

  return {
    paths: workouts.map((workout) => ({
      params: {
        slug: workout.Date,
      },
    })),
    fallback: true,
  }
}

export async function getStaticProps({ params }) {
  const workouts = await fetchAPI(`/workouts?Date=${params.slug}`)

  return {
    props: { workout: workouts[0] },
    revalidate: 1,
  }
}

export default Workout
