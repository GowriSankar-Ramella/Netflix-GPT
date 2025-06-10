import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUpComing } from "../utils/movieSlice";
import { options } from "../utils/constants";

const useUpComing = () => {

    const dispatch = useDispatch();

    useEffect(() => {

        const fetchUpComing = async () => {

            try {

                const raw = await fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', options)

                const json = await raw.json();

                dispatch(addUpComing(json.results));

            } catch (err) {
                console.error("Error fetching now playing movies:", err);
            }
        };

        fetchUpComing();
    }, []);
};

export default useUpComing;
