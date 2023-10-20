import Banner from '@/components/Categories/CategoryPage/Banner'
import Categories from '@/components/Categories/CategoryPage/Categories'
import FAQs from '@/components/Categories/CategoryPage/FAQs'
import React from 'react'

const page = () => {
    return (
        <div className='cotainer mx-auto '>
            <Banner />
            <Categories />
            <FAQs />
        </div>
    )
}

export default page