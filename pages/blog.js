import Article from "@/components/Article"
import NextImage from "@/components/Image"
import Seo from "@/components/Seo"
import { fetchAPI } from "@/utils/api"
import { useRouter } from "next/router"
import React from "react"

const blog = ({ articles, hero, page, numberOfArticles, metadata }) => {
  const router = useRouter()
  const lastPage = Math.ceil(numberOfArticles / 10)

  const seo = {
    metaTitle: metadata.metaTitle,
    metaDescription: metadata.metaDescription,
    shareImage: metadata.shareImage,
    twitterCardType: metadata.twitterCardType,
    twitterUsername: metadata.twitterUsername,
  }

  return (
    <>
      <Seo metadata={seo} />
      <div className="full-width mb-12">{hero.image && <NextImage image={hero.image} />}</div>
      {articles.length < 1 ? (
        <div className="italic text-red-500">There are no blog articles at this moment. Please check back later.</div>
      ) : (
        <div>
          <div className="grid grid-cols-1 gap-4 items-center md:grid-cols-2">
            {articles.map((article) => (
              <Article key={article.id} article={article} />
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <button className="grow w-44" onClick={() => router.push(`/blog?page=${page - 1}`)} disabled={page <= 1}>
              Previous
            </button>
            <button className="grow w-44" onClick={() => router.push(`/blog?page=${page + 1}`)} disabled={page >= lastPage}>
              Next
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export async function getServerSideProps({ query: { page = 1 } }) {
  const start = +page === 1 ? 0 : (+page - 1) * 10
  const numberOfArticles = await fetchAPI(`/articles/count`)
  const articles = await fetchAPI(`/articles?_sort=published_at:DESC&_limit=10&_start=${start}`)
  const { metadata, hero } = await fetchAPI("/blog-page")

  return {
    props: {
      articles,
      hero,
      page: +page,
      numberOfArticles,
      metadata,
    },
  }
}

// export async function getStaticProps({ page = 1 }) {
// 	const start = +page === 1 ? 0 : (+page - 1) * 5;

// 	const numberOfArticles = await fetchAPI(`/articles/count`);

// 	const articles = await fetchAPI(`/articles?_limit=5&_start=${start}`);

// 	return {
// 		props: { articles: articles, numberOfArticles: numberOfArticles, page: +page },
// 		revalidate: 1,
// 	};
// }

export default blog
