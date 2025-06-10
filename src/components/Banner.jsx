import { useSelector } from "react-redux";
import useBackGroundVideo from "../hooks/useBackGroundVideo";

const Banner = () => {
    const nowPlayingMovies = useSelector((store) => store.movie.nowPlaying);
    const movie = nowPlayingMovies[0];
    const videos = useBackGroundVideo(movie?.id);

    if (!nowPlayingMovies || nowPlayingMovies.length === 0)
        return <div className="text-white">Loading...</div>;


    const trailer = videos.find(video => video.type === "Trailer" && video.site === "YouTube");

    return (
        <div className="relative w-full h-[90vh] text-white">
            {/* Background Video */}
            {trailer ? (
                <div className="absolute inset-0 w-full h-full overflow-hidden -z-10">
                    <div className="w-full h-full scale-[1.3] md:scale-[1.5] lg:scale-[1.7] origin-center">
                        <iframe
                            className="w-full h-full"
                            src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&controls=0&showinfo=0&modestbranding=1&loop=1&playlist=${trailer.key}`}
                            title="Movie Trailer"
                            frameBorder="0"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                        />
                    </div>
                </div>
            ) : (
                <div className="absolute inset-0 bg-black -z-10" />
            )}

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80 -z-10" />

            {/* Text Content */}
            <div className="px-6 md:px-12 lg:px-24 pt-40 max-w-4xl space-y-4 relative z-10">
                <h1 className="text-4xl md:text-5xl font-bold">{movie?.title}</h1>
                <p className="text-sm md:text-lg text-gray-200 line-clamp-3">{movie?.overview}</p>
                <div className="flex space-x-4">
                    <button className="bg-white text-black px-6 py-2 font-semibold rounded hover:bg-gray-300 transition">
                        ▶️ Play
                    </button>
                    <button className="bg-gray-700 bg-opacity-70 text-white px-6 py-2 font-semibold rounded hover:bg-gray-600 transition">
                        ℹ️ More Info
                    </button>
                </div>
            </div>

            {/* Bottom Fade */}
            <div className="absolute bottom-0 w-full h-48 bg-gradient-to-b from-transparent to-[#141414] z-0" />
        </div>
    );
};

export default Banner;
