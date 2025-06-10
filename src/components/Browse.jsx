import { useDispatch, useSelector } from "react-redux"
import useNowPlaying from "../hooks/useNowPlaying"
import Banner from "./Banner"
import Header from "./Header"
import Row from "./Row"
import usePopular from "../hooks/usePopular"
import useTopRated from "../hooks/useTopRated"
import useUpComing from "../hooks/useUpComing"

const Browse = () => {

    useNowPlaying()
    usePopular()
    useTopRated()
    useUpComing()

    const nowPlayingMovies = useSelector(store => store.movie.nowPlaying)
    const popular = useSelector(store => store.movie.popular)
    const topRated = useSelector(store => store.movie.topRated)
    const upComing = useSelector(store => store.movie.upComing)

    return (
        <>
            < div className=" relative bg-[#141414]min-h-screen text-white" >
                < Banner />

                < div className="mt-[-100px] relative z-10" >
                    <Row title="Now Playing" movies={nowPlayingMovies} />
                    <Row title="Trending Now" movies={popular} />
                    <Row title="Top Rated" movies={topRated} />
                    <Row title="Up Coming" movies={upComing} />
                </div >
            </div >


        </>
    )
}

export default Browse

