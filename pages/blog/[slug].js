import NextImage from "@/components/Image"
import Seo from "@/components/Seo"
import articleStyles from "@/styles/Article.module.css"
import { fetchAPI } from "@/utils/api"
import { getStrapiMedia } from "@/utils/media"
import Markdown from "markdown-to-jsx"
import { useRouter } from "next/router"
import Moment from "react-moment"

const Article = ({ article }) => {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  const imageUrl = getStrapiMedia(article.image)

  const seo = {
    metaTitle: article.title,
    metaDescription: article.description,
    shareImage: article.image,
    article: true,
  }

  return (
    <>
      <Seo metadata={seo} />
      <div className="relative mt-8">
        {article.image && <NextImage image={article.image} />}
        <div className="bg-black bg-opacity-70 p-6 absolute bottom-4 left-0 md:bottom-20">
          <div className="flex flex-col">
            <h1 className="text-white font-bold text-3xl md:text-5xl">{article.title}</h1>
            <div className="flex items-center">
              <div className="w-10 mt-2 mr-2">{article.author.picture && <NextImage image={article.author.picture} style={articleStyles.authorImage} />}</div>
              <div className="text-sm flex w-full text-white">
                By {article.author.name}
                <span className="mx-1">|</span> <Moment format="MMM Do YYYY">{article.published_at}</Moment>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Markdown>{article.content}</Markdown>
      <hr className="my-6" />
    </>
  )
}

export async function getStaticPaths() {
  const articles = await fetchAPI("/articles")

  return {
    paths: articles.map((article) => ({
      params: {
        slug: article.slug,
      },
    })),
    fallback: true,
  }
}

export async function getStaticProps({ params }) {
  const articles = await fetchAPI(`/articles?slug=${params.slug}`)

  return {
    props: { article: articles[0] },
    revalidate: 1,
  }
}

export default Article
