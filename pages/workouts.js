import NextImage from "@/components/Image"
import Seo from "@/components/Seo"
import Workout from "@/components/Workout"
import { fetchAPI } from "@/utils/api"
import { useRouter } from "next/router"
import React from "react"

const workouts = ({ metadata, hero, workouts, numberOfWorkouts, page, firstWorkout }) => {
  const router = useRouter()
  const lastPage = Math.ceil(numberOfWorkouts / 30)

  const seo = {
    metaTitle: metadata.metaTitle,
    metaDescription: metadata.metaDescription,
    shareImage: metadata.shareImage,
    twitterCardType: metadata.twitterCardType,
    twitterUsername: metadata.twitterUsername,
  }

  return (
    <div>
      <Seo metadata={seo} />
      <div className="full-width mb-12">{hero.image && <NextImage image={hero.image} />}</div>
      {workouts.length < 1 ? (
        <div className="italic text-red-500">There are no workouts at this moment. Please check back later.</div>
      ) : (
        <div>
          <div className="grid grid-cols-1 gap-4 items-center md:grid-cols-2 lg:grid-cols-3">
            <div className="lg:col-span-3 md:col-span-2 col-span-1 mb-10">
              <div className="text-2xl font-bold text-center mb-4">Latest workout</div>
              <Workout key={firstWorkout.id} workout={firstWorkout} />
            </div>
            {workouts.map((workout, i) => {
              return <Workout key={workout.id} workout={workout} />
            })}
          </div>

          <div className="flex justify-center mt-4 pt-4 border border-t-4 border-l-0 border-r-0 border-b-0">
            <button className="grow w-44" onClick={() => router.push(`/workouts?page=${page - 1}`)} disabled={page <= 1}>
              Previous
            </button>
            <button className="grow w-44" onClick={() => router.push(`/workouts?page=${page + 1}`)} disabled={page >= lastPage}>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export async function getServerSideProps({ query: { page = 1 } }) {
  const start = +page === 1 ? 1 : +page - 1 + 1 * 30
  const numberOfWorkouts = await fetchAPI(`/workouts/count`)
  const firstWorkout = await fetchAPI(`/workouts?_sort=Date:DESC&_limit=1`)
  const workouts = await fetchAPI(`/workouts?_sort=Date:DESC&_start=${start}&_limit=30`)
  const { metadata, hero } = await fetchAPI("/workouts-page")

  return {
    props: {
      workouts,
      hero,
      page: +page,
      numberOfWorkouts,
      metadata,
      firstWorkout: firstWorkout[0],
    },
  }
}

export default workouts
