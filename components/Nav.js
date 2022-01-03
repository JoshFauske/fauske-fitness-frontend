import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import { slide as Menu } from "react-burger-menu"
import NextImage from "../components/Image"
import navStyles from "../styles/Nav.module.css"

const Nav = ({ global, numberOfArticles, numberOfTips, numberOfWorkouts }) => {
  const [active, setActive] = useState(false)
  const [scroll, setScroll] = useState(false)
  const [menuOpenState, setMenuOpenState] = useState(false)
  const navRef = useRef()
  navRef.current = scroll
  const router = useRouter()

  var styles = {
    bmBurgerButton: {
      position: "fixed",
      width: "36px",
      height: "30px",
      right: "36px",
      top: scroll ? "29px" : "32px",
      transition: "0.4s ease",
    },
    bmBurgerBars: {
      background: "#fff",
    },
    bmBurgerBarsHover: {
      background: "#a90000",
    },
    bmCrossButton: {
      height: "24px",
      width: "24px",
    },
    bmCross: {
      background: "#bdc3c7",
    },
    bmMenuWrap: {
      position: "fixed",
      height: "100%",
      top: "0",
    },
    bmMenu: {
      background: "#000",
      padding: "1.5em 1.5em 0",
      fontSize: "1.15em",
    },
    bmMorphShape: {
      fill: "#000",
    },
    bmItemList: {
      color: "#b8b7ad",
      padding: "0.8em",
    },
    bmItem: {
      display: "block",
      fontSize: "20px",
      marginBottom: "0.8rem",
    },
    bmOverlay: {
      top: "0",
      left: "0",
      background: "rgba(0, 0, 0, 0.3)",
    },
  }

  function sendEmail(message) {
    var email = "jfauske11@gmail.com"
    var subject = "Contact from Fauske Fitness"
    var emailBody = "Hi... "
    document.location = "mailto:" + email + "?subject=" + subject + "&body=" + emailBody
  }

  var isMenuOpen = function (state) {
    if (state.isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "visible"
    }
  }

  function toggleMenu(state) {
    document.querySelector(".bm-overlay").click()
  }

  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 20
      if (navRef.current !== show) {
        setScroll(show)
      }
    }
    document.addEventListener("scroll", handleScroll)
    return () => {
      document.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleClick = () => {
    setActive(!active)
  }

  return (
    <nav
      className={`flex items-center justify-between px-6 py-2 sticky top-0 z-50 ${navStyles.navbar} ${active ? "flex-wrap" : ""}`}
      style={{
        transition: "0.4s ease",
        backgroundColor: scroll ? "#191c1d" : "transparent",
        borderBottom: scroll ? "2px solid var(--primary-color)" : "",
      }}
    >
      <div className="lg:flex items-center justify-between w-full">
        <div className={`${navStyles.navLogo}`} style={{ transition: "0.4s ease", maxWidth: scroll ? "250px" : "300px" }}>
          <Link href="/">
            <a>
              <NextImage image={global.navbar.logo} />
            </a>
          </Link>
        </div>
        <div className="block lg:hidden">
          <Menu right styles={styles} onStateChange={isMenuOpen} isOpen={false}>
            <Link href="/">
              <a className={`block mt-4 lg:inline-block lg:mt-0 text-white mr-8 uppercase w-max ${router.pathname == "/" ? navStyles.activeLink : ""}`} onClick={toggleMenu}>
                Home
              </a>
            </Link>
            {numberOfArticles > 0 && (
              <Link href="/blog">
                <a className={`block mt-4 lg:inline-block lg:mt-0 mr-8 text-white uppercase w-max ${router.pathname == "/blog" ? navStyles.activeLink : ""}`} onClick={toggleMenu}>
                  Blog
                </a>
              </Link>
            )}

            {numberOfWorkouts.length > 0 && (
              <Link href="/workouts">
                <a className={`block mt-4 lg:inline-block lg:mt-0 text-white mr-8 uppercase w-max ${router.pathname == "/workouts" ? navStyles.activeLink : ""}`} onClick={toggleMenu}>
                  Workouts
                </a>
              </Link>
            )}

            {numberOfTips > 0 && (
              <Link href="/tips">
                <a className={`block mt-4 lg:inline-block lg:mt-0 text-white mr-8 uppercase w-max ${router.pathname == "/tips" ? navStyles.activeLink : ""}`} onClick={toggleMenu}>
                  Tips
                </a>
              </Link>
            )}

            {/* <Link href="/recipes"> */}
            {/* <a className={`block mt-4 lg:inline-block lg:mt-0 text-white mr-8 uppercase w-max ${router.pathname == "/recipes" ? navStyles.activeLink : ""}`} onClick={toggleMenu}>Recipes</a> */}
            {/* </Link> */}
            <div>
              <button href="#" className=" m-0 inline-block mt-4 lg:mt-0 megaBtn uppercase" onClick={sendEmail}>
                Contact
              </button>
            </div>
          </Menu>
        </div>
      </div>
      <div className={`${active ? "mb-4" : "hidden"} w-full block lg:flex lg:items-center lg:w-auto ml-4 lg:ml-0`}>
        <div className={`text-sm lg:flex-grow ${active ? "" : "flex"}`}>
          <Link href="/">
            <a className={`block mt-4 lg:inline-block lg:mt-0 text-white mr-8 uppercase w-max ${router.pathname == "/" ? navStyles.activeLink : ""}`}>Home</a>
          </Link>
          {numberOfArticles > 0 && (
            <Link href="/blog">
              <a className={`block mt-4 lg:inline-block lg:mt-0 mr-8 text-white uppercase w-max ${router.pathname == "/blog" ? navStyles.activeLink : ""}`}>Blog</a>
            </Link>
          )}

          {numberOfWorkouts > 0 && (
            <Link href="/workouts">
              <a className={`block mt-4 lg:inline-block lg:mt-0 text-white mr-8 uppercase w-max ${router.pathname == "/workouts" ? navStyles.activeLink : ""}`}>Workouts</a>
            </Link>
          )}

          {numberOfTips > 0 && (
            <Link href="/tips">
              <a className={`block mt-4 lg:inline-block lg:mt-0 text-white mr-8 uppercase w-max ${router.pathname == "/tips" ? navStyles.activeLink : ""}`}>Tips</a>
            </Link>
          )}

          {/* <Link href="/recipes">
            <a className={`block mt-4 lg:inline-block lg:mt-0 text-white mr-8 uppercase w-max ${router.pathname == "/recipes" ? navStyles.activeLink : ""}`}>Recipes</a>
          </Link> */}
        </div>
        <div>
          <button href="#" className=" m-0 inline-block mt-4 lg:mt-0 megaBtn uppercase" onClick={sendEmail}>
            Contact
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Nav
