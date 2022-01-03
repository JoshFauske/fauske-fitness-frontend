import styles from "../styles/Layout.module.css"
import Footer from "./Footer"
import Nav from "./Nav"

const Layout = ({ children, global, numberOfArticles, numberOfTips, numberOfWorkouts }) => {
  return (
    <>
      <Nav global={global} numberOfArticles={numberOfArticles} numberOfTips={numberOfTips} numberOfWorkouts={numberOfWorkouts} />
      <div className={styles.container}>
        <main className={styles.main}>{children}</main>
      </div>
      <Footer />
    </>
  )
}

export default Layout
