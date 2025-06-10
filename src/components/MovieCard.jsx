const MovieCard = ({ posterPath, title }) => {
    if (!posterPath) return null;

    return (
        <div className="min-w-[150px] md:min-w-[180px] lg:min-w-[200px] transition-transform duration-300 hover:scale-110 hover:z-10">
            <img
                className="rounded-md w-full h-full object-cover shadow-md"
                src={`https://image.tmdb.org/t/p/w500${posterPath}`}
                alt={title}
            />
        </div>
    );
};

export default MovieCard;
