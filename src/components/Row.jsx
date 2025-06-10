import MovieCard from "./MovieCard";

const Row = ({ title, movies }) => {
    if (!movies || movies.length === 0) return null;

    return (
        <div className="px-6 md:px-12 lg:px-16 mb-10">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">{title}</h2>
            <div className="flex space-x-3 overflow-x-auto scrollbar-hide">
                {movies.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        posterPath={movie.poster_path}
                        title={movie.title}
                    />
                ))}
            </div>
        </div>
    );
};

export default Row;
