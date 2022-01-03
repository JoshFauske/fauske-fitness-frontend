import Link from "next/link"
import React from "react"
import Moment from "react-moment"

const Tip = ({ tip }) => {
  return (
    <div>
      <Link href={`/tips/${tip.date}`}>
        <button className="grow w-full">
          <div>{tip.tip.Title}</div>
          <Moment format="MMM Do YYYY">{tip.date}</Moment>
        </button>
      </Link>
    </div>
  )
}

export default Tip
