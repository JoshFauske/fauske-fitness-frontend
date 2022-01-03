import Article from "@/components/Article"
import NextImage from "@/components/Image"
import Seo from "@/components/Seo"
import Tip from "@/components/Tip"
import Workout from "@/components/Workout"
import homeStyles from "@/styles/Home.module.css"
import { fetchAPI } from "@/utils/api"
import Link from "next/link"
import Slider from "react-slick"
import blog from "./blog"

export default function Home({ metadata, articles, workouts, tips, recipes, hero }) {
  const seo = {
    metaTitle: metadata.metaTitle,
    metaDescription: metadata.metaDescription,
    shareImage: metadata.shareImage,
    twitterCardType: metadata.twitterCardType,
    twitterUsername: metadata.twitterUsername,
  }

  var sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <section className="homePage">
      <Seo metadata={seo} />
      <div className="full-width mb-12">{hero.image && <NextImage image={hero.image} />}</div>
      {articles.length > 0 && (
        <div>
          <Link href={`/blog`}>
            <div className={`${homeStyles.homeTitle} text-6xl font-bold cursor-pointer hover:text-primary leading-tight`}>Blog</div>
          </Link>
          <div className="teko text-5xl tracking-wide mb-8 text-center uppercase">READ ABOUT IT ALL</div>
          <Slider {...sliderSettings}>
            {articles.map((article) => (
              <Article key={article.id} article={article} />
            ))}
          </Slider>
        </div>
      )}

      {workouts.length > 0 && (
        <div>
          <Link href={`/workouts`}>
            <div className={`${homeStyles.homeTitle} text-6xl font-bold cursor-pointer hover:text-primary`}>Workouts</div>
          </Link>
          <div className="teko text-5xl tracking-wide mb-4 text-center uppercase">GET YOUR DAILY WORKOUTS</div>
          <Slider {...sliderSettings}>
            {workouts.map((workout) => (
              <Workout key={workout.id} workout={workout} />
            ))}
          </Slider>
        </div>
      )}

      {tips.length > 0 && (
        <div>
          <Link href={`/tips`}>
            <div className={`${homeStyles.homeTitle} text-6xl font-bold cursor-pointer hover:text-primary`}>Tips</div>
          </Link>
          <div className="teko text-5xl tracking-wide mb-4 text-center uppercase">FITNESS TIPS TO MAKE YOUR LIFE EASIER</div>
          <Slider {...sliderSettings}>
            {tips.map((tip) => (
              <Tip key={tip.id} tip={tip} />
            ))}
          </Slider>
        </div>
      )}

      {/* <Link href={`/recipes`}>
				<div className={`${homeStyles.homeTitle} text-6xl font-bold cursor-pointer hover:text-primary`}>Recipes</div>
			</Link> */}
      {/* <Slider {...sliderSettings}>{recipes.map((recipe) => console.log(recipe))}</Slider> */}
    </section>
  )
}

export async function getServerSideProps() {
  const { metadata, hero } = await fetchAPI("/home-page")
  const articles = await fetchAPI(`/articles?_sort=published_at:DESC&_limit=10`)
  const workouts = await fetchAPI(`/workouts?_sort=published_at:DESC&_limit=10`)
  const tips = await fetchAPI(`/fitness-tips?_sort=published_at:DESC&_limit=10`)
  // const recipes = await fetchAPI(`/recipes?_sort=published_at:DESC&_limit=10`);

  return {
    props: {
      metadata,
      articles,
      workouts,
      tips,
      // recipes,
      hero,
    },
  }
}
