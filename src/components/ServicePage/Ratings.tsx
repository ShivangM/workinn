import React from 'react';

type StarProps = {
    active: boolean;
};

const StarIcon = () => (
    <svg
        className="w-4 h-4 text-yellow-300 mr-1"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 22 20"
    >
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
    </svg>
);

const Stars: React.FC<{ activeStars: number }> = ({ activeStars }) => {
    const starStyles = { width: '100%' };
    const inactiveStarStyles = { width: '0%' };

    const Star: React.FC<StarProps> = ({ active }) => (
        <div className="w-4 h-4">
            <StarIcon />
        </div>
    );

    const starArray = new Array(5).fill(0);

    return (
        <div className="flex items-center mb-2">
            {starArray.map((_, index) => (
                <Star key={index} active={index < activeStars} />
            ))}
            <p className="ml-2 text-sm font-medium text-gray-900">
                {activeStars} out of 5
            </p>
        </div>
    );
};

type RatingSectionProps = {
    rating: string;
    percentage: string;
};

const RatingSection: React.FC<RatingSectionProps> = ({ rating, percentage }) => (
    <div className="flex items-center mt-4">
        <a href="#" className="text-sm font-medium text-blue-600 hover:underline">
            {rating} star
        </a>
        <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded">
            <div className="h-5 bg-yellow-300 rounded" style={{ width: `${percentage}%` }}></div>
        </div>
        <span className="text-sm font-medium text-gray-500">
            {percentage}%
        </span>
    </div>
);

const Ratings: React.FC = () => {
    return (
        <section className='space-y-8'>
            <div className="space-y-2">
                <Stars activeStars={4} />
                <p className="text-sm font-medium text-gray-500">
                    1,745 global ratings
                </p>
            </div>

            <RatingSection rating="5" percentage="70" />
            <RatingSection rating="4" percentage="17" />
            <RatingSection rating="3" percentage="8" />
            <RatingSection rating="2" percentage="4" />
            <RatingSection rating="1" percentage="1" />
        </section>
    );
};

export default Ratings;
