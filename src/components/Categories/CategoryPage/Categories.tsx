import React from 'react'

type Props = {}

const CategoryCard = () => {
    return (
        <div className='w-full'>Categories</div>
    )
}

const Categories = (props: Props) => {
    return (
        <div className='grid grid-cols-4 gap-4'>
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
        </div>
    )
}

export default Categories