import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addMovies } from "../utils/movieSlice";
import { options } from "../utils/constants";

const useNowPlaying = () => {

    const dispatch = useDispatch();

    useEffect(() => {

        const fetchNowPlaying = async () => {

            try {

                const raw = await fetch(
                    "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
                    options
                );

                const json = await raw.json();

                dispatch(addMovies(json.results));

            } catch (err) {
                console.error("Error fetching now playing movies:", err);
            }
        };

        fetchNowPlaying();
    }, []);
};

export default useNowPlaying;
