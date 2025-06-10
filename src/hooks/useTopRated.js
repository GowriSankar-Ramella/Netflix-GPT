import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTopRated } from "../utils/movieSlice";
import { options } from "../utils/constants";

const useTopRated = () => {

    const dispatch = useDispatch();

    useEffect(() => {

        const fetchTopRated = async () => {

            try {

                const raw = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)

                const json = await raw.json();

                dispatch(addTopRated(json.results));

            } catch (err) {
                console.error("Error fetching now playing movies:", err);
            }
        };

        fetchTopRated();
    }, []);
};

export default useTopRated;
