import { fetchAPI } from "@/utils/api"
import Markdown from "markdown-to-jsx"
import { useRouter } from "next/router"
import React from "react"

const Tip = ({ tip }) => {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <div className="mt-8">
      <div className="text-center text-2xl font-bold">{tip.tip.Title}</div>
      <div className="text-center text-xl mb-4">{tip.date}</div>
      <Markdown>{tip.tip.content}</Markdown>
    </div>
  )
}

export async function getStaticPaths() {
  const tips = await fetchAPI("/fitness-tips")

  return {
    paths: tips.map((tip) => ({
      params: {
        slug: tip.date,
      },
    })),
    fallback: true,
  }
}

export async function getStaticProps({ params }) {
  const tips = await fetchAPI(`/fitness-tips?date=${params.slug}`)

  return {
    props: { tip: tips[0] },
    revalidate: 1,
  }
}

export default Tip
