import React from "react"

const Footer = () => {
  var d = new Date()
  var n = d.getFullYear()
  return (
    <div className="w-full bg-black py-2 px-6 text-gray-200 flex justify-between">
      <div>&copy; Copyright {n} - Fauske Fitness</div>
      {/* <div className="cursor-pointer text-primary hover:underline">Contact Me</div> */}
    </div>
  )
}

export default Footer
