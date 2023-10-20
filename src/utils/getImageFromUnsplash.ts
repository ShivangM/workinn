const getImageFromUnsplash = (query: string) => {
    return `https://source.unsplash.com/random/1920x1080/?${query}`
}

export default getImageFromUnsplash