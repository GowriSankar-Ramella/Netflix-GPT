import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addPopular } from "../utils/movieSlice";
import { options } from "../utils/constants";

const usePopular = () => {

    const dispatch = useDispatch();

    useEffect(() => {

        const fetchPopular = async () => {

            try {

                const raw = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)

                const json = await raw.json();

                dispatch(addPopular(json.results));

            } catch (err) {
                console.error("Error fetching now playing movies:", err);
            }
        };

        fetchPopular();
    }, []);
};

export default usePopular;
