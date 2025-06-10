import { useEffect, useState } from "react"
import { options } from "../utils/constants"

const useBackGroundVideo = (movieId) => {

    const [videos, setVideos] = useState([])
    useEffect(() => {

        if (!movieId) return
        const getVideos = async () => {
            try {

                const raw = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, options)

                const json = await raw.json()

                setVideos(json.results)
            } catch (error) {
                console.log("Error occured while getting trailer")
                setVideos([])
            }
        }
        getVideos()
    }, [movieId])
    return videos
}

export default useBackGroundVideo
