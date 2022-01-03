import Layout from "@/components/Layout"
import "@/styles/globals.css"
import { fetchAPI } from "@/utils/api"
import { getStrapiMedia } from "@/utils/media"
import { DefaultSeo } from "next-seo"
import App from "next/app"
import ErrorPage from "next/error"
import Head from "next/head"

function MyApp({ Component, pageProps }) {
  const { global, numberOfArticles, numberOfTips, numberOfWorkouts } = pageProps
  if (global == null) {
    return <ErrorPage statusCode={404} />
  }
  const { metadata } = global

  return (
    <>
      {/* Favicon */}
      <Head>
        <link rel="shortcut icon" href={getStrapiMedia(global.favicon)} />
      </Head>
      {/* Global site metadata */}
      <DefaultSeo
        titleTemplate={`%s | ${global.metaTitleSuffix}`}
        title="Page"
        description={metadata.metaDescription}
        openGraph={{
          images: Object.values(metadata.shareImage.formats).map((image) => {
            return {
              url: getStrapiMedia(image),
              width: image.width,
              height: image.height,
            }
          }),
        }}
        twitter={{
          cardType: metadata.twitterCardType,
          handle: metadata.twitterUsername,
        }}
      />
      {/* Display the content */}
      <Layout global={global} numberOfArticles={numberOfArticles} numberOfTips={numberOfTips} numberOfWorkouts={numberOfWorkouts}>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

MyApp.getInitialProps = async (ctx) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(ctx)
  // Fetch global site settings from Strapi
  const global = await fetchAPI("/global")
  const numberOfArticles = await fetchAPI(`/articles/count`)
  const numberOfTips = await fetchAPI(`/fitness-tips/count`)
  const numberOfWorkouts = await fetchAPI(`/workouts/count`)
  // Pass the data to our page via props
  return { ...appProps, pageProps: { global, numberOfArticles, numberOfTips, numberOfWorkouts } }
}

export default MyApp
