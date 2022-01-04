import Link from "next/link"
import React from "react"
import Moment from "react-moment"
import articleStyles from "../styles/Article.module.css"
import NextImage from "./Image"

const Article = ({ article }) => {
  return (
    <div className={`flex flex-col self-start`}>
      <Link href={`/blog/${article.slug}`}>
        <div className={`${articleStyles.article} article`}>
          <div className={`${articleStyles.listImage}`}>
            {article.image && <NextImage image={article.image} />}
            <div className={articleStyles.articleOverlay}>
              <h2 className="m-auto font-bold text-2xl"> Read Now</h2>
            </div>
          </div>

          <a>
            <h1 className="text-xl mt-2 font-bold transition duration-200 ease-in-out truncate">{article.title}</h1>
          </a>
          <div className="text-gray-500 text-sm">
            By {article.author.name}
            <span className="mx-1">|</span> <Moment format="MMM Do YYYY">{article.published_at}</Moment>
          </div>
        </div>
      </Link>
    </div>
  )
}

export async function getServerSideProps({ query: { page = 1 } }) {
  const start = +page === 1 ? 0 : (+page - 1) * 10
  const numberOfArticles = await fetchAPI(`/articles/count`)
  const articles = await fetchAPI(`/articles?_limit=10&_start=${start}`)

  return {
    props: {
      articles,
      page: +page,
      numberOfArticles,
    },
  }
}

export default Article
