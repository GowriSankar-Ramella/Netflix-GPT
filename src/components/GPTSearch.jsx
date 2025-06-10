import { useState } from "react";
import { options } from "../utils/constants";
import MovieCard from "./MovieCard";
import { API_KEY } from "../utils/constants";

const GPTSearch = () => {
    const [prompt, setPrompt] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [abortController, setAbortController] = useState(null);
    const [movieResults, setMovieResults] = useState([]);

    const fetchtmdbResults = async (movie) => {
        const raw = await fetch(
            `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`,
            options
        );
        const json = await raw.json();
        return json.results;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLoading) return;

        if (abortController) abortController.abort();

        const controller = new AbortController();
        setAbortController(controller);
        setIsLoading(true);

        try {
            const query = `
You are a movie recommendation engine. 
STRICTLY follow these rules:
1. Suggest exactly 5 movies for: "${prompt}".
2. Return ONLY a comma-separated list of movie titles.
3. No sentences, explanations, or special characters.
4. Format: Title1, Title2, Title3, Title4, Title5

Example output for "romantic movies":
The Notebook, Pride and Prejudice, La La Land, Before Sunrise, Eternal Sunshine of the Spotless Mind

Now recommend for: "${prompt}"
`;

            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "deepseek/deepseek-chat:free",
                    messages: [{ role: "user", content: query }],
                }),
            });

            const jsondata = await response.json();
            const movies = jsondata.choices[0].message.content.split(",").map((m) => m.trim());
            const tmdbres = movies.map((movie) => fetchtmdbResults(movie));
            const nested = await Promise.all(tmdbres);
            const moviedata = nested.flat(Infinity);
            setMovieResults(moviedata);
        } catch (error) {
            if (error.name !== "AbortError") {
                console.error("API Error:", error);
                alert("Failed to fetch. Please try again.");
            }
        } finally {
            setIsLoading(false);
            setAbortController(null);
        }
    };

    return (
        <div
            className="min-h-screen w-full bg-fixed bg-cover bg-center px-4 py-20"
            style={{
                backgroundImage:
                    "url('https://image.tmdb.org/t/p/original/9yBVqNruk6Ykrwc32qrK2TIE5xw.jpg')",
            }}
        >
            {/* Search Section */}
            <div className="max-w-3xl mx-auto text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-bold text-red-600 mb-4">What Should We Watch?</h1>
                <p className="text-gray-200 text-lg mb-6">
                    Tell us your mood, favorite genres, or what you're craving...
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                    <input
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder="e.g. 'Mind-bending sci-fi'"
                        className={`flex-1 px-6 py-4 rounded-lg bg-white text-black placeholder-gray-500 text-lg focus:outline-none ${isFocused ? "ring-2 ring-red-500" : ""
                            }`}
                        required
                    />
                    <button
                        type="submit"
                        className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg"
                    >
                        {isLoading ? "Searching..." : "Find Movies"}
                    </button>
                </form>
            </div>

            {/* Results Grid */}
            {movieResults.length > 0 && (
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-white text-2xl font-semibold mb-4">Recommended Movies</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {movieResults.map((movie) =>
                            movie.poster_path ? (
                                <MovieCard
                                    key={movie.id}
                                    posterPath={movie.poster_path}
                                    title={movie.title}
                                />
                            ) : null
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default GPTSearch;
