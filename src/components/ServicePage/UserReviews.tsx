import Image from 'next/image';

const UserReviews = () => {
    const starIcon = (
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

    return (
        <article>
            <div className="flex items-center mb-4 space-x-4">
                <div className="relative w-10 h-10 rounded-full">
                    <Image src="/assets/Dummy Profile.png" alt="" layout="fill" className="rounded-full" />
                </div>
                <div className="space-y-1 font-medium">
                    <p>
                        Dummy User <time dateTime="2014-08-16 19:00" className="block text-sm text-gray-500">
                            Joined on August 2014
                        </time>
                    </p>
                </div>
            </div>
            <div className="flex items-center mb-1">
                {starIcon}
                {starIcon}
                {starIcon}
                {starIcon}
                {starIcon}
                <h3 className="ml-2 text-sm font-semibold text-gray-900">Dummy Review Title</h3>
            </div>
            <footer className="mb-5 text-sm text-gray-500">
                <p>Reviewed on <time dateTime="2017-03-03 19:00">March 3, 2017</time></p>
            </footer>
            <p className="mb-2 text-gray-500">This is a dummy review content. It is not a real review.</p>
            <p className="mb-3 text-gray-500">This is just placeholder text for the review content.</p>
            <a href="#" className="block mb-5 text-sm font-medium text-primary hover:underline">Read more</a>
            <aside>
                <p className="mt-1 text-xs text-gray-500">19 people found this helpful</p>
                <div className="flex items-center mt-3 space-x-3 divide-x divide-gray-200">
                    <a href="#" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-xs px-2 py-1.5">Helpful</a>
                    <a href="#" className="pl-4 text-sm font-medium text-primary hover:underline">Report abuse</a>
                </div>
            </aside>
        </article>
    );
};

export default UserReviews;
