import NextImage from "@/components/Image"
import Seo from "@/components/Seo"
import Tip from "@/components/Tip"
import { fetchAPI } from "@/utils/api"
import { useRouter } from "next/router"
import React from "react"

const tips = ({ metadata, hero, page, numberOfTips, tips, firstTip }) => {
  const router = useRouter()
  const lastPage = Math.ceil(numberOfTips / 30)

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
      {tips.length < 1 ? (
        <div className="italic text-red-500">There are no fitness tips at this moment. Please check back later.</div>
      ) : (
        <div>
          <div className="grid grid-cols-1 gap-4 items-center sm:grid-cols-2 md:grid-cols-3">
            <div className="lg:col-span-3 md:col-span-2 col-span-1 mb-10">
              <div className="text-2xl font-bold text-center">Latest tip</div>
              <Tip key={firstTip.id} tip={firstTip[0]} />
            </div>
            {tips.map((tip) => (
              <Tip key={tip.id} tip={tip} />
            ))}
          </div>
          <div className="flex justify-center mt-4 pt-4 border border-t-4 border-l-0 border-r-0 border-b-0">
            <button className="grow w-44" onClick={() => router.push(`/tips?page=${page - 1}`)} disabled={page <= 1}>
              Previous
            </button>
            <button className="grow w-44" onClick={() => router.push(`/tips?page=${page + 1}`)} disabled={page >= lastPage}>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export async function getServerSideProps({ query: { page = 1 } }) {
  const start = +page === 1 ? 1 : (+page - 1) * 30
  const numberOfTips = await fetchAPI(`/fitness-tips/count`)
  const firstTip = await fetchAPI(`/fitness-tips?_sort=published_at:DESC&_limit=1`)
  const tips = await fetchAPI(`/fitness-tips?_sort=published_at:DESC&_limit=30&_start=${start}`)
  const { metadata, hero } = await fetchAPI("/tips-page")

  return {
    props: {
      firstTip,
      tips,
      hero,
      numberOfTips,
      page: +page,
      metadata,
    },
  }
}

export default tips
