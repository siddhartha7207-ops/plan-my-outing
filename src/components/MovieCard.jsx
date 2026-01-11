import { motion } from 'framer-motion';
import { Star, Clock, Film, Sparkles, Check } from 'lucide-react';
import './MovieCard.css';

// Language flags
const languageFlags = {
    hindi: '🇮🇳',
    english: '🇺🇸',
    tamil: '🇮🇳',
    telugu: '🇮🇳',
    kannada: '🇮🇳',
    malayalam: '🇮🇳',
    marathi: '🇮🇳'
};

// Genre colors
const genreColors = {
    action: '#EF4444',
    comedy: '#F59E0B',
    drama: '#8B5CF6',
    thriller: '#EC4899',
    romance: '#F472B6',
    horror: '#1F2937',
    sci_fi: '#06B6D4',
    animation: '#10B981',
    family: '#6366F1'
};

function MovieCard({
    movie,
    onSelect,
    isSelected,
    showDetails = true
}) {
    const formatDuration = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    };

    return (
        <motion.div
            className={`movie-card ${isSelected ? 'selected' : ''}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            onClick={() => onSelect?.(movie)}
        >
            {/* Poster */}
            <div className="movie-poster">
                <div className="poster-gradient" />
                <div className="poster-content">
                    <Film size={48} strokeWidth={1} />
                </div>

                {/* New Badge */}
                {movie.isNew && (
                    <div className="new-badge">
                        <Sparkles size={12} />
                        New
                    </div>
                )}

                {/* Rating */}
                <div className="movie-rating">
                    <Star size={14} fill="currentColor" />
                    <span>{movie.rating}</span>
                </div>

                {/* Language */}
                <div className="movie-language">
                    <span>{languageFlags[movie.language]}</span>
                    <span>{movie.language}</span>
                </div>
            </div>

            {/* Content */}
            <div className="movie-content">
                <h4 className="movie-title">{movie.title}</h4>

                {/* Genres */}
                <div className="movie-genres">
                    {movie.genres.slice(0, 3).map(genre => (
                        <span
                            key={genre}
                            className="genre-tag"
                            style={{ '--genre-color': genreColors[genre] || '#6B7280' }}
                        >
                            {genre.replace('_', '-')}
                        </span>
                    ))}
                </div>

                {showDetails && (
                    <>
                        {/* Duration */}
                        <div className="movie-duration">
                            <Clock size={14} />
                            <span>{formatDuration(movie.duration)}</span>
                        </div>

                        {/* Cast */}
                        {movie.cast && (
                            <p className="movie-cast">
                                {movie.cast.slice(0, 2).join(', ')}
                            </p>
                        )}

                        {/* Description */}
                        {movie.description && (
                            <p className="movie-description">{movie.description}</p>
                        )}
                    </>
                )}
            </div>

            {/* Selection */}
            {isSelected && (
                <motion.div
                    className="movie-selected"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                >
                    <Check size={20} />
                </motion.div>
            )}
        </motion.div>
    );
}

export default MovieCard;
