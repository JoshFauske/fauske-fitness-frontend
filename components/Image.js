import NextImage from "next/image"
import { getStrapiMedia } from "../utils/media"

const Image = ({ image, style }) => {
  const { url, alternativeText } = image

  const loader = ({ width }) => {
    return `${getStrapiMedia(image)}?w=${width}`
  }

  return <NextImage loader={loader} width={image.width} height={image.height} objectFit="contain" src={url} alt={alternativeText || ""} className={style} />
}

export default Image
