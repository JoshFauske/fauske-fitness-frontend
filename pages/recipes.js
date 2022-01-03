import NextImage from "@/components/Image"
import Seo from "@/components/Seo"
import { fetchAPI } from "@/utils/api"
import React from "react"

const recipes = ({ metadata, hero }) => {
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
			<div className="italic text-red-500">Under construction, please check back later</div>
    </div>
  )
}

export async function getServerSideProps({ query: { page = 1 } }) {
  // const start = +page === 1 ? 0 : (+page - 1) * 10;
  // const numberOfArticles = await fetchAPI(`/articles/count`);
  // const articles = await fetchAPI(`/articles?_limit=10&_start=${start}`);
  const { metadata, hero } = await fetchAPI("/recipes-page")

  return {
    props: {
      metadata,
      hero,
    },
  }
}

export default recipes
